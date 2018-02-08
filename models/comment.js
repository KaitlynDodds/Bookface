const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		default: "Anonymous"
	},
	content: String,
	date_added: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model("Comment", commentSchema);