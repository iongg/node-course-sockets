"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by iong on 30.10.2017.
 */
var express = require("express");
var socketIO = require("socket.io");
var http = require("http");
var generate_1 = require("./../utils/generate");
var path = require("path");
var publicPath = path.join(__dirname, '../public');
var port = process.env.PORT || 3000;
var app = express();
app.use(express.static(publicPath));
var server = http.createServer(app);
var io = socketIO(server);
io.on('connection', function (socket) {
    console.log("new user connected");
    socket.emit('newMessage', generate_1.generateMessage('Admin', 'Welcome to server'));
    socket.broadcast.emit('newMessage', generate_1.generateMessage('Admin', 'New user joined the server'));
    socket.on('createMessage', function (message, callback) {
        console.log('createMessage', message);
        io.emit('newMessage', generate_1.generateMessage(message.from, message.text));
        callback('This is from the server');
    });
    socket.on('createLocationMessage', function (coords) {
        io.emit('newLocationMessage', generate_1.generateLocationMessage('Admin', coords.latitude, coords.longitude));
    });
    socket.on('disconnect', function () {
        console.log('user disconnected');
    });
});
server.listen(port, function () { return console.log("Started on port " + port); });
//# sourceMappingURL=server.js.map