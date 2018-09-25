const mongoose = require('mongoose');
const Registrant = require('../models/registrant');
const Attendee = require('../models/attendee');

exports.get = async (req, res) => {
	try {
		const attendees = await Attendee.find();
		const attendeesResp = [];

		for (const attendee of attendees) {
			try {
				const registrant = await Registrant.findOne({
					members: { $in: [ mongoose.Types.ObjectId(attendee._id) ] }
				})
				if (!registrant) {
					continue;
				}
				attendeesResp.push({ ...attendee._doc, ...{ owner: { name: registrant.name, _id: registrant._id }, relation: registrant.relation }});
			} catch (err) {
				// FIXME: error handling
				console.log(err);
			}
		}
		res.status(200).json(attendeesResp);
	} catch (err) {
			res.status(500).json(err);
	}
};

exports.getById = async (req, res) => {
	const id = req.params.id;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		res.status(400).json({ error: 'id is invalid' });
		return;
	}

	let attendeeResp = {};
	try {
		const attendee = await Attendee.findById(id);

		if (!attendee) {
			res.status(404).json({ error: 'id not found' });
			return;
		}

		try {
			const registrant = await Registrant.findOne({
				members: { $in: [ mongoose.Types.ObjectId(attendee._id) ] }
			})
			if (!registrant) {
				res.status(400).json({ error: 'attendee does not have owner' });
				return;
			}
			attendeeResp = { ...attendee._doc, ...{ owner: { name: registrant.name, _id: registrant._id }, relation: registrant.relation }};
		} catch (err) {
			// FIXME: error handling
			console.log(err);
		}

		res.status(200).json(attendeeResp);
	} catch (err) {
		res.status(500).json(err);
		return;
	}
};

exports.update = async (req, res) => {
	const id = req.params.id;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		res.status(400).json({ error: 'id is invalid' });
		return;
	}

	let attendee = {};
	try {
		attendee = await Attendee.findById(id);

		if (!attendee) {
			res.status(404).json({ error: 'id not found' });
			return;
		}
	} catch (err) {
		res.status(500).json(err);
		return;
	}

	let registrant = {};
	try {
		registrant = await Registrant.findOne({
			members: { $in: [ mongoose.Types.ObjectId(attendee._id) ] }
		})
		if (!registrant) {
			res.status(400).json({ error: 'attendee does not have owner' });
			return;
		}
	} catch (err) {
		res.status(500).json(err);
		return;
	}

	const updateKey = ['name', 'vegetarian', 'babychair', 'tags', 'table'];
	let payload = {};

	updateKey.forEach(function(key) {
		if (req.body.hasOwnProperty(key)) {
			payload[key] = req.body[key];
		}
	});

	try {
		const attendeeUpdate = await Attendee.findByIdAndUpdate(id, payload, { new: true, runValidators: true });
		const attendeeResp = { ...attendeeUpdate._doc, ...{ owner: { name: registrant.name, _id: registrant._id }, relation: registrant.relation }};
		res.status(200).json(attendeeResp);
	} catch (err) {
		res.status(500).json(err);
	}
};

exports.remove = async (req, res) => {
	res.status(200).json({ status: 'ok' });
};