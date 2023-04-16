#!/usr/bin/env nodo 
//linea 1 se agrega para que nuestro archivo JavaScript sea ejecutable por node
const { mdLinks } = require('./index.js');
const path = process.argv[2];
const options = { validate, stats };
const colors = require('colors');

const validate = process.argv.includes('--validate')|| process.argv.includes('--v');
const stats = process.argv.includes('--stats') || process.argv.includes('--s');

mdLinks(path, options)
.then(() => {

}).catch((error) => {
    console.log(error)
})







// const args = process.argv.slice(2);
// console.log('args: ', args);