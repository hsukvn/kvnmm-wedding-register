const mongoose = require('mongoose');
const Table = require('../models/table');

exports.get = async (req, res) => {
	try {
		const tables = await Table.find();
		res.status(200).json(tables);
	} catch (err) {
			res.status(500).json(err);
	}
};

exports.add = async (req, res) => {
	const payload = {
		name: req.body.name,
		position: req.body.position
	}

	try {
		const table = await Table.create(payload);
		res.status(200).json(table);
	} catch (err) {
		res.status(500).json(err);
	}
};

exports.update = async (req, res) => {
	const id = req.params.id;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		res.status(400).json({error: 'id is invalid'});
		return;
	}

	try {
		const table = await Table.findById(id);

		if (!table) {
			res.status(404).json({ error: 'table not found' });
			return;
		}
	} catch (err) {
		res.status(500).json(err);
		return;
	}

	const updateKey = ['name', 'position'];
	let payload = {};

	updateKey.forEach(function(key) {
		if (req.body.hasOwnProperty(key)) {
			payload[key] = req.body[key];
		}
	});

	try {
		const table = await Table.findByIdAndUpdate(id, payload, { new: true, runValidators: true });
		res.status(200).json(table);
	} catch (err) {
		res.status(500).json(err);
	}
};

exports.remove = async (req, res) => {
	const id = req.params.id;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		res.status(400).json({ error: 'id is invalid' });
		return;
	}

	try {
		const count = await Table.count({ _id: id });
		if (count <= 0) {
			res.status(200).json({ status: 'ok' }); // skip when id is not exist
			return;
		}
	} catch (err) {
		res.status(500).json(err);
		return;
	}

	try {
		await Table.remove({ _id: id });
		res.status(200).json({ status: 'ok' });
	} catch (err) {
		res.status(500).json(err);
	}
};