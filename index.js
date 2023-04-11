const {readMdFile, pathAbsolut, pathExist, transformAbsolute, fileExt, fileLinks, validateLinks} = require('./auxiliares.js')


const mdLinks = (path, options) => {
  return new Promise((resolve, reject) => {
    if(path !== pathAbsolut){
      transformAbsolute(path)
    }else
//si se rechaza devolvera un error 
reject(error)
  // return 'tienes un error'
//si se resuelve, devuelve un array con objetos de links
resolve()
  });
};
