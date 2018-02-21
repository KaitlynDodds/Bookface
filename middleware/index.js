const Book = require('../models/book');
const User = require('../models/user');
const Comment = require('../models/comment');

var middlewareObj = {};

middlewareObj.isLoggedIn = function(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect('/login');
}

middlewareObj.checkIsUser = function(req, res, next) {
	// check if logged in
	if (req.isAuthenticated()) {
		// find user 
		User.findById(req.params.id, (err, user) => {
			if (err) {
				console.log('error: ', err);
				res.redirect('back');
			} 
			if (user._id.equals(req.user._id)) {
				// same user 
				return next();
			} else {
				res.redirect('back');
			}
		});
	} else {
		res.redirect('back');
	}
}

middlewareObj.checkBookOwnership = function(req, res, next) {
	// check if logged in
	if (req.isAuthenticated()) {
		// find book 
		Book.findById(req.params.id, (err, book) => {
			if (err) {
				console.log('error: ', err);
				res.redirect('back');
			}
			// check if book belongs to user 
			else if (book.owner.id.equals(req.user._id)) {
				return next();
			}
			else {
				res.redirect('back');
			}
		});
	} else {
		res.redirect('back');
	}
}

middlewareObj.checkCommentOwnership = function(req, res, next) {
	// check if logged in
	if (req.isAuthenticated()) {
		// find comment
		Comment.findById(req.params.comment_id, (err, comment) => {
			if (err) {
				console.log('error: ', err);
				res.redirect('back');
			} 
			// check if comments belongs to user 
			else if (comment.author.id.equals(req.user._id)) {
				return next();
			} else {
				res.redirect('back');
			}
		});
	} else {
		res.redirect('back');
	}
}

module.exports = middlewareObj;