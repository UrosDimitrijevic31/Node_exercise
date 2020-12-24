const path = require('path'); //za rad sa putanjama direktorijuma i fajlova... putanje, nazivi, ekstenzije

const os = require('os'); //informacije o operativnom sistemu, ako ne koristimo node ne moze da ih dobijemo jer js radi u browseru

const fs = require('fs'); //rad sa fajlovima

//klasa EventerEmmiter
const EventEmmiter = require('events'); 

// on uvek mora da ide pre emit, emmit poziva ucitane on listenere redom, da je pre ne bi imao nijedan da pozove, ne moze da gleda kod unapred
//addListener je isto sto i on, al se on cesce koristi
// emmiter.on('Nesto se desilo', (arrg) => { 
//     console.log('detektovana promena', arrg);
// })

const Logger = require('./logger');
const logger = new Logger();

logger.on('Nesto se desilo', (arg) => {
    console.log('Detektovana promena', arg);
})

logger.log(('poruka poslata iz app.js'));

//npm
let _ = require('underscore');

console.log( _.contains([1,2,3], 2));
