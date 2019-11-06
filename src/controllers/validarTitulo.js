const moment = require('moment');
let multiplicador, multiplicador2;

const validarTitulo = (linha) => {
    let campo1 = linha.substring(0, 9),
        codIF = linha.substring(0, 3),
        codMoeda = linha.substring(3, 4),
        pos2024 = linha.substring(4,9),
        dvX = linha.substring(9,10),

        campo2 = linha.substring(10, 20),
        pos2534 = linha.substring(10, 20),
        dvY = linha.substring(20, 21),

        campo3 = linha.substring(21, 31),
        pos3544 = linha.substring(21,31),
        dvZ = linha.substring(31, 32),
        
        dvK = linha.substring(32, 33),
        fV = linha.substring(33, 37),
        valor = linha.substring(37, 47),
        barcode = codIF + codMoeda + dvK + fV + valor + pos2024 + pos2534 + pos3544;

    multiplicador = 2; multiplicador2 = 2;

    // calculo campo 1
    let digito1 = calculoDV(campo1);
    if(digito1 !== Number(dvX)) return { valido: false }

    // calculo campo 2
    let digito2 = calculoDV(campo2);
    if(digito2 !== Number(dvY)) return { valido: false }

    // calculo campo 3
    let digito3 = calculoDV(campo3);
    if(digito3 !== Number(dvZ)) return { valido: false }

    //validação barcode
    let barcodeValido = validarBarcode(barcode);
    if(barcodeValido !== Number(dvK)) return { valido: false }

    // get data
    let dataBase = moment(new Date('1997-10-07')).format(),
        fatorVencimento = Number(fV);

    let vencimento = moment(dataBase).add(fatorVencimento, 'days');

    // get valor
    let valorBoleto = Number(`${valor.substring(0, 8)}.${valor.substring(8)}`).toFixed(2);
    
    return { 
        valido: true,
        valor: valorBoleto,
        vencimento,
        barcode
    }
};

const calculoDV = (campo) => {
    let arr = campo.split('');
    let somatorio = 0;
    arr.map(el => {
        let mult = Number(el) * multiplicador;
        multiplicador === 2 ? multiplicador = 1 : multiplicador = 2;
        if(mult === 19) {
            mult = 1
        } else if (mult > 9) {
            mult = Number(mult.toString().split('')[0]) + Number(mult.toString().split('')[1])
        }

        somatorio += mult;
    });

    let proxDezena = somatorio % 10 ? somatorio + 10 - somatorio % 10 : somatorio + 10;
    let digito = proxDezena - somatorio;
    if(digito > 9) {
        digito = 0
    }
    return digito;
};

const validarBarcode = (barcode) => {
    let arr = barcode.split('');
    arr.splice(4, 1)
    let somatorio = 0;

    for(let i = arr.length-1; i >= 0; i--) {
        let mult = Number(arr[i]) * multiplicador2;
        multiplicador2 === 9 ? multiplicador2 = 2 : multiplicador2++;
        
        somatorio += mult;
    }

    let digito = 11 - (somatorio % 11)
    if(digito === 0 || digito === 10 || digito === 11) digito = 1;
    return digito;
};

module.exports = { validarTitulo }