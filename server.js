const http = require('http'); //first method of importing a module

const { getProducts, getProductById, createProduct, updateProduct, deleteProduct, getProductByIdForView } = require('./controllers/productController'); //method to include a function from a module usingf destructuring


const server = http.createServer((req, res) => {
    if (req.url === '/api/products' && req.method === 'GET') { //only incase of a get request
        getProducts(req, res); //note that we passed in req and res so that the controller function does it's work

        //our 'controller' queries the model which contains the data and responds to the browsers request 
    } else if (req.url.match(/\/api\/product\/([0-9]+)/) && req.method === 'GET') {
        const id = req.url.split('/')[3]; //what is the id
        console.log(id)
        getProductById(req, res, id);
    } else if (req.url.match(/\/product\/([0-9]+)/) && req.method === 'GET') { //View Product URL
        const id = req.url.split('/')[2]; //what is the id
        console.log(id)
        getProductByIdForView(req, res, id);
    } else if (req.url === '/api/products' && req.method === 'POST') {

        createProduct(req, res);

    } else if (req.url.match(/\/api\/product\/([0-9]+)/) && req.method === 'PUT') {
        const id = req.url.split('/')[3]; //what is the id
        updateProduct(req, res, id);

    } else if (req.url.match(/\/api\/product\/([0-9]+)/) && req.method === 'DELETE') {
        const id = req.url.split('/')[3]; //what is the id
        deleteProduct(req, res, id);

    } else {
        res.writeHead(404, {
            'Content-Type': 'application/json'
        });
        res.end(JSON.stringify({ Message: 'Route not found!!!' }));
    }
})


const PORT = process.env.PORT || 5500;  //if the process runs on a server we will have a different port 

server.listen(PORT, () => {
    console.log(`Running server at port ${PORT}`);
})