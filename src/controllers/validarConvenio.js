let multiplicador;

const validarConvenio = (linha) => {
    let campo1 = linha.substring(0, 11),
        dvG = linha.substring(3, 4),
        dv1 = linha.substring(11, 12),
        campo2 = linha.substring(12, 23),
        dv2 = linha.substring(23, 24),
        campo3 = linha.substring(24, 35),
        dv3 = linha.substring(35, 36),
        campo4 = linha.substring(36, 47),
        dv4 = linha.substring(47),
        
        barcode = campo1 + campo2 + campo3 + campo4,
        valor = barcode.substring(4, 15);

    // validar dv do codigo de barras
    let barCodeValido = validarDV(barcode, true);
    if(barCodeValido !== Number(dvG)) return { valido: false }

    // validar dv do campo1
    let dvCampo1 = validarDV(campo1, false);
    if(dvCampo1 !== Number(dv1)) return { valido: false };

    // validar dv do campo2
    let dvCampo2 = validarDV(campo2, false)
    if(dvCampo2 !== Number(dv2)) return { valido: false };

    // validar dv do campo3
    let dvCampo3 = validarDV(campo3, false)
    if(dvCampo3 !== Number(dv3)) return { valido: false };
    
    // validar dv do campo4
    let dvCampo4 = validarDV(campo4, false)
    if(dvCampo4 !== Number(dv4)) return { valido: false };
    
    // valor boleto
    let valorBoleto = Number(`${valor.substring(0, 9)}.${valor.substring(9)}`).toFixed(2);
    return { 
        valido: true,
        valor: valorBoleto,
        barcode
    }
};

const validarDV = (campo, barcode) => {
    multiplicador = 2;

    let arr = campo.split('');
    if(barcode) arr.splice(3, 1);
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

module.exports = { validarConvenio }