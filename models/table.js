const mongoose = require('mongoose');

const con = mongoose.createConnection('mongodb://localhost:27017/wedding', { useMongoClient: true });

const TableScema = new mongoose.Schema({
	name: { type: String, default: '' },
	position: {
		column: { type: Number, required: true },
		row: { type: Number, required: true },
	}
});

const ModelClass = con.model('table', TableScema);

module.exports = ModelClass;