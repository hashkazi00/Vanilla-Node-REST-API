//if we would have made use of destrcuturing to directly extarct te findAll function from the module we could have not required to use the . (dot) to accesss it. instead we culd have accsesedd it directly as `findAll()`.

const Product = require('../models/productModel');
const { getPostData } = require('../utils');


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

        const product = await Product.sendById(id);
        if (!product) {
            res.writeHead(404, {
                'Content-Type': 'application/json'
            });
            res.end(JSON.stringify({ Message: 'Product not found!!!' }));
        } else {
            res.writeHead(200, {
                'Content-type': 'application/json'
            });
            res.end(JSON.stringify(product))
        }


    } catch (error) {
        console.log(error);
    }
}

// @desc Get single product
// @route /product/:id
async function getProductByIdForView(req, res, id) {
    try {

        const product = await Product.sendById(id);
        if (!product) {
            res.writeHead(404, {
                'Content-Type': 'application/json'
            });
            res.end(JSON.stringify({ Message: 'Product not found!!!' }));
        } else {
            res.writeHead(200, {
                'Content-type': 'text/html'
            });
            res.end(product)
        }


    } catch (error) {
        console.log(error);
    }
}


// @desc POST Create a product
// @route /api/products
async function createProduct(req, res) {

    try {
        const body = await getPostData(req); //a promise which gets us the body 

        const { title, description, price } = JSON.parse(body);

        const product = {
            title,
            description,
            price
        };

        const newProduct = await Product.create(product);

        res.writeHead(201, {
            'Content-type': 'application/json'
        });

        return res.end(JSON.stringify(newProduct))

    } catch (error) {
        console.log(error);
    }
}





// @desc Create a product
// @route /api/products
// async function createProduct(req, res) {
//     try {

//         //handling the post with data in the body
//         let body = '';

//         //1. Convert the data in the body to 'json'/string
//         //'data' is an event on the request of sending data
//         req.on('data', (chunk) => { //chunk is a buffer we now need to append the data in the buffer to body
//             body += chunk.toString(); //JSON format
//         });

//         //2. convert the 'body' to js object and then extract the data to send te response
//         //'end' is the event that is fired on the end of the request
//         req.on('end', async () => {

//             //convert the string data(JSON) to object.
//             const { title, description, price } = JSON.parse(body); //we implicitly have accesss to the 'body' 

//             const product = {
//                 title,
//                 description,
//                 price
//             };

//             const newProduct = await Product.create(product); //because we are awaiting response here, the enclosing function should be async

//             res.writeHead(201, { //201 for resource created status
//                 'Content-type': 'application/json'
//             });

//             return res.end(JSON.stringify(newProduct))
//         })



//     } catch (error) {
//         console.log(error);
//     }
// }



// @desc Update Product by ID
// @route PUT /api/product/:id
async function updateProduct(req, res, id) {
    try {
        const product = await Product.findById(id);

        if (!product) {
            res.writeHead(404, {
                'Content-Type': 'application/json'
            });
            res.end(JSON.stringify({ Message: 'Product not found!!!' }));
        } else {
            const body = await getPostData(req); //a promise which gets us the body 

            const { title, description, price } = JSON.parse(body);

            const productData = {
                //or operator is used so that we allow the user to update specific parts 
                title: title || product.title,
                description: description || product.description,
                price: price || product.price
            };

            const updProduct = await Product.update(id, productData);

            res.writeHead(200, {
                'Content-type': 'application/json'
            });

            return res.end(JSON.stringify(updProduct))
        }

    } catch (error) {
        console.log(error);
    }
}


// @desc Delete Product by ID
// @route DELETE /api/product/:id
async function deleteProduct(req, res, id) {
    try {
        const product = await Product.findById(id);

        if (!product) {
            res.writeHead(404, {
                'Content-Type': 'application/json'
            });
            res.end(JSON.stringify({ Message: 'Product not found!!!' }));
        } else {

            await Product.deleteById(id);

            res.writeHead(200, {
                'Content-type': 'application/json'
            });

            return res.end(JSON.stringify({ message: `Product with id${id} removed  :)` }))
        }

    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    getProductByIdForView
}
