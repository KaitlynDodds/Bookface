const mongoose = require('mongoose');
const Book = require('./models/book');
const User = require('./models/user');
const Comment = require('./models/comment');

const bookData1 = [
	{
		name: "Harry Potter and the Prisoner of Azkaban",
		author: "J.K. Rowling",
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", 
		rating: 5,
		image: "https://images-na.ssl-images-amazon.com/images/I/81lAPl9Fl0L.jpg"
	},
	{
		name: "Pride and Prejudice",
		author: "Jane Austin",
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", 
		rating: 2,
		image: "http://thecrossculture.org/wp-content/uploads/2016/06/Pride-and-Prejudice_BN.jpg"
	},
];

const bookData2 = [
	{
		name: "Leviathan Wakes",
		author: "James A. Corey",
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", 
		rating: 3,
		image: "https://images-na.ssl-images-amazon.com/images/I/91npjUXXkzL.jpg"
	},
	{
		name: "The Way of Kings",
		author: "Brandon Sanderson",
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", 
		rating: 4,
		image: "https://images-na.ssl-images-amazon.com/images/I/91FZ41RwZzL.jpg"
	},
];

const commentData1 = [
	{
		content: "What an awesome book! It really made me think about my place in the universe!",
	}
];

const commentData2 = [
	{
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

	// remove all comments
	// Comment.remove({}, (err) => {
	// 	if (err) {
	// 		console.log(err);
	// 	} else {
	// 		console.log('comments removed');
	// 	}
	// });

	// // remove all books
	// Book.remove({}, (err) => {
	// 	if (err) {
	// 		console.log(err);
	// 	}  else {
	// 		console.log('books removed');
	// 	}
	// });

	// // remove all users 
	// User.remove({}, (err) => {
	// 	if (err) {
	// 		console.log(err);
	// 	} else {
	// 		console.log('user removed');
	// 	}
	// });

	// // create users first
	// userData.forEach((seedUser) => {
	// 	User.create(seedUser, (err, user) => {
	// 		if (err) {
	// 			console.log(err);
	// 		} else {
	// 			console.log('USER CREATED');
	// 			console.log(user);
	// 		}
	// 	});
	// });
	
	// // Add books to first user 
	// User.findOne({username: userData[0]["username"]}, (err, user) => {
	// 	if (err) {
	// 		console.log(err);
	// 	} else {
	// 		console.log('ADDING BOOKS TO USER');
	// 		console.log(user);
	// 		// create books 
	// 		bookData1.forEach((seedBook) => {
	// 			Book.create(seedBook, (err, book) => {
	// 				if (err) {
	// 					console.log(err);
	// 				} else {
	// 					console.log(book);
	// 					// push book to user
	// 					user.books.push(book._id);
	// 					user.save();
	// 				}
	// 			});
	// 		});
	// 	}
	// });
	
};

module.exports = seedDatabase;
