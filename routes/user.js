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

// UPDATE

// DELETE

module.exports = router;
