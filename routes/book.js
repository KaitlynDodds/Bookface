const express = require('express');

const Book = require('../models/book');
const User = require('../models/user');

const helperScripts = require('../public/scripts/scripts');
const Authentication = require('./middleware/authentication');

const router = express.Router();

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect('/');
}

router.get('/', isLoggedIn, (req, res) => {
	res.render('book/feed', {isLoggedIn: true, user: req.user});
});

module.exports = router;