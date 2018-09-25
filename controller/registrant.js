const mongoose = require('mongoose');
const Registrant = require('../models/registrant');
const Attendee = require('../models/attendee');

exports.get = async (req, res) => {
	try {
		let registrants = await Registrant.find();

		// FIXME: should use aggregate $lookup if possible
		for (registrant of registrants) {
			try {
				const objMembers = registrant.members.map(function(id) { return mongoose.Types.ObjectId(id); });
				const members = await Attendee.find({ '_id': { $in: objMembers } });
				registrant.members = members;
			} catch (err) {
				// FIXME: error handling
				console.log(err);
			}
		}
		res.status(200).json(registrants);
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

	try {
		let registrant = await Registrant.findById(id);

		if (!registrant) {
			res.status(404).json({ error: 'id not found' });
			return;
		}

		if (!Array.isArray(registrant.members)) {
			res.status(500).json({ error: 'data is invalid' });
			return;
		}

		const objMembers = registrant.members.map(function(id) { return mongoose.Types.ObjectId(id); });
		const members = await Attendee.find({ '_id': { $in: objMembers } });
		registrant.members = members;

		res.status(200).json(registrant);
	} catch (err) {
		res.status(500).json(err);
		return;
	}
};

exports.add = async (req, res) => {
	const members = req.body.members ? req.body.members : [];
	const attendeePayloads = members.map(function(member) {
		return {
			name: member.name,
			vegetarian: member.vegetarian,
			babychair: member.babychair,
			tags: [],
			table: '',
		}
	});

	attendeeIds = [];
	for (const payload of attendeePayloads) {
		try {
			const attendee = await Attendee.create(payload);
			attendeeIds.push(attendee._id);
		} catch (err) {
			// FIXME: error handling
			console.log(err);
		}
	}

	const registrantPayload = {
		name: req.body.name,
		relation: req.body.relation,
		members: attendeeIds,
		attend: req.body.attend ? req.body.attend : false,
		paper_invitation: req.body.paper_invitation ? req.body.paper_invitation : false,
		email: req.body.email ? req.body.email : '',
		phone: req.body.phone ? req.body.phone : '',
		address: req.body.address ? req.body.address : '',
		message: req.body.message ? req.body.message : '',
	}

	try {
		const registrant = await Registrant.create(registrantPayload);
		const objMembers = registrant.members.map(function(id) { return mongoose.Types.ObjectId(id); });
		const members = await Attendee.find({ '_id': { $in: objMembers } });
		registrant.members = members;
		// FIXME: resolve members
		res.status(200).json(registrant);
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
		const registrant = await Registrant.findById(id);

		if (!registrant) {
			res.status(404).json({ error: 'id not found' });
			return;
		}
	} catch (err) {
		res.status(500).json(err);
		return;
	}

	// FIXME: update member
	const updateKey = ['name', 'relation', 'attend', 'paper_invitation', 'email', 'phone', 'address', 'message'];
	let payload = {};

	updateKey.forEach(function(key) {
		if (req.body.hasOwnProperty(key)) {
			payload[key] = req.body[key];
		}
	});

	try {
		let registrant = await Registrant.findByIdAndUpdate(id, payload, { new: true, runValidators: true });
		const objMembers = registrant.members.map(function(id) { return mongoose.Types.ObjectId(id); });
		const members = await Attendee.find({ '_id': { $in: objMembers } });
		registrant.members = members;

		res.status(200).json(registrant);
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
		const registrant = await Registrant.findById(id);

		if (!registrant) {
			res.status(200).json({ status: 'ok' }); // skip when id is not exist
			return;
		}

		for (member of registrant.members) {
			try {
				await Attendee.remove({ _id: member });
			} catch (err) {
				// FIXME: error handling
				console.log(err);
			}
		}
	} catch (err) {
		res.status(500).json(err);
		return;
	}

	try {
		await Registrant.remove({ _id: id });
		res.status(200).json({ status: 'ok' });
	} catch (err) {
		res.status(500).json(err);
	}
};