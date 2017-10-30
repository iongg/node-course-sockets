"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by iong on 30.10.2017.
 */
var express = require("express");
var path = require("path");
var publicPath = path.join(__dirname, '../public');
var port = process.env.PORT || 3000;
var app = express();
app.use(express.static(publicPath));
app.listen(port, function () { return console.log("Started on port " + port); });
//# sourceMappingURL=server.js.map