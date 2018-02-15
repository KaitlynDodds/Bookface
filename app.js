const passportLocalMongoose = require('passport-local-mongoose');
	  methodOverride 		= require('method-override'),
	  expressSession 		= require('express-session');
	  localStrategy 		= require('passport-local'),
	  bodyParser 			= require('body-parser'),
	  mongoose 				= require('mongoose'),
	  passport 				= require('passport'),
	  express 				= require('express');

const bookRoutes 	= require('./routes/book');
const userRoutes 	= require('./routes/user');
const authRoutes 	= require('./routes/auth');

const UserModel = require('./models/user');

const seedDatabase = require('./seed.js');


// ***********
// APP SETUP
// ***********
const app = express();
mongoose.connect('mongodb://127.0.0.1/bookface_app');
// seedDatabase();
app.set('view engine', 'ejs');
app.use(methodOverride('_method'));
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));
// encode/decode session
app.use(expressSession({
	secret: "Books can transport you to a whole new world.",
	resave: false,
	saveUninitialized: false
}));
// passport setup
app.use(passport.initialize());
app.use(passport.session());
// read (deserialize) and encode (serialize) session 
passport.use(new localStrategy(UserModel.authenticate()));
passport.serializeUser(UserModel.serializeUser());
passport.deserializeUser(UserModel.deserializeUser());

// pass current user data to each route 
app.use(function(req, res, next) {
	res.locals.currentUser = req.user;
	next();
});


// ***********
// ROUTES
// ***********
app.get('/', (req, res) => {
	res.render('index');
});

app.use('/', authRoutes);
app.use('/books', bookRoutes);
app.use('/user', userRoutes);



app.listen(3000, () => { console.log("App listening on port 3000") });