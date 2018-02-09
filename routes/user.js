const express = require('express');
const passport = require('passport');
const router = express.Router();
const User = require('../models/user');

// INDEX
router.get('/', (req, res) => {
	res.redirect('/');
});

// SHOW
// router.get('/:id/profile', (req, res) => {
// 	res.render('user/profile');
// });

// EDIT

// UPDATE

// DELETE

module.exports = router;
