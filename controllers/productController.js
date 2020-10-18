//if we would have made use of destrcuturing to directly extarct te findAll function from the module we could have not required to use the . (dot) to accesss it. instead we culd have accsesedd it directly as `findAll()`.

const Product = require('../models/productModel');


//because our model returns a promise we make use of async/await


// @desc GET ALL Products
// @route /api/products
async function getProducts(req, res) { //this function is going to be called when the user tries to access a url so we put in req and res too in here
    try {
        const products = await Product.findAll(); //get the products from the model
        //note that we have used . (dot) to access the function(findAll) in the Product module 

        ///return the received products 
        res.writeHead(200, {
            'Content-type': 'application/json'
        });
        res.end(JSON.stringify(products))
    } catch (error) {
        console.log(error);
    }
}

// @desc Get single product
// @route /api/product/:id
async function getProductById(req, res, id) {
    try {

        const product = await Product.findById(id);

        res.writeHead(200, {
            'Content-type': 'application/json'
        });
        res.end(JSON.stringify(product))
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getProducts,
    getProductById
}
