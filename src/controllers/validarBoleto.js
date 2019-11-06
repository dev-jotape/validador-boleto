const { validarTitulo }     = require('./validarTitulo'),
      { validarConvenio }   = require('./validarConvenio');

const validarBoleto = (linha) => {
    return new Promise ((resolve, reject) => {
        console.log(linha.length);
        linha.length === 47 ? resolve(validarTitulo(linha)) : linha.length === 48 ? resolve(validarConvenio(linha)) : reject({ valido: false })
    })
}; 

module.exports = { validarBoleto }