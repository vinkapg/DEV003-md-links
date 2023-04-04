const fs = require('fs');
const path = require('node:path');

// ¿Existe una ruta?


// ¿Es una ruta absoluta?
const pathAbsolut = (route) =>{
  return path.isAbsolute(route)
} 

// ¿Es un archivo MD?

// función para leer archivo MD
const readMdFile = (path) => {
  fs.readFile(path, 'utf-8', (error, archivo) =>{
    if(error){
      throw error;
    }
    console.log(archivo);
    return archivo;
  });
}

readMdFile('./files/prueba2.txt');

//extraer link

//validar link con fetch --> hacer peticiones http

module.exports = {
  readMdFile,
  pathAbsolut
};
