#!/usr/bin/env node

'use strict';

var express  = require('express');
var app      = express();

var mongoose = require('mongoose');
var morgan = require('morgan');

var bodyParser = require('body-parser');
var methodOverride = require('method-override'); // for delete method

var AttendeeScema = new mongoose.Schema({
	name: { type: String, required: true },
	relation: { type: Number, min: 1, max: 2 },
	members: [{
		name: String,
		vegetarian: Boolean,
		babychair: Boolean
	}],
	attend: { type: Boolean, required: true },
	ceremony_attend: { type: Boolean, required: true },
	email: String,
	phone: String,
	address: String
});

var Attendee = mongoose.model('attendee', AttendeeScema);

mongoose.connect('mongodb://localhost:27017/wedding', { useMongoClient: true });

app.use(morgan('dev')); // log every request to the console
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride());

app.use(function (req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*'); // FIXME: restrict domain
		res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
		res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
		res.setHeader('Access-Control-Allow-Credentials', true);
		next();
});

app.use('/', express.static(__dirname + '/public'));

app.get('/api/attendee', function(req, res) { // FIXME: only for debug, should not expose it
	Attendee.find(function(err, attendee) {
		if (err) {
			res.status(500).json(err);
		} else {
			res.status(200).json(attendee);
		}
	});
});

app.post('/api/attendee', function(req, res) {
	Attendee.create({ // FIXME: better way to give default value?
		name: req.body.name,
		relation: req.body.relation,
		members: req.body.members ? req.body.members : [],
		attend: req.body.attend ? req.body.attend : false,
		ceremony_attend: req.body.ceremony_attend ? req.body.ceremony_attend : false,
		email: req.body.email ? req.body.email : '',
		phone: req.body.phone ? req.body.phone : '',
		address: req.body.address ? req.body.address : ''
	}, function(err, attendee) {
		if (err) {
			res.status(500).json(err);
		} else {
			res.status(200).json({ status: 'ok' });
		}
	});
});

var server = app.listen(8080, function() {
	console.log("Listening on port %s...", server.address().port);
});

