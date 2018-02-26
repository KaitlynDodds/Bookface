const express = require('express');

const Book 		= require('../models/book');
const Comment 	= require('../models/comment');

const middleware = require('../middleware');

const router = express.Router({mergeParams: true});

// CREATE
router.post('/', middleware.isLoggedIn, (req, res) => {
	const author = {
		id: req.user.id,
		username: req.user.username
	};
	Book.findById(req.params.id, (err, book) => {
		if (err) {
			console.log('error: ', err);
			res.redirect('/');
		} else {
			// create new comment
			Comment.create(req.body.comment, (err, comment) => {
				if (err) {
					console.log('error: ', err);
					res.redirect('/');
				}
				// add author to comment
				comment.author = author;
				comment.save();
				// push comment to book
				book.comments.push(comment._id);
				book.save();
				// redirect back to book page 
				res.redirect('/books/' + book._id);
			});
		}
	});
});

// DELETE 
router.delete('/:comment_id', middleware.checkCommentOwnership, (req, res) => {
	Comment.findByIdAndRemove(req.params.comment_id, (err, comment) => {
		if (err) {
			console.log('error: ', err);
			res.redirect('/');
		}
		res.redirect('/books/' + req.params.id);
	});
});


module.exports = router;