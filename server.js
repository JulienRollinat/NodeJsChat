const express = require('express')
const app = express()
const server = app.listen(9000, () => { console.log('Le serveur est lancé sur le port 9000') })
const chalk = require('chalk');

console.log(chalk.blue('Project is running !'));

app.use(express.static('public'));
app.use(express.static('views'));

app.set('views', './views');
app.set('view engine', 'pug');

app.get('/home', function (req, res) {
    res.render('index');
  });

app.get('/dev', function (req, res) {
    res.render('dev');
  });

app.get('/graph', function (req, res) {
  res.render('graph');
 });

var io = require('socket.io')(server);
require('./websocket.js')(io)
