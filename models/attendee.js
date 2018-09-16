const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const con = mongoose.createConnection('mongodb://localhost:27017/wedding', { useMongoClient: true });

const AttendeeScema = new mongoose.Schema({
	name: { type: String, required: true },
	relation: { type: Number, min: 1, max: 2, required: true }, // 1: groom 2: bride
	members: [{
		name: { type: String, required: true },
		vegetarian: { type: Boolean, default: false },
		babychair: { type: Boolean, default: false },
		tags: { type: Array, default: [] },
		table: {type: String, default: '' },
	}],
	attend: { type: Boolean, default: false },
	paper_invitation: { type: Boolean, default: false },
	email: { type: String, default: '' },
	phone: { type: String, default: '' },
	address: { type: String, default: '' },
	message: { type: String, default: '' },
});

const ModelClass = con.model('attendee', AttendeeScema);

module.exports = ModelClass;
