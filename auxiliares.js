const fs = require('fs');
const path = require('node:path');

// ¿Existe una ruta? -- fs.access(path[, mode], callback)
const pathExist = (path) => {
  fs.access(path, fs.constants.F_OK, (err) => {
  console.log('\n> Checking if the file exists');
  if (err) {
    console.error('File does not exist');
  }
  else {
    console.log('File does exist');
  }
  });
}
pathExist('./files/prueba2.txt')

// ¿Es una ruta absoluta?
const pathAbsolut = (route) =>{
  return path.isAbsolute(route)
} 

// ¿Es un archivo MD?
// const fileExt = (route) => {return path.extname(route)}
const fileExt = (route) => {
  if(path.extname(route) === '.md'){
    console.log(route)
  }else{
    console.log('no es archivo md')
  }
}
fileExt('./files/prueba2.txt')

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

//el archivo tiene links? 

//extraer link

//validar link con fetch --> hacer peticiones http

module.exports = {
  pathExist,
  pathAbsolut,
  fileExt,
  readMdFile
};
