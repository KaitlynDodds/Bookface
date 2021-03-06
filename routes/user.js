const express 	= require('express');
const passport 	= require('passport');

const router 	= express.Router();

const User 		= require('../models/user');

const middleware = require('../middleware');

// INDEX
router.get('/', (req, res) => {
	res.redirect('/logout');
});

// SHOW
router.get('/:id/profile', (req, res) => {
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
			res.render('user/profile', {profile_user: user});
		}
	});	
});

// EDIT
router.get('/:id/edit', middleware.checkIsUser, (req, res) => {
	User.findById(req.params.id, (err, user) => {
		if (err) {
			console.log('error: ', err);
			res.redirect('/');
		}
		res.render('user/edit', {user: user});
	});
});


// UPDATE
router.put('/:id', middleware.checkIsUser, (req, res)=> {
	User.findByIdAndUpdate(req.params.id, req.body.user, (err, user) => {
		if (err) {
			console.log('error: ', err)
			req.flash('error', err.message);;
			res.redirect('/user/' + req.params.id + '/edit');
		} 
		req.flash('success', 'Updated user profile successfully.');
		res.redirect('/user/' + req.params.id + '/profile');
	});
});

// DELETE
router.delete('/:id', middleware.checkIsUser, (req, res) => {
	User.findByIdAndRemove(req.params.id, (err, user) => {
		if (err) {
			console.log('error: ', err);
			req.flash('error', err.message);
			res.redirect('/user/' + req.params.id + '/profile');
		}
		req.flash('success', 'User account removed successfully.');
		res.redirect('/');
	});
});

module.exports = router;
