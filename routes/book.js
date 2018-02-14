const express = require('express');

const Book = require('../models/book');
const User = require('../models/user');

const isLoggedIn = require('./middleware/authentication');

const router = express.Router();

// INDEX - SHOW ALL BOOKS
router.get('/', isLoggedIn, (req, res) => {
	res.render('book/feed');
});

// NEW - show new book form
router.get('/new', isLoggedIn, (req, res) => {
	res.render('book/new');
});

// CREATE - create new book 
router.post('/', isLoggedIn, (req, res) => {
	Book.create(req.body.book, (err, book) => {
		if (err) {
			console.log('error: ', err); 
			res.redirect('/book/new');
		} else {
			User.findById(req.user._id, (err, user) => {
				book.user = user._id;
				book.save((err, savedBook) => {
					if (err) {
						console.log('error: ', err);
						res.redirect('/user/' + req.user._id + '/profile');
					}
					user.books.push(savedBook._id);
					user.save((err, savedUser) => {
						if (err) {
							cosole.log('error: ', err);
							res.redirect('/user/' + req.user._id + '/profile');
						}
						res.redirect('/user/' + req.user._id + '/profile');
					});
				});
			});
		}
	});
});

module.exports = router;