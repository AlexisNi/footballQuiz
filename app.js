var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var logger=require('morgan');
var appRoutes = require('./routes/app');
var userRoutes= require('./routes/user');
var questionRoutes=require('./routes/questions');
var questionAns=require('./routes/ArenaQuestion');
var arenaRoutes=require('./routes/arena');
var passport=require('passport');
var app = express();
var http= require('http').Server(app);
var io=require('./sockets/sockets');


mongoose.connect('Alexis:315551a@ds139288.mlab.com:39288/quiz_app');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
    next();
});

app.use('/arena',arenaRoutes);
app.use('/question',questionRoutes);
app.use('/questionANS',questionAns);
app.use('/user', userRoutes);
app.use('/', appRoutes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    return res.render('index');
});


http.listen(4000,function () {
    console.log('Listen to 4000');
});
io.startSocketServer(http);

module.exports = app;
