const express = require('express');
const app = express();
const mongoose = require('mongoose');
const genres = require('./routes/genres');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi); //da ne bi pisali u svakom modelu
// const auth = require('./middleware/auth');
const home = require('./routes/home');
const customers = require('./routes/customers')
const movies = require('./routes/movies')
const rentals = require('./routes/rentals');
const users = require('./routes/users');
const auth = require('./routes/auth');
const config = require('config');

if(!config.get('jwtPrivateKey')) { //potrebno zbog tokena
    console.error('FATAL ERROR: jwtPrivateKey is not defined');
    process.exit(1); //sve sem 0 je failure
}

mongoose.connect('mongodb://localhost:27017/vidly', { 
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true 
    })
    .then( () => console.log('Connect to MongoDB...'))
    .catch( err => console.error('Could not connect to MongoDB...'))

app.use(express.json());
// app.use(auth);
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/', home);


const url = 'http://vidly.com/api/';


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
})      

//lista filmova- title genre-emmbeding NUmberInStock dailyRentalRate