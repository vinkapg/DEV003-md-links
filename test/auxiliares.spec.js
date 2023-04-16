const functionsAux = require('../auxiliares.js')

describe('test si función existe', () => {
it('si ruta existe da "true" ', () => {
    expect(functionsAux.pathExist('./files/prueba.md')).toEqual(true)
});
it('si ruta no existe da "false" ', () => {
    expect(functionsAux.pathExist('./files/pruebanoexistente.md')).toEqual(false)
});
});

// describe('es una ruta absoluta', () => {
// it('retorna la ruta si esta es absoluta', () => {
//     expect(functionsAux.isAbsOrRel('C:\Users\Vinka Peña\Desktop\ProyectoVinka\MD Links\DEV003-md-links\files\prueba.md')).toBe('C:\Users\Vinka Peña\Desktop\ProyectoVinka\MD Links\DEV003-md-links\files\prueba.md')
// });
// it('retorna una ruta absoluta, aunque te pase una relativa', () => {
//     expect(functionsAux.isAbsOrRel('files\prueba.md')).toBe('C:\Users\Vinka Peña\Desktop\ProyectoVinka\MD Links\DEV003-md-links\files\prueba.md')
// });
// });

// describe('test si función existe', () => {
//     it('si ruta existe da "true" ', () => {
//         expect(functionsAux.pathExist('./files/prueba.md')).toEqual(true)
//     });
//     it('si ruta no existe da "false" ', () => {
//         expect(functionsAux.pathExist('./files/pruebanoexistente.md')).toEqual(false)
//     });
// });