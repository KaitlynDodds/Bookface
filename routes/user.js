const express = require('express');

const router = express.Router();

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
	// TODO: kzd -> finish creating authentication route 
});

// LOGIN - login form
router.get('/login', (req, res) => {
	res.render('user/login');
});

//LOGIN - post authentication

// LOGOUT


module.exports = router;