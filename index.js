const {readMdFile, isAbsOrRel, pathExist, fileExt, fileLinks, validateLinks} = require('./auxiliares.js')

const mdLinks = (path, options) => {
  return new Promise((resolve, reject) => {
    // console.log(!pathExist(path))
    if(!pathExist(path)){
      reject('Ruta no existe, por favor ingresa una ruta válida')
      return
    }
    let pathAbs = isAbsOrRel(path)
    // console.log(!fileExt(pathAbs))
    if(!fileExt(pathAbs)){
      // console.log('no es un archivo MD')
      reject('No es un archivo MD')
      return
    }
    // console.log(readMdFile(pathAbs))
    readMdFile(pathAbs).then((result) => {
      console.log('soy readMdFile')
      const links = fileLinks(result,'./files/prueba.md')
        if(!options.validate){
          // console.log('soy de false')
          resolve(links)
        }else{
          // console.log('hola soy else')
          resolve(validateLinks(links))
          }
     }).catch((error) =>{
       reject(error, 'esto es un error tierno')
     })
    // let leerLinks = readMdFile(pathAbs).then().catch()
    // let revisarLink = fileLinks(leerLinks)
    // let validarLinks = validateLinks(revisarLink)

    // averiguar en que caso no se validan links 


  // return 'tienes un error'
//si se resuelve, devuelve un array con objetos de links

  });
};

mdLinks('./files/prueba.md', {validate:true}).then(console.log).catch(console.log)
