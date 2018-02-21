$('document').ready(function(){
	// use for star rating system on books
	$('.ui.rating').rating({
			interactive: false, 
			maxRating: 5
		});

	// close flash notifications
	$('.message .close').on('click', function() {
	    $(this)
	      .closest('.message')
	      .transition('fade');
	  });

	// validate register new user and edit user profile forms 
	$('.user-info-form')
	  .form({
	    fields: {
	      username: {
	        identifier: 'username',
	        rules: [
	          {
	            type   : 'empty',
	            prompt : 'Please enter your username'
	          }
	        ]
	      },
	      email: {
	        identifier: 'email',
	        rules: [
	          {
	            type   : 'email',
	            prompt : 'Please enter a valid email address'
	          }
	        ]
	      },
	      password: {
	        identifier: 'password',
	        rules: [
	          {
	            type   : 'empty',
	            prompt : 'Please enter a password'
	          },
	          {
	            type   : 'minLength[8]',
	            prompt : 'Your password must be at least {ruleValue} characters'
	          }
	        ]
	      },
	      avatar: {
	        identifier: 'avatar',
	        rules: [
	          {
	            type   : 'url',
	            prompt : 'Please provide an image for your avatar'
	          }
	        ]
	      },
	      bio: {
	        identifier: 'bio',
	        rules: [
	          {
	            type   : 'empty',
	            prompt : 'Let us know a little bit about you! Please provide a short description of yourself.'
	          }
	        ]
	      }
	    }
	  });

	  // validate new book and edit book forms 
	$('.book-info-form').form({
		fields: {
			title: {
		        identifier: 'title',
		        rules: [
		          {
		            type   : 'empty',
		            prompt : 'Please enter a title'
		          }
		        ]
	      	},
	      	author: {
	      		identifier: 'author',
	      		rules: [
	      			{
	      				type: 'empty',
	      				prompt: 'Please enter an author'
	      			}
	      		]
	      	},
	      	image: {
	      		identifier: 'image',
	      		rules: [
	      			{
	      				type: 'url',
	      				prompt: 'Please provide cover art'
	      			}
	      		]
	      	},
	      	rating: {
	      		identifier: 'rating',
	      		rules: [
	      			{
	      				type: 'minCount[1]',
	      				prompt: 'Please select a rating'
	      			},
	      			{
	      				type: 'maxCount[5]',
	      				prompt: 'Please select a rating'
	      			}
	      		]
	      	},
	      	description: {
	      		identifier: 'description',
	      		rules: [
	      			{
	      				type: 'empty',
	      				prompt: 'Please enter a description'
	      			}
	      		]
	      	}   		
		}
	});

	// validate login form 
	$('#login-form').form({
		fields: {
			username: {
				identifier: 'username',
				rules: [
					{
						type: 'empty',
						prompt: 'Please enter a username'
					}
				]
			},
			password: {
				identifier: 'password',
				rules: [
					{
						type: 'minLength[8]',
						prompt: 'Password must be at least 8 characters'
					}
				]
			}
		}
	});

});
