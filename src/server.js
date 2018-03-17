'use strict';

/** Import Modules */
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const session = require('express-session');
const mongoose = require('mongoose');
const morgan = require('morgan');
const passport = require('passport');
const app = express();

// modulo propio de nodejs para manejar las rutas
const path = require('path');

// require url db
const { url } = require('./config/database');

//connect mongoose
const db = mongoose.connection;
mongoose.connect(url);
db.on('error', (err)=> console.log('error en la conexion con mongoose ',err));
db.once('open', ()=> console.info('conectado a mongoose'));


// requerimos el modulo de passport para inicializarlo
require('./config/passport')(passport);


/** Settings
 *  configuramos el puerto donde va correr la app
 *  port si no esta configurado x el S.O le decimos que corra en el port 300
 */
app.set('port', process.env.PORT || 3000 );
app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'ejs')

/** Middlewares */
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: false})); // extended es para decirle que no quiero procesarle imagenes o mas cosas
app.use(session({
    secret: 'chespisan',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Routes
require('./app/routes/routes')(app, passport);//-> pasamos app por los midd use y passport para que cada ruta tenga sus sesion con passpor

// Static files
app.use(express.static(path.join(__dirname, 'public')));

app.listen(app.get('port'), () =>{
    console.log('server on port', app.get('port'));
});