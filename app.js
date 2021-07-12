const express = require("express");
const cart = require('./cart-items');
const cors = require('cors');

const app = express();

const port = 3000;
app.use(express.json());
app.use('/cart-items',cart);
app.use(express.static('/' + "/public"));
app.use(cors());

app.listen(port, () => console.log(`Listening on port: ${port}.`));

app.get('/', function (req, res) {
    res.send('testing')
  })