const express = require('express');

const router = express.Router();

// INDEX
router.get('/', (req, res) => {
	res.redirect('/');
});

// NEW - signup page
router.get('/signup', (req, res) => {
	res.render('user/signup');
});

// CREATE
router.post('/', (req, res) => {
	
});

// SHOW
router.get('/:id', (req, res) => {
	res.render('user/profile');
});





// EDIT

// UPDATE

// DELETE

module.exports = router;