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

// SHOW - show profile for single book
router.get('/:id', isLoggedIn, (req, res) => {
	Book.findById(req.params.id).populate("comments").populate('user').exec((err, book) => {
		if (err) {
			console.log('error: ', err);
			res.redirect('/');
		}
		res.render('book/show', {book: book});
	});
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

// DELETE 
router.delete('/:id', isLoggedIn, (req, res) => {
	Book.findByIdAndRemove(req.params.id, (err, book) => {
		if (err) {
			console.log('error: ', err);			
		} 
		res.redirect('/user/' + req.user._id + '/profile');
	});
});

// EDIT - show form to edit book
router.get('/:id/edit', isLoggedIn, (req, res) => {
	Book.findById(req.params.id, (err, book) => {
		if (err) {
			console.log('error: ', err);
			res.redirect('/user/' + req.user._id + '/profile');
		}
		res.render('book/edit', {book: book});
	});
});

// CREATE - submit changes to book 
router.put('/:id', isLoggedIn, (req, res) => {
	Book.findByIdAndUpdate(req.params.id, req.body.book, (err, book) => {
		if (err) {
			console.log('error: ', err);
			res.redirect('/books/' + book._id);
		}
		res.redirect('/books/' + book._id);
	});
});

module.exports = router;














