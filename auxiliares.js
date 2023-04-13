const fs = require('fs');
const path = require('node:path');

// ¿Existe una ruta? -- fs.access(path[, mode], callback)
// const pathExist = (path) => {
//   return new Promise ((resolve, reject) => {
//     fs.access(path, fs.constants.F_OK, (err) => {
//       if (err) {
//         // console.error('File does not exist');
//         reject(err)
//       }        // console.log('File does exist');
//         resolve(path)
//       });
//   })
// }
// pathExist('./file/prueba.md').then((result) => {
//   console.log(result)
// }).catch((error) => {
//   console.log(error)
// })
// console.log(pathExist('./files/prueba.md').then((result) => {
//   console.log(result)
// }).catch((error) => {
//   console.log(error)
// }))

//¿Existe ruta? metodo sincrono
const pathExist = (path) => {
  return fs.existsSync(path)
}
// console.log(pathExistTwo('./files/prueba.md'))

// ¿Es una ruta absoluta?
const pathAbsolut = (route) =>{
 return path.isAbsolute(route)
}
// console.log(pathAbsolut('./README.md'));

//convertir ruta relativa en absoluta
const transformAbsolute = (route) => {
  return path.resolve(route) //path.resolve([...path])
}
// console.log(transformAbsolute('./README.md'));

//ruta abs y transf relativa en abs en una fx
const isAbsOrRel = (route) =>{
  if (path.isAbsolute(route)){
   return route
  }else{
   return path.resolve(route)
  }
 }

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
// fileExt('./README.md')

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
// readMdFile('./files/prueba.md').then((result) => {
//  console.log(result)
// }).catch((error) =>{
//   console.log(error)
// })

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
// readMdFile('./files/prueba.md').then((result) => {
//   fileLinks(result, './files/prueba.md')
// });

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
      // console.log('hola estoy aquíii',err)
      return {
        href: objetos.href,
        text: objetos.text,
        file: objetos.file,
        status: err.message,
        ok: 'fail',
      }
  });
  })
  return Promise.all(mapearDatos) // se aplica promise.all para que la promesa salga de estado pendiente
}
// readMdFile('./files/prueba.md').then((result) => {
//   validateLinks(fileLinks(result, './files/prueba.md')).then(console.log)
// })
//revisar porque no revisa los link dañados. 



module.exports = {
  pathExist,
  isAbsOrRel,
  fileExt,
  readMdFile,
  fileLinks,
  validateLinks
};
