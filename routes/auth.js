const express = require('express');
const passport = require('passport');

const router = express.Router();
const User = require('../models/user');

// Register form
router.get('/register', (req, res) => {
	res.render('auth/register', {isLoggedIn: false});
});

// Register new user
router.post('/register', (req, res) => {
	User.register(new User(
			{
				username: req.body.username,
				email: req.body.email,
				avatar: req.body.avatar, 
				bio: req.body.bio,
			}
		), req.body.password, (err, user) => {
			if (err) {
				console.log('error: ', error);
				return res.render('register');
			} 
			passport.authenticate("local")(req, res, () => {
				res.redirect('/books');
			});
	});
});

// LOGIN - login form
router.get('/login', (req, res) => {
	res.render('auth/login', {isLoggedIn: false});
});

//LOGIN - post authentication
router.post('/login', passport.authenticate('local', {
	successRedirect: "/books",
	failureRedirect: "/user/login"
}), (req, res) => {
	
});

// LOGOUT
router.get('/logout', (req, res) => {
	req.logout();
	res.redirect('/');
});

module.exports = router;