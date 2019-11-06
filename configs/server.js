const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.set('port', (process.env.PORT  || 5000));
app.set('view engine', 'ejs');
app.set('views', './app/views/');

//serve static files in the public directory
app.use(express.static('./public'));


// Process application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: true
}));

// Process application/json
app.use(bodyParser.json());

app.use(cors());


module.exports = app;