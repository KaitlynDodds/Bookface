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
	]
});

module.exports = mongoose.model("User", userSchema);