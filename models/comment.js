const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
	author: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
		},
		username: String
	},
	content: String,
	date_added: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model("Comment", commentSchema);