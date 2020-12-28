const express = require('express');
const app = express();
const Joi = require('joi');
const genres = require('./routes/genres');
const home = require('./routes/home');
const auth = require('./middleware/auth');

app.use(express.json());
app.use(auth);
app.use('/genres/api', genres);
app.use('/', home);


const url = 'http://vidly.com/api/';


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
})      