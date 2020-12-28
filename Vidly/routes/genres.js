const express = require('express');
const router = express.Router();

const genres = [
    {id: 1, name: "Action"},
    {id: 2, name: "Mistery"},
    {id: 3, name: "Horror"},
    {id: 4, name: "Crime"}
]

//liste svih kurseva
router.get('/', (req, res ) => {
    res.send(genres);
})

//pojedinacni kurs
router.get('/:id', (req, res) => {
    // proverim da li postoji kurs
    let genre = genres.find(g => g.id === parseInt(req.params.id))
    if(!genre) return res.status(404).send('Genre not exist');
    res.send(genre);
})

//dodati kurs
router.post('/', (req, res) => {
    //moram da uzmem naziv kursa iz body-ja req i da ga proverim da l je validan
    const schema = {
        name: Joi.string().min(3).required()
    }
    let { error } = Joi.validate(req.body, schema);
    if(error) return res.status(400).send(error.details[0].message)
    
    let genre = {
        id: genres.length + 1,
        name: req.body.name        
    }

    genres.push(genre);
    res.send(genre);
})

//update kursa 
router.put('/:id', (req, res) => {
    //nadjemo prvo kurs koji treba da se update-uje
    let genre = genres.find(g => g.id === parseInt(req.params.id))
    if(!genre) return res.status(404).send('Genre with given id not foubd');

    //proverimo ime koje menjamo
    validateCourse(req.body)

    //promenimo ga
    genre.name = req.body.name;
    //posaljemo nazad 
    res.send(genre);

})

//brisanje kursa
router.delete('/:id', (req, res) => {
   let genre = genres.find(g => g.id === parseInt(req.params.id));
   if(!genre) return res.status(404).send('Genre with given id not foubd');
   
   let index = genres.indexOf(genre);
   console.log(`ovo je index ${index}`);
   genres.splice(index, 1);

   res.send(genre);
   
})

function validateCourse(genre){
    const schema = {
        name: Joi.string().min(3).required()
    }
    let { error } = Joi.validate(genre, schema);
    if(error) return res.status(400).send(error.details[0].message)
}

module.exports = router;