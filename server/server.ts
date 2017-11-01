/**
 * Created by iong on 30.10.2017.
 */
import express = require('express');
import socketIO = require('socket.io');
import http = require('http');

import {generateMessage, generateLocationMessage} from './utils/generate';
import {isRealString} from './utils/validation';
import {Users} from './utils/users';
import path = require('path');

let publicPath = path.join(__dirname, '../public');
let port = process.env.PORT || 3000;

let app = express();
app.use(express.static(publicPath));

let server = http.createServer(app);
let io = socketIO(server);
let users = new Users();


io.on('connection', (socket) => {
    console.log("new user connected");

    socket.on('join', (params, callback) => {
        if(!isRealString(params.name) || !isRealString(params.room)) {
            return callback('Name and room not valid');
        }

        socket.join(params.room);
        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.room);
        io.to(params.room).emit('updateUserList', users.getUserList(params.room));

        socket.emit('newMessage', generateMessage('Admin', 'Welcome to server'));
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} joined`));
        callback();
    });

    socket.on('createMessage', (message, callback) => {
        console.log('createMessage', message);
        io.emit('newMessage', generateMessage(message.from, message.text));
        callback('This is from the server');
    });

    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage',generateLocationMessage('Admin',coords.latitude,coords.longitude))
    });

    socket.on('disconnect', () => {
        let user = users.removeUser(socket.id);

        if(user) {
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left`));
        }

        console.log('user disconnected');
    });
});

server.listen(port, () => console.log(`Started on port ${port}`));