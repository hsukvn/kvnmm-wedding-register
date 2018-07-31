const mongoose = require('mongoose');
const Attendee = require('../models/attendee');

exports.get = function(req, res, next) {
	Attendee.find(function(err, attendee) {
		if (err) {
			res.status(500).json(err);
		} else {
			res.status(200).json(attendee);
		}
	});
};

exports.add = function(req, res, next) {
	Attendee.create({ // FIXME: better way to give default value?
		name: req.body.name,
		relation: req.body.relation,
		members: req.body.members ? req.body.members : [],
		attend: req.body.attend ? req.body.attend : false,
		paper_invitation: req.body.paper_invitation ? req.body.paper_invitation : false,
		email: req.body.email ? req.body.email : '',
		phone: req.body.phone ? req.body.phone : '',
		address: req.body.address ? req.body.address : '',
		message: req.body.message ? req.body.message : ''
	}, function(err, attendee) {
		if (err) {
			res.status(500).json(err);
		} else {
			res.status(200).json({ status: 'ok' });
		}
	});
};

exports.update = function(req, res, next) {
	if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
		res.status(400).json({error: 'id is invalid'});
		return;
	}

	Attendee.findById(req.params.id, function (err, attendee) {
		if (attendee === null) {
			res.status(404).json({err: 'id not found'});
			return;
		}

		var updateKey = ['name', 'relation', 'members', 'attend', 'paper_invitation', 'email', 'phone', 'address', 'message'];
		var payload = {};

		updateKey.forEach(function(key) {
			if (req.body.hasOwnProperty(key)) {
				payload[key] = req.body[key];
			}
		});

		Attendee.findByIdAndUpdate(req.params.id, payload, function(err) {
			if (err) {
				res.status(500).json(err);
			} else {
				res.status(200).json({ status: 'ok' });
			}
		})
	});
};

exports.remove = function(req, res, next) {
	if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
		res.status(400).json({error: 'id is invalid'});
		return;
	}

	Attendee.count({_id: req.params.id}, function (err, count) {
		if (count <= 0) {
			res.status(404).json({err: 'id not found'});
		} else {
			Attendee.remove({
				_id: req.params.id
			}, function (err, attendee) {
				if (err) {
					res.status(500).json(err);
				} else {
					res.status(200).json({ status: 'ok' });
				}
			});
		}
	});
};
