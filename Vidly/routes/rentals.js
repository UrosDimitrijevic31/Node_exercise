const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const {Rental, validate } = require('../models/rental');
const {Movie} = require('../models/movie');
const {Customer} = require('../models/customer');


//lista svih porudzbina
router.get('/', async (req, res) => {
    const rentals = await Rental.find().sort('-dateOut');
    res.send(rentals);
})

//kreiranje porudzbine
router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const customer = await Customer.findById(req.body.customerId);
    if(!customer) return res.status(400).send('Invalid customer..');

    const movie = await Movie.findById(req.body.movieId);
    if(!movie) return res.status(400).send('Invalid movie..');

    if(movie.numberInStock === 0 ) return res.status(400).send('Movi not in stock'); //stock - lager

    let rental = new Rental({
        customer: {
            _id: customerId,
            name: customer.name,
            phone: customer.phone
        },
        movie: {
            _id: movieId,
            title: movie.title,
            dailyRentalRate: movie.dailyRentalRate
        }
    });
    rental = await rental.save();

    movie.numberInStock--; //skinemo sa stanja jedan film
    movie.save;

    res.send(rental); //kad pozove 2x save() moze doci do pucanja konekcije, pa nam trebaju transakcije (nesto slicno)
});