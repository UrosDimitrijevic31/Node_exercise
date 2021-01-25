const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Joi = require('joi');

const Genre = mongoose.model('Genre', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    }
}));


//liste svih kurseva
router.get('/', async (req, res ) => {
    const genres = await Genre.find().sort('name');
    res.send(genres);
})

//pojedinacni kurs
router.get('/:id', async (req, res) => {
    let genre = await Genre.findById(req.params.id);

    if(!genre) return res.status(404).send('Genre not exist');

    res.send(genre);
})

//dodati kurs
router.post('/', async (req, res) => {    
    let { error } = validateCourse(req.body);
    if(error) return res.status(400).send(error.details[0].message)
    let genre = new Genre({
        name: req.body.name        
    })

    genre = await genre.save();
    res.send(genre);
})

//update kursa 
router.put('/:id', async (req, res) => {
    const { error } = validateGenre(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findByIdAndUpdate({ _id: req.params.id}, {
        $set: {
            name: req.body.name
        }
    }, {new: true})

    if(!genre) return res.status(404).send('The genre with given id not found')
    res.send(genre);
})

//brisanje kursa
router.delete('/:id', async (req, res) => {
   const genre = await Genre.findByIdAndDelete({ _id: req.params.id }); 

   if(!genre) return res.status(404).send('Genre with given id not foubd');

   res.send(genre);
})

//pomocna funkcija, sluzi za validaciju koda - Joi npm paket
function validateCourse(genre){
    const schema = {
        name: Joi.string().min(3).required()
    }
    return Joi.validate(genre, schema);
    
}

module.exports = router;