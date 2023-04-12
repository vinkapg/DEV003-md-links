const {readMdFile, isAbsOrRel, pathExist, fileExt, fileLinks, validateLinks} = require('./auxiliares.js')


const mdLinks = (path, options) => {
  return new Promise((resolve, reject) => {
    if(!pathExist(path)){
      reject('Ruta no existe, por favor ingresa una ruta válida')
    }
    let pathAbs = isAbsOrRel(path)
    if(!fileExt(pathAbs)){
      reject('No es archivo MD')
    }
    let leerLinks = readMdFile(pathAbs)
    let revisarLink = fileLinks(leerLinks)
    let validarLinks = validateLinks(revisarLink)

    // averiguar en que caso no se validan links 


  // return 'tienes un error'
//si se resuelve, devuelve un array con objetos de links
resolve()
  });
};

