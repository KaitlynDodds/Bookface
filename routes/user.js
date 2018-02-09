const express = require('express');
const passport = require('passport');
const router = express.Router();
const User = require('../models/user');

// INDEX
router.get('/', (req, res) => {
	res.redirect('/');
});

// SHOW
// router.get('/:id', (req, res) => {
// 	res.render('user/profile');
// });

// EDIT

// UPDATE

// DELETE


// Auth Routes

// NEW - register form
router.get('/register', (req, res) => {
	res.render('user/register');
});

// CREATE - create new user
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
				res.redirect('/');
			});
	});
});

// LOGIN - login form
router.get('/login', (req, res) => {
	res.render('user/login');
});

//LOGIN - post authentication
router.post('/login', passport.authenticate('local', {
	successRedirect: "/",
	failureRedirect: "/user/login"
}), (req, res) => {
	
});

// LOGOUT
router.get('/logout', (req, res) => {
	req.logout();
	res.redirect('/');
});

module.exports = router;