#!/usr/bin/env nodo 
//linea 1 se agrega para que nuestro archivo JavaScript sea ejecutable por node
const { mdLinks } = require('./index.js');
const { allLinks, uniqueLinks, brokenLinks } = require('./functions-cli.js');
const path = process.argv[2];
// const colors = require('colors');
const validate = process.argv.includes('--validate')|| process.argv.includes('--v');
const stats = process.argv.includes('--stats') || process.argv.includes('--s');
const options = { validate, stats };


mdLinks(path, options)
.then((result) => {
    if(stats && validate){
        console.log('Total:', functions-cli.allLinks(result))
        console.log('Unique:', functions-cli.uniqueLinks(result))
        console.log('Broken:', functions-cli.brokenLinks(result))
    }else if(stats){
        console.log('Total:', functions-cli.allLinks(result))
        console.log('Unique:', functions-cli.uniqueLinks(result))
    }else if(validate){
        result.forEach(links => {
            console.log('href:', links.href)
            console.log('text:', links.text)
            console.log('file:', links.file)
            console.log('status:', links.status)
            console.log('ok:', links.ok)
        });
    }else{
        result.forEach(links => {
            console.log('href:', links.href)
            console.log('text:', links.text)
            console.log('file:', links.file)
        })
    }
}).catch((error) => {
    console.log(error)
})







// const args = process.argv.slice(2);
// console.log('args: ', args);