const Book 		= require('../../models/book');

function checkBookOwnership(req, res, next) {
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

module.exports = checkBookOwnership;