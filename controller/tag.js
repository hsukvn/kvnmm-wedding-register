const mongoose = require('mongoose');
const Tag = require('../models/tag');

exports.get = function(req, res, next) {
	Tag.find(function(err, tag) {
		if (err) {
			res.status(500).json(err);
		} else {
			res.status(200).json(tag);
		}
	});
};

exports.add = function(req, res, next) {
	Tag.create({
		name: req.body.name
	}, function(err, tag) {
		if (err) {
			res.status(500).json(err);
		} else {
			res.status(200).json(tag);
		}
	});
};

exports.update = function(req, res, next) {
	let id = req.params.id;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		res.status(400).json({error: 'id is invalid'});
		return;
	}

	Tag.findById(req.params.id, function (err, tag) {
		if (tag === null) {
			res.status(404).json({err: 'tag not found'});
			return;
		}

		var updateKey = ['name'];
		var payload = {};

		updateKey.forEach(function(key) {
			if (req.body.hasOwnProperty(key)) {
				payload[key] = req.body[key];
			}
		});

		Tag.findByIdAndUpdate(req.params.id, payload, function(err) {
			if (err) {
				res.status(500).json(err);
			} else {
				res.status(200).json({ status: 'ok' });
			}
		})
	});
};

exports.remove = function(req, res, next) {
	let id = req.params.id;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		res.status(400).json({error: 'id is invalid'});
		return;
	}

	Tag.count({_id: id}, function (err, count) {
		if (count <= 0) {
			res.status(404).json({err: 'tag not found'});
		} else {
			Tag.remove({ _id: id }, function (err) {
				if (err) {
					res.status(500).json(err);
				} else {
					res.status(200).json({ status: 'ok' });
				}
			});
		}
	});
};