const User = require('../../models/user');

function checkIsUser(req, res, next) {
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

module.exports = checkIsUser;