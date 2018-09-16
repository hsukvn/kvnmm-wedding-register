const mongoose = require('mongoose');
const Table = require('../models/table');

exports.get = function(req, res, next) {
	Table.find(function(err, tables) {
		if (err) {
			res.status(500).json(err);
		} else {
			res.status(200).json(tables);
		}
	});
};

exports.add = function(req, res, next) {
	Table.create({
		name: req.body.name,
		position: req.body.position
	}, function(err, table) {
		if (err) {
			res.status(500).json(err);
		} else {
			res.status(200).json(table);
		}
	});
};

exports.update = function(req, res, next) {
	let id = req.params.id;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		res.status(400).json({error: 'id is invalid'});
		return;
	}

	Table.findById(req.params.id, function (err, table) {
		if (table === null) {
			res.status(404).json({ error: 'table not found' });
			return;
		}

		var updateKey = ['name', 'position'];
		var payload = {};

		updateKey.forEach(function(key) {
			if (req.body.hasOwnProperty(key)) {
				payload[key] = req.body[key];
			}
		});

		Table.findByIdAndUpdate(req.params.id, payload, { new: true, runValidators: true }, function(err, table) {
			if (err) {
				res.status(500).json(err);
			} else {
				res.status(200).json(table);
			}
		})
	});
};

exports.remove = function(req, res, next) {
	let id = req.params.id;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		res.status(400).json({ error: 'id is invalid' });
		return;
	}

	Table.count({_id: id}, function (err, count) {
		if (count <= 0) {
			res.status(404).json({ error: 'table not found' });
		} else {
			Table.remove({ _id: id }, function (err) {
				if (err) {
					res.status(500).json(err);
				} else {
					res.status(200).json({ status: 'ok' });
				}
			});
		}
	});
};