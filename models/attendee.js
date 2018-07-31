const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const con = mongoose.createConnection('mongodb://localhost:27017/wedding', { useMongoClient: true });

const AttendeeScema = new mongoose.Schema({
	name: { type: String, required: true },
	relation: { type: Number, min: 1, max: 2 },
	members: [{
		name: String,
		vegetarian: Boolean,
		babychair: Boolean
	}],
	attend: { type: Boolean, required: true },
	paper_invitation: { type: Boolean, required: true },
	email: String,
	phone: String,
	address: String,
	message: String,
});

const ModelClass = con.model('attendee', AttendeeScema);

module.exports = ModelClass;
