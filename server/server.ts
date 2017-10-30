/**
 * Created by iong on 30.10.2017.
 */
import express = require('express');

let publicPath = './../public';

let app = express();
app.use(express.static(publicPath));

let port = process.env.PORT || 3000;



app.listen(port, () => console.log(`Started on port ${port}`));