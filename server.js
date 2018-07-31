#!/usr/bin/env node

'use strict';

const http     = require('http');
const express  = require('express');
const app      = express();
const router   = require('./router');

const morgan   = require('morgan');

const bodyParser     = require('body-parser');
const methodOverride = require('method-override'); // for delete method
const cors           = require('cors');

app.use(morgan('dev')); // log every request to the console
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride());

router(app);

const port = process.env.PORT || 8080;
const server = http.createServer(app);

server.listen(port, function () {
	console.log('Sever listening on:', port);
});
