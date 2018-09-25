const mongoose = require('mongoose');

const con = mongoose.createConnection('mongodb://localhost:27017/wedding', { useMongoClient: true });

const RegistrantScema = new mongoose.Schema({
	name: { type: String, required: true },
	relation: { type: Number, min: 1, max: 2, required: true }, // 1: groom 2: bride
	members: { type: Array, default: [] },
	attend: { type: Boolean, default: false },
	paper_invitation: { type: Boolean, default: false },
	email: { type: String, default: '' },
	phone: { type: String, default: '' },
	address: { type: String, default: '' },
	message: { type: String, default: '' },
});

const ModelClass = con.model('registrant', RegistrantScema);

module.exports = ModelClass;