const mongoose = require('mongoose');
const Tag = require('../models/tag');

exports.get = async (req, res) => {
	try {
		tags = await Tag.find();
		res.status(200).json(tags);
	} catch (err) {
		res.status(500).json(err);
	}
};

exports.add = async (req, res) => {
	const payload = {
		name: req.body.name
	}

	try {
		const tag = await Tag.create(payload);
		res.status(200).json(tag);
	} catch (err) {
		res.status(500).json(err);
	}
};

exports.update = async (req, res) => {
	const id = req.params.id;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		res.status(400).json({ error: 'id is invalid' });
		return;
	}

	try {
		const tag = await Tag.findById(id);

		if (!tag) {
			res.status(404).json({ error: 'tag not found' });
			return;
		}
	} catch (err) {
		res.status(500).json(err);
		return;
	}

	const updateKey = ['name'];
	let payload = {};

	updateKey.forEach(function(key) {
		if (req.body.hasOwnProperty(key)) {
			payload[key] = req.body[key];
		}
	});

	try {
		const tag = await Tag.findByIdAndUpdate(id, payload, { new: true, runValidators: true });
		res.status(200).json(tag);
	} catch (err) {
		res.status(500).json(err);
	}
};

exports.remove = async (req, res) => {
	const id = req.params.id;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		res.status(400).json({error: 'id is invalid'});
		return;
	}

	try {
		const count = await Tag.count({ _id: id });

		if (count <= 0) {
			res.status(200).json({ status: 'ok' }); // skip when id is not exist
			return;
		}
	} catch (err) {
		res.status(500).json(err);
		return;
	}

	try {
		await Tag.remove({ _id: id });
		res.status(200).json({ status: 'ok' });
	} catch (err) {
		res.status(500).json(err);
	}
};