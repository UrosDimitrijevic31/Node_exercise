//klasa EventerEmmiter
const EventEmmiter = require('events'); 


const url = 'www.inovatech.com/users';

class Logger extends EventEmmiter { //logger klasa ima sve metode EventEmmiter-a
    log(message) {
        console.log(message);
        this.emit('Nesto se desilo', { id: 1, url: 'neki url'});
    }
}    


module.exports = Logger; 