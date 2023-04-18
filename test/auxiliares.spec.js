const functionsAux = require('../auxiliares.js')
global.fetch = jest.fn()


describe('test si función existe', () => {
it('si ruta existe da "true" ', () => {
    expect(functionsAux.pathExist('./files/prueba.md')).toEqual(true)
});
it('si ruta no existe da "false" ', () => {
    expect(functionsAux.pathExist('./files/pruebanoexistente.md')).toEqual(false)
});
});

describe('es una ruta absoluta', () => {
it('retorna la ruta si esta es absoluta', () => {
    expect(functionsAux.isAbsOrRel('C:\\Users\\Vinka Peña\\Desktop\\ProyectoVinka\\MD Links\\DEV003-md-links\\files\\prueba.md')).toBe('C:\\Users\\Vinka Peña\\Desktop\\ProyectoVinka\\MD Links\\DEV003-md-links\\files\\prueba.md')
});
it('retorna una ruta absoluta, aunque te pase una relativa', () => {
    expect(functionsAux.isAbsOrRel('files\\prueba.md')).toEqual('C:\\Users\\Vinka Peña\\Desktop\\ProyectoVinka\\MD Links\\DEV003-md-links\\files\\prueba.md')
});
});


// hacer test de fetch --> validar link
// mock se usa para llamar solo lo que no tengo control 
// creo algo falso para tener control sobre esto 
 
const arrayInicial = [{
    href: 'https://es.wikipedia.og/wiki/Markdown',
    text: 'Markdown',
    file: 'file/prueba.md',
  },
  {
    href: 'https://es.wikipedia.org/wiki/Markdown',
    text: 'Link-roto',
    file: 'file/prueba.md',
  }
]

const arrayFinal = [{
    href: 'https://es.wikipedia.og/wiki/Markdown',
    text: 'Markdown',
    file: 'file/prueba.md',
    status: 200,
    ok: 'ok'
  },
  {
    href: 'https://es.wikipedia.org/wiki/Markdown',
    text: 'Link-roto',
    file: 'file/prueba.md',
    status: 400,
    ok: 'fail'
  }]


describe('test de validar links', () => {
fetch.mockImplementationOnce((objeto) => Promise.resolve({status: 200, statusText: 'ok'}))
.mockImplementationOnce((objeto) => Promise.reject({status: 400, statusText: 'fail'}))
    it('retornar el array recorrido', () => {
        functionsAux.validateLinks(arrayInicial).then((result) => {
            expect(result).toEqual(arrayFinal)
        })
    })
    it('retornar el array recorrido aunque este roto', () => {
        functionsAux.validateLinks(arrayInicial).then((result) => {
            expect(result).toEqual(arrayFinal)
        })
    })
})