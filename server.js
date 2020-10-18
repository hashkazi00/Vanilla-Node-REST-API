const http = require('http');
const products = require('./data/products');


const server = http.createServer((req, res) => {
    if (req.url === '/api/products' && req.method === 'GET') { //only incase of a get request

    } else {
        res.writeHead(404, {
            'Content-Type': 'application/json'
        });
        res.end(JSON.stringify({ Message: 'Route not found!!!' }));
    }
})


const PORT = process.env.PORT || 5000;  //if the process runs on a server we will have a different port 

server.listen(PORT, '127.0.0.1', () => {
    console.log(`Running server at port ${PORT}`);
})