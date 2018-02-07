const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
	res.render('book/index');
});

module.exports = router;