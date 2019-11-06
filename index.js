const app = require('./configs/server.js');

const validarBoleto = require('./src/routes/validarBoleto');

app.use('/validar-boleto', validarBoleto);

app.listen(app.get('port'), function() {
    console.log('running on port', app.get('port'))
});