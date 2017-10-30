"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by iong on 30.10.2017.
 */
var express = require("express");
var publicPath = 'public';
var app = express();
app.use(express.static(publicPath));
var port = process.env.PORT || 3000;
app.listen(port, function () { return console.log("Started on port " + port); });
//# sourceMappingURL=server.js.map