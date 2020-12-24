const http = require('http');

//server je eventEmmiter
const server = http.createServer((req, res) => {
    if(req.url === '/') {
        res.write('<h1 style="color: blue;">Cao sa servera</h1>');
        res.end();
    }

    if(req.url === '/api/course') {
        res.write(JSON.stringify([1, 2, 3]));
        res.end();
    }
});

server.on('connection', () => {
    console.log('Nova konekcija');
});

server.listen(3000);

console.log('Listening on port 3000...');
