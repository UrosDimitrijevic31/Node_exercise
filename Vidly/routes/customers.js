const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const { Customer, validate } = require('../models/customer')

//lista svih customera
router.get('/', async (req, res) => {
    const customers = await Customers.find().sort('name');
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
    let {error} = validate(req.body);
    if(error) return res,status(404).send(error.details[0].message);
    
    let customer = new Customer({
        name: req.body.name,
        isGold: req.body.isGold,
        phone: req.body.phone
    }) 

    customer = await customer.save();
    res.send(customer)
})

//update korisnika
router.put('/:id', async (req, res) => {
    let {error} = validate(req.body);
    if(error) return res.status(404).send(error.details[0].message);

    const customer = await Customer.findByIdAndUpdate({_id: req.params.id}, {
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
router.delete('/:id', async (req, res) => {
    const customer = await Customers.findByIdAndDelete({ _id: req.params.id });

    if(!customer) return res.status(404).send('Customer with given id not foubd');

    res.send(customer);
})

module.exports = router;