const express = require('express')
const router = express.Router()
const { validarBoleto } = require('../controllers/validarBoleto');

router.get('/', async (req, res) => {
    let linha = req.query.linha;

    if(!linha) {
        res.status(400).json({ valido: false })
    }

    try {
        let validacao = await validarBoleto(linha.replace(/[^0-9]/g,'')); 
        console.log('validacao => ', validacao)
        res.status(200).json(validacao)
    } catch (err) {
        res.status(400).json(err)
    }
});

module.exports = router;