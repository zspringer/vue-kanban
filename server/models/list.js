var models = require('../config/constants').models
let mongoose = require('mongoose')
let ObjectId = mongoose.Schema.ObjectId

var schema = new mongoose.Schema({
	name: { type: String, required: true },
	description: { type: String },
	created: { type: Number, default: Date.now() },
	creatorName: { type: String, required: true },
	creatorId: { type: ObjectId, ref: models.user.name, required: true },

	// Relations
	boardId: { type: ObjectId, ref: models.board.name, required: true }
});

module.exports = mongoose.model(models.list.name, schema);