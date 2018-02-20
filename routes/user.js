const express = require('express');
const passport = require('passport');

const router = express.Router();

const User = require('../models/user');
const isLoggedIn = require('./middleware/isLoggedIn');

// INDEX
router.get('/', (req, res) => {
	res.redirect('/logout');
});

// SHOW
router.get('/:id/profile', isLoggedIn, (req, res) => {
	User.findById(req.params.id)
		.populate(
			{ 
				path: 'books', 
				model: 'Book', 
				options: 
					{ 
						sort: 
							{ 'date_added': -1 // grab books newest first
						} 
					}
			})
		.exec((err, user) => {
		if (err) {
			console.log('error: ', err);
			res.redirect('/logout'); // FIXME: kzd -> secure?
		} else {
			// pass user whos profile is attempting to be viewed, not necessarily the currentUser
			res.render('user/profile', { books: user.books, userProfile: user});
		}
	});	
});

// EDIT
router.get('/:id/edit', isLoggedIn, (req, res) => {
	User.findById(req.params.id, (err, user) => {
		if (err) {
			console.log('error: ', err);
			res.redirect('/');
		}
		res.render('user/edit');
	});
});


// UPDATE
router.put('/:id', isLoggedIn, (req, res)=> {
	User.findByIdAndUpdate(req.params.id, req.body.user, (err, user) => {
		if (err) {
			console.log('error: ', err);
			res.redirect('/user/' + req.params.id + '/edit');
		} 
		res.redirect('/user/' + req.params.id + '/profile');
	});
});

// DELETE
router.delete('/:id', isLoggedIn, (req, res) => {
	User.findByIdAndRemove(req.user._id, (err, user) => {
		if (err) {
			console.log('error: ', err);
			res.redirect('/user/' + req.params.id + '/profile');
		}
		res.redirect('/');
	});
});

module.exports = router;
