const  express = require('express');
const app = express(); //nasa aplikacija

const Joi = require('joi');
const logger = require('./middleware/logg');
const auth = require('./middleware/auth');
const config = require('config');
const helmet = require('helmet');
const morgan = require('morgan');
const debug = require('debug')('app:startup');
const courses = require('./routes/courses')
const home = require('./routes/home')
// console.log(`NODE_END: ${process.env.NODE_ENV}`);
// console.log(`mail server: ${app.get('env')}`);

//*****Middleware functions

//built-in middleware
app.use(express.json())  //zbog req.body.name , zbog middleware-a je .json()
app.use(express.urlencoded({ extended: true })); //kadse salje par vrednost - kljuc
app.use(express.static('public')); //da cita sadrzaj iz tog foldera, slike, text, idt ..

//ove sam ja napravio - custom middleware function
app.use(logger)
app.use(auth)

//Third-party Middleware
app.use(helmet());
app.use('/api/courses', courses); //za svaki rutu /api/courses koristi course modul i svi ce imati putanju /api/course, zato je u modulu dovoljno samo /
app.use('/', home);

//configuration
console.log('Application Name: ', config.get('name'));
console.log('Mail Server: ', config.get('mail.host'));
console.log('Mail password: ', config.get('mail.password'));

//ovako ogranicavano sta se u kom modu prikazuje
if(app.get('env') === 'development') {
    app.use(morgan('tiny')); //loguje sve request-ove
    debug('Morgan enabled...');
}

//PORT uobicajeno ime za promenljivu kojoj dodeljujemo port, on ne sme biti staticki, jer moguce da port 3000 nije svima dostupan, u produkciji
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
})