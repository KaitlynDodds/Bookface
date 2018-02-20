const express = require('express');

const Book 		= require('../models/book');
const User 		= require('../models/user');
const Comment 	= require('../models/comment');

const isLoggedIn 			= require('./middleware/isLoggedIn');
const checkBookOwnership 	= require('./middleware/checkBookOwnership');

const router = express.Router();

// INDEX - SHOW ALL BOOKS
router.get('/', (req, res) => {
	Book.find({})
		.sort('-date_added')
		.exec((err, books) => {
			if (err) {
				console.log('error: ', err);
			} else {
				res.render('book/feed', {books: books});
			}
	});
});

// NEW - show new book form
router.get('/new', isLoggedIn, (req, res) => {
	res.render('book/new');
});

// SHOW - show profile for single book
router.get('/:id', (req, res) => {
	// need data for book comments, and data about users who made those comments
	Book.findById(req.params.id)
		.populate('comments')
		.exec((err, book) => {
			if (err) {
				console.log('error: ', err);
				res.redirect('/');
			}
			res.render('book/show', {book: book});
	});
});

// CREATE - create new book 
router.post('/', isLoggedIn, (req, res) => {
	// user who is creating book
	const owner = {
		id: req.user._id,
		username: req.user.username
	};
	User.findById(req.user._id, (err, user) => {
		if (err) {
			console.log('error: ', err);
			res.redirect('/book/new');
		}
		Book.create(req.body.book, (err, book) => {
			if (err) {
				console.log('error: ', err);
				res.redirect('/books/new');
			}
			// add owner to book
			book.owner = owner;
			book.save();
			// push book to user 
			user.books.push(book._id);
			user.save();
			// redirect
			res.redirect('/books');
		});
	});
});

// EDIT - show form to edit book
router.get('/:id/edit', checkBookOwnership, (req, res) => {
	Book.findById(req.params.id, (err, book) => {
		if (err) {
			console.log('error: ', err);
			res.redirect('/user/' + req.user._id + '/profile');
		}
		res.render('book/edit', {book: book});
	});
});

// UPDATE - submit changes to book 
router.put('/:id', checkBookOwnership, (req, res) => {
	Book.findByIdAndUpdate(req.params.id, req.body.book, (err, book) => {
		if (err) {
			console.log('error: ', err);
			res.redirect('/');
		}
		res.redirect('/books/' + book._id);
	});
});

// DELETE 
router.delete('/:id', checkBookOwnership, (req, res) => {
	Book.findByIdAndRemove(req.params.id, (err, book) => {
		if (err) {
			console.log('error: ', err);			
		} 
		res.redirect('/user/' + req.user._id + '/profile');
	});
});


module.exports = router;














