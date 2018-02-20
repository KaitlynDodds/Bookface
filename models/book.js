const mongoose = require('mongoose');

// Book Schema
var bookSchema = new mongoose.Schema({
	title: String,
	author: String,
	description: String, 
	image: String,
	rating: {
		type: Number,
		min: 0,
		max: 5, 
	}, 
	comments: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Comment"
		}
	],
	date_added: {
		type: Date,
		default: Date.now
	},
	owner: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
		},
		username: String
	}
});


module.exports = mongoose.model("Book", bookSchema);