const http = require('http');

const server = http.createServer((req, res) => {
    res.end('42 !');
});

server.listen(process.env.PORT || 7000);
