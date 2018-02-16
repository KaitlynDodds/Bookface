const express = require('express');

const Book 		= require('../models/book');
const User 		= require('../models/user');
const Comment 	= require('../models/comment');

const isLoggedIn = require('./middleware/authentication');

const router = express.Router();

// INDEX - SHOW ALL BOOKS
router.get('/', isLoggedIn, (req, res) => {
	Book.find({}).populate('user').sort('-date_added').exec((err, books) => {
		if (err) {
			console.log('error: ', err);
		} else {
			res.render('book/feed', {books: books});
		}
	});
});


/*************** 
BOOK ROUTES 
***************/

// NEW - show new book form
router.get('/new', isLoggedIn, (req, res) => {
	res.render('book/new');
});

// SHOW - show profile for single book
router.get('/:id', isLoggedIn, (req, res) => {
	// need data for book comments, and data about users who made those comments
	Book.findById(req.params.id)
		.populate('user')
		.populate({ 
			path: 'comments',
			populate: { 
					path: 'user',
					model: 'User'
				}
		})
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
						res.redirect('/book');
					}
					user.books.push(savedBook._id);
					user.save((err, savedUser) => {
						if (err) {
							cosole.log('error: ', err);
							res.redirect('/books');
						}
						res.redirect('/books');
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

// UPDATE - submit changes to book 
router.put('/:id', isLoggedIn, (req, res) => {
	Book.findByIdAndUpdate(req.params.id, req.body.book, (err, book) => {
		if (err) {
			console.log('error: ', err);
			res.redirect('/');
		}
		res.redirect('/books/' + book._id);
	});
});

/*************** 
COMMENT ROUTES 
***************/

router.post('/:id/comments', isLoggedIn, (req, res) => {
	Book.findById(req.params.id, (err, book) => {
		if (err) {
			console.log('error: ', err);
			res.redirect('/');
		} else {
			// create new comment
			Comment.create(req.body.comment, (err, comment) => {
				if (err) {
					console.log('error: ', err);
					res.redirect('/');
				}
				// add user id to comment
				comment.user = req.user._id;
				comment.save();
				// push comment to book
				book.comments.push(comment._id);
				book.save();
				// redirect back to book page 
				res.redirect('/books/' + book._id);
			});
		}
	});
});

module.exports = router;














