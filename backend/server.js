const http = require('http');

const sever = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('holi mundo, desde nodejs!');
});

Server.listen(3000, () => {
    console.log('Servidor ejecutandose en http://localhost:3000');
});