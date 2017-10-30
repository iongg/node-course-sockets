/**
 * Created by iong on 30.10.2017.
 */
import express = require('express');
import path = require('path');

let publicPath = path.join(__dirname, '../public');
let port = process.env.PORT || 3000;

let app = express();
app.use(express.static(publicPath));

app.listen(port, () => console.log(`Started on port ${port}`));