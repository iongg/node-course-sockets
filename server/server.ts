/**
 * Created by iong on 30.10.2017.
 */
import express = require('express');
import socketIO = require('socket.io');
import http = require('http');

import {generateMessage, generateLocationMessage} from './../utils/generate';
import path = require('path');

let publicPath = path.join(__dirname, '../public');
let port = process.env.PORT || 3000;

let app = express();
app.use(express.static(publicPath));

let server = http.createServer(app);
let io = socketIO(server);

io.on('connection', (socket) => {
    console.log("new user connected");

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to server'));

    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined the server'));

    socket.on('createMessage', (message, callback) => {
        console.log('createMessage', message);
        io.emit('newMessage', generateMessage(message.from, message.text));
        callback('This is from the server');
    });

    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage',generateLocationMessage('Admin',coords.latitude,coords.longitude))
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

server.listen(port, () => console.log(`Started on port ${port}`));