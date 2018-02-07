const methodOverride = require('method-override'),
	  bodyParser = require('body-parser'),
	  mongoose = require('mongoose'),
	  express = require('express');

const app = express();
mongoose.connect('mongodb://127.0.0.1/bookface_app');

// ***********
// APP SETUP
// ***********
app.set('view engine', 'ejs');
app.set(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));



// ***********
// ROUTES
// ***********
app.get('/', (req, res) => {
	res.send('App working');
})



app.listen(3000, () => { console.log("App listening on port 3000") });