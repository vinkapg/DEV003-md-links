const fs = require('fs');
const path = require('node:path');

// ¿Existe una ruta? -- fs.access(path[, mode], callback)
const pathExist = (path) => {
  fs.access(path, fs.constants.F_OK, (err) => {
  if (err) {
    // console.error('File does not exist');
    return false
  }
  else {
    // console.log('File does exist');
    return true
  }
  });
}
pathExist('./README.md')

// ¿Es una ruta absoluta?
const pathAbsolut = (route) =>{
  return path.isAbsolute(route)
} 
// console.log(pathAbsolut('./README.md'));

//convertir ruta relativa en absoluta
const transformAbsolute = (route) => {
  return path.resolve(route) //path.resolve([...path])
}
console.log(transformAbsolute('./README.md'));


// ¿Es un archivo MD?
const fileExt = (route) => {
  if(path.extname(route) === '.md'){
    // console.log(route)
    return true
  }else{
    // console.log('no es archivo md')
    return false
  }
}
fileExt('./README.md')

// función para leer archivo MD
const readMdFile = (path) => {
  return new Promise ((resolve, reject) => {
    fs.readFile(path, 'utf-8', (error, archivo) =>{
      if(error){
        reject(error)
      }//debe devolver una promesa 
      // console.log(archivo);
      resolve(archivo)
    });
  })  
}
readMdFile('./files/prueba.md').then((result) => {
 console.log(result)
}).catch((error) =>{
  console.log(error)
})

//el archivo tiene links? o existe URL
const fileLinks = (fileContent, filePath) => {
  // console.log('Holaaa, estoy aca',fileContent)
 let expReg = /\[([^\]]+)\]\((http[s]?:\/\/[^\)]+)\)/g; //saca links de archivo
 let url = /\(([^)]+)\)/; // va a sacar solo lo que este entre ()
 let corchetes = /\[(.*?)\]/;
 let datosLinks = Array.from(fileContent.match(expReg), (links) => {
  return {//extraer link-URL 
    href: links.match(url)[1],
    text: links.match(corchetes)[1],
    file: filePath,
  }
 })
  return datosLinks
}
readMdFile('./files/prueba.md').then((result) => {
  fileLinks(result, './files/prueba.md')
});

//validar link con fetch --> hacer peticiones http
const validateLinks = (arrayDatosLinks) => {
  let mapearDatos = arrayDatosLinks.map(objetos => { 
    return fetch(objetos.href)
    .then((response) => {
      return {
        href: objetos.href,
        text: objetos.text,
        file: objetos.file,
        status: response.status,
        ok: response.statusText,
      }
    })
    .catch((err) => {
      return {
        href: objetos.href,
        text: objetos.text,
        file: objetos.file,
        status: err.response.status,
        ok: err.response.statusText,
      }
  });
  })
  return Promise.all(mapearDatos) // se aplica promise.all para que la promesa salga de estado pendiente
}
readMdFile('./files/prueba.md').then((result) => {
  validateLinks(fileLinks(result, './files/prueba.md')).then(console.log)
})
//revisar porque no revisa los link dañados. 



module.exports = {
  pathExist,
  pathAbsolut,
  transformAbsolute,
  fileExt,
  readMdFile,
  fileLinks,
  validateLinks
};
