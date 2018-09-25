const mongoose = require('mongoose');

const con = mongoose.createConnection('mongodb://localhost:27017/wedding', { useMongoClient: true });

const AttendeeScema = new mongoose.Schema({
	name: { type: String, required: true },
	vegetarian: { type: Boolean, default: false },
	babychair: { type: Boolean, default: false },
	tags: { type: Array, default: [] },
	table: {type: String, default: '' }
});

const ModelClass = con.model('attendee', AttendeeScema);

module.exports = ModelClass;