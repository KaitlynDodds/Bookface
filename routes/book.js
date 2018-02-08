const express = require('express');
const Book = require('../models/book');
const User = require('../models/user');
const helperScripts = require('../public/scripts/scripts');
const router = express.Router();

router.get('/', (req, res) => {
	// get all users and books they have posted
	User.find({}).populate("books").exec((err, users) => {
		if (err) {
			console.log('error: ', err);
		} else {

			

			let books = [];
			users.forEach((user) => {
				books = books.concat(user["books"]);
			});
			// books should be ordered by latest added to oldest added 
			books.sort(helperScripts.compareDates);
			// books should be associated with the user that submitted them 
			res.render('book/index', {users: users, books: books});
		}
	});
});

module.exports = router;