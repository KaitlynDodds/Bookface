const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

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

// adds authentication methods to schema 
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);