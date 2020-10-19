const products = require('../data/products');
const { v4: uuidv4 } = require('uuid');
const { writeFileToData } = require('../utils')

function findAll() {

    //we dont need to use a promise but just to mimic the bahviour of any other database service we do so.
    return new Promise((resolve, reject) => {
        resolve(products); //on request we simply want to return the products so in this case we resolve our promise with the data
    })
}

function findById(id) {

    return new Promise((resolve, reject) => {
        const product = products.find((p) => p.id === id);
        resolve(product);
    })
}

function create(product) {

    return new Promise((resolve, reject) => {

        const newProduct = { id: uuidv4(), ...product };

        products.push(newProduct);

        writeFileToData('./data/products.json', products);

        resolve(newProduct); //acknowledge by returning the same product 

    })
}

function update(id, product) {

    return new Promise((resolve, reject) => {

        const index = products.findIndex((p) => p.id === id);

        products[index] = { id, ...product }

        writeFileToData('./data/products.json', products);

        resolve(products[index]); //acknowledge by returning the same product 

    })
}

function deleteById(id) {



    return new Promise((resolve, reject) => {

        const index = products.findIndex((p) => p.id === id);
        //instead we could filter the products to not matcth the id that is passed in herewhich woul have done our job too, but i've chosen splice to acc. our task
        products.splice(index, 1);

        writeFileToData('./data/products.json', products);

        resolve(); //acknowledge by returning the same product 

    });

}

////////////////////////
// OR we could have done

// function findAll(){
//     return products;
// }

////////////////////////

module.exports = {
    findAll,
    findById,
    create,
    update,
    deleteById
}
