const express = require('express');
const passport = require('passport');

const router = express.Router();

const User = require('../models/user');
const isLoggedIn = require('./middleware/authentication');

// INDEX
router.get('/', (req, res) => {
	res.redirect('/logout');
});

// SHOW
router.get('/:id/profile', isLoggedIn, (req, res) => {
	User.findById(req.params.id, (err, user) => {
		if (err) {
			console.log('error: ', err);
			res.redirect('/logout'); // FIXME: kzd -> secure?
		} else {
			res.render('user/profile', {isLoggedIn: isLoggedIn, user: user});
		}
	});	
});

// EDIT
router.get('/:id/edit', isLoggedIn, (req, res) => {
	User.findById(req.params.id, (err, user) => {
		var loggedInUserId = req.user._id.toString();
		var parameterUserId = user._id.toString();
		if (loggedInUserId !== parameterUserId) {
			// logged in user is not the same user as is specified by the id in the url 
			res.redirect('/logout');
		}
		res.render('user/edit', {isLoggedIn: true, user: user});
	});
});

// UPDATE

// DELETE

module.exports = router;
