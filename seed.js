const mongoose = require('mongoose');
const Book = require('./models/book');

const bookData = [
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

const commentData = [
	{

	}
];

const userData = [
	{

	}
]

function seedDatabase() {
	// remove all books
	Book.remove({}, (err) => {
		if (err) {
			console.log(err);
		} else {
			// add new books	
			bookData.forEach((seedBook) => {
				Book.create(seedBook, (err, book) => {
					if (err) {
						console.log(err);
					} else {
						console.log('NEW BOOK');
						console.log(book);
					}
				})
			})		
		}
	});
	// create comments 
};

module.exports = seedDatabase;
