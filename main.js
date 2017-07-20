//
// Electron Basic Sample Project
//-------------------------------------- general express module
const express       = require('express');
const app           = express();
const bodyParser    = require('body-parser');
const path          = require('path');
const url           = require('url');
const client        = require('./app/routes/router');
const port          = 3000;

//-------------------------------------- express
app.set('view engine', 'jade');
app.set('views', __dirname + '/app/views');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname , 'public')));

// routes

app.use('/', client.router);

app.listen(port);

// electron
require('./ewindow').init(port);
