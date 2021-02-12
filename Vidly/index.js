const express = require('express');
const app = express();
const mongoose = require('mongoose');
const genres = require('./routes/genres');
const home = require('./routes/home');
const auth = require('./middleware/auth');
const customers = require('./routes/customers')
const movies = require('./routes/movies')

mongoose.connect('mongodb://localhost:27017/vidly', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    .then( () => console.log('Connect to MongoDB...'))
    .catch( err => console.error('Could not connect to MongoDB...'))

app.use(express.json());
app.use(auth);
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/', home);


const url = 'http://vidly.com/api/';


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
})      

//lista filmova- title genre-emmbeding NUmberInStock dailyRentalRate