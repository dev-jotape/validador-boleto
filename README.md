# validador-boleto

Passos para utilização:

- `git clone https://github.com/joaopedro1206/validador-boleto.git`
- `cd validador-boleto`
- `npm install`
- `npm start`

Utilizar o endpoint `/validar-boleto?linha={linha_digitavel}` para enviar as linhas digitáveis para validação, tanto para títulos bancários, quanto para convênio.

Ex: `http://localhost:5000/validar-boleto?linha=00190.50095.40144.816069.06809.350314.3.37370000000100`
