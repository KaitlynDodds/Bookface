const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	username: String,
	password: String, 
	email: String,
	avatar: String, 
	bio: String,
	date_joined: {
		type: Date,
		default: Date.now
	}, 
	books: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Book"
		}
	],
	commets: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		}
	]
});

module.exports = mongoose.model("User", userSchema);