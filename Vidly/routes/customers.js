const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Joi = require('joi');

const Customers = mongoose.model('Customers', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    isGold: {
        type: Boolean,
        required: true
    },
    phone: {
        type: Number,
        required: true,
        minlength: 6
    }
}))

//lista svih customera
router.get('/', async (req, res) => {
    const customers = await Customers.find();
    res.send(customers);
})

//lista kursa sa odredjenim id-jem
router.get('/:id', async (req, res) => {
    const customer = await Customers.findById({_id: req.params.id })
    if(!customer) return res.status(404).send('Customer not exist')
    res.send(customer);
})

//kreiranje kursa
router.post('/', async (req, res) => {
    let {error} = validateCourse(req.body);
    if(error) return res,status(404).send(error.details[0].message);
    
    let customer = new Customers({
        name: req.body.name,
        isGold: req.body.isGold,
        phone: req.body.phone
    }) 

    customer = await customer.save();
    res.send(customer)
})

//update korisnika
router.put('/:id', async (req, res) => {
    let {error} = validateCourse(req.body);
    if(error) return res.status(404).send(error.details[0].message);

    const customer = await Customers.findByIdAndUpdate({_id: req.params.id}, {
        $set: {
            name: req.body.name,
            isGold: req.body.isGold,
            phone: req.body.phone
        }
    }, { new: true })
    if(!customer) return res.status(404).send('The genre with given id not found')

    res.send(customer)
})

//brisanje korisnika



//pomocna funkcija, sluzi za validaciju koda - Joi npm paket
function validateCourse(genre){
    const schema = {
        name: Joi.string().min(3).required(),
        isGold: Joi.boolean().required(),
        phone: Joi.number().min(6).required()
    }
    return Joi.validate(genre, schema);
    
}

module.exports = router;