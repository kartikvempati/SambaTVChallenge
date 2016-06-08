var express = require('express');
var cors = require('cors')
var app = express();
var port = process.env.PORT || 8000;

app.use(express.static(__dirname + '/../client'));
app.use(cors());


var server = app.listen(port);


// I wanted to put the database in the backend, but decided to use localstorage for simplicity

// app.get('/storeuser', function (req, res) {
// })

// app.get('/getuser', function (req, res) {
// })

module.exports = app;
