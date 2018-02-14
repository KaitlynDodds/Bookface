const express = require('express');

const Book = require('../models/book');
const User = require('../models/user');

const isLoggedIn = require('./middleware/authentication');

const router = express.Router();

router.get('/', isLoggedIn, (req, res) => {
	res.render('book/feed');
});

module.exports = router;