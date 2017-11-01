"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by iong on 30.10.2017.
 */
var express = require("express");
var socketIO = require("socket.io");
var http = require("http");
var generate_1 = require("./utils/generate");
var validation_1 = require("./utils/validation");
var users_1 = require("./utils/users");
var path = require("path");
var publicPath = path.join(__dirname, '../public');
var port = process.env.PORT || 3000;
var app = express();
app.use(express.static(publicPath));
var server = http.createServer(app);
var io = socketIO(server);
var users = new users_1.Users();
io.on('connection', function (socket) {
    console.log("new user connected");
    socket.on('join', function (params, callback) {
        if (!validation_1.isRealString(params.name) || !validation_1.isRealString(params.room)) {
            return callback('Name and room not valid');
        }
        socket.join(params.room);
        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.room);
        io.to(params.room).emit('updateUserList', users.getUserList(params.room));
        socket.emit('newMessage', generate_1.generateMessage('Admin', 'Welcome to server'));
        socket.broadcast.to(params.room).emit('newMessage', generate_1.generateMessage('Admin', params.name + " joined"));
        callback();
    });
    socket.on('createMessage', function (message, callback) {
        console.log('createMessage', message);
        var user = users.getUser(socket.id);
        if (user && validation_1.isRealString(message.text)) {
            io.to(user.room).emit('newMessage', generate_1.generateMessage(user.name, message.text));
        }
        callback('This is from the server');
    });
    socket.on('createLocationMessage', function (coords) {
        var user = users.getUser(socket.id);
        io.to(user.room).emit('newLocationMessage', generate_1.generateLocationMessage(user.name, coords.latitude, coords.longitude));
    });
    socket.on('disconnect', function () {
        var user = users.removeUser(socket.id);
        if (user) {
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generate_1.generateMessage('Admin', user.name + " has left"));
        }
        console.log('user disconnected');
    });
});
server.listen(port, function () { return console.log("Started on port " + port); });
//# sourceMappingURL=server.js.map