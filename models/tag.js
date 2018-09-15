const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const con = mongoose.createConnection('mongodb://localhost:27017/wedding', { useMongoClient: true });

const TagScema = new Schema({
	name: { type: String, required: true }
});

const ModelClass = con.model('tag', TagScema);

module.exports = ModelClass;
