const mongoose = require('mongoose');
const Attendee = require('../models/attendee');

exports.get = async (req, res) => {
	try {
		const attendees = await Attendee.find();
		res.status(200).json(attendees);
	} catch (err) {
			res.status(500).json(err);
	}
};

exports.add = async (req, res) => {
	const payload = {
		name: req.body.name,
		relation: req.body.relation,
		members: req.body.members ? req.body.members : [],
		attend: req.body.attend ? req.body.attend : false,
		paper_invitation: req.body.paper_invitation ? req.body.paper_invitation : false,
		email: req.body.email ? req.body.email : '',
		phone: req.body.phone ? req.body.phone : '',
		address: req.body.address ? req.body.address : '',
		message: req.body.message ? req.body.message : '',
	};

	try {
		const attendee = await Attendee.create(payload);
		res.status(200).json(attendee);
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
		const attendee = await Attendee.findById(id);

		if (!attendee) {
			res.status(404).json({ error: 'id not found' });
			return;
		}
	} catch (err) {
		res.status(500).json(err);
		return;
	}

	const updateKey = ['name', 'relation', 'members', 'attend', 'paper_invitation', 'email', 'phone', 'address', 'message'];
	let payload = {};

	updateKey.forEach(function(key) {
		if (req.body.hasOwnProperty(key)) {
			payload[key] = req.body[key];
		}
	});

	try {
		const attendee = await Attendee.findByIdAndUpdate(id, payload, { new: true, runValidators: true });
		res.status(200).json(attendee);
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
		const count = await Attendee.count({_id: id});

		if (count <= 0) {
			res.status(200).json({ status: 'ok' }); // skip when id is not exist
			return;
		}
	} catch (err) {
		res.status(500).json(err);
		return;
	}

	try {
		await Attendee.remove({ _id: id });
		res.status(200).json({ status: 'ok' });
	} catch (err) {
		res.status(500).json(err);
	}
};