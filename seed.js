const mongoose = require('mongoose');
const Book = require('./models/book');
const User = require('./models/user');
const Comment = require('./models/comment');

const bookData1 = [
	{
		title: "Harry Potter and the Prisoner of Azkaban",
		author: "J.K. Rowling",
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", 
		rating: 5,
		image: "https://images-na.ssl-images-amazon.com/images/I/81lAPl9Fl0L.jpg"
	},
	{
		title: "Pride and Prejudice",
		author: "Jane Austin",
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", 
		rating: 2,
		image: "http://thecrossculture.org/wp-content/uploads/2016/06/Pride-and-Prejudice_BN.jpg"
	},
];

const bookData2 = [
	{
		title: "Leviathan Wakes",
		author: "James A. Corey",
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", 
		rating: 3,
		image: "https://images-na.ssl-images-amazon.com/images/I/91npjUXXkzL.jpg"
	},
	{
		title: "The Way of Kings",
		author: "Brandon Sanderson",
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", 
		rating: 4,
		image: "https://images-na.ssl-images-amazon.com/images/I/91FZ41RwZzL.jpg"
	},
];

const commentData1 = [
	{
		username: "anonymous",
		content: "What an awesome book! It really made me think about my place in the universe!",
	}
];

const commentData2 = [
	{
		username: "anonymous",
		content: "This book put me to sleep! I can't believe you made it through it.",
	}
];

const userData = [ 
	{ 
		username: "John Smith",
		password: "password", 
		email: "john.smith@gmail.com",
		avatar: "https://webriti.com/wp-content/themes/themeshop/images/testimonial/no-image.png", 
		bio: "Curabitur vel nulla at ligula malesuada ornare. Nulla facilisi. Cras id laoreet nibh. Etiam sed congue ante. In sagittis nunc non metus pulvinar ornare. Ut elit mauris, rutrum quis dictum sed, dapibus sed ante. Vestibulum dapibus felis consequat, bibendum felis ut, lacinia sapien."
	},
	{ 
		username: "Jessie Peace",
		password: "password", 
		email: "jessie.peace@hotmail.com",
		avatar: "https://webriti.com/wp-content/themes/themeshop/images/testimonial/no-image.png", 
		bio: "Curabitur vel nulla at ligula malesuada ornare. Nulla facilisi. Cras id laoreet nibh. Etiam sed congue ante. In sagittis nunc non metus pulvinar ornare. Ut elit mauris, rutrum quis dictum sed, dapibus sed ante. Vestibulum dapibus felis consequat, bibendum felis ut, lacinia sapien."
	},
]

function seedDatabase() {

	function removeAllComments() {
		console.log('Removing comments...');
		return Comment.remove({});
	}

	function removeAllBooks() {
		console.log('Removing books...');
		return Book.remove({});
	}

	function removeAllUsers() {
		console.log('Removing all users...');
		return User.remove({});
	}

	function createUsers() {
		console.log('Creating users...');
		return userData.forEach((seedUser) => {
			User.create(seedUser, (err, user) => {
				console.log(user);
			});
		});
	}

	function createBooks() {
		// TODO: kzd-> NOT DRY, needs to be refactored
		// user 1 books
		bookData1.forEach((seedBook) => {
			Book.create(seedBook)
			.then((book) => {
				User.findOne(userData[0], (err, user) => {
					user.books.push(book._id);
					user.save();
				});
			});
		});
		
		// user 2 books
		console.log('Creating books...');
		bookData2.forEach((seedBook) => {
			Book.create(seedBook)
			.then((book) => {
				User.findOne(userData[1], (err, user) => {
					user.books.push(book._id);
					user.save();
				});
			});
		});		
	}

	function createComments() {
		console.log('Creating comments...');
		bookData1.forEach((seedBook) => {
			Book.findOne({name: seedBook.name})
			.then((book) => {
				Comment.create(commentData1, (err, comment) => {
					book.comments.push(comment._id);
					book.save();
				});
			}).catch((err) => {
				console.log('error: ', err);
			});
		});
	}

	function resetDB() {
		removeAllComments()
		.then(removeAllBooks)
		.then(removeAllUsers)
		// .then(createUsers)
		// .then(createBooks)
		.catch((err) => {
			console.log(err);
		});
	}

	resetDB();

};

module.exports = seedDatabase;
