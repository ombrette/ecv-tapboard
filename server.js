// Importer les composants
let express = require('express');
let path = require('path');
let bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var config = require('./config/database');

mongoose.connect(config.database);

// Importer les modules de gestion des routes
let front = require('./routes/front');
let api = require('./routes/api');

// Définir le port
let port = 8080;

// Initier le serveur
let app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Définir le dossier static de la partie frontend
app.set('views', path.join(__dirname, 'www'));
app.use(express.static(path.join(__dirname, 'www')));

app.use(passport.initialize());

// Configurer body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Définir les routes
app.use('/', front);
app.use('/api', api);

// Lancer le server
app.listen( port, () => console.log('Le serveur est lancé sur le port ' + port) );