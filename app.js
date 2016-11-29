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
var connectedUserList=[];
var http= require('http').Server(app);
var io=require('socket.io')(http);




mongoose.connect('localhost:27017/quiz-app');

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



var userInfo=[];
io.on('connection',function (socket) {
    console.log('User connected!');
    connectedUserList.push(socket.handshake.query.userName);

    socket.on('disconnect',function () {
        console.log('User Disconcted');
        var userData=userInfo[socket.id];
        if(typeof userData!=='undefined'){
            socket.leave(userData.arenaId);
            delete userInfo[socket.id];
            console.log('player left arena with id  '+userData);

        }
    });

    socket.on('get-userId',function (userId) {
        console.log('Welcome user : '+userId);

    });
    
    socket.on('leaveArena',function () {
        console.log('leaver Arena Caught');
        var userData=userInfo[socket.id];
        if(typeof userData!=='undefined'){
            socket.leave(userData.arenaId);
            delete userInfo[socket.id];
            console.log('player left arena with id  '+userData.userId);
        }
        
    });

    socket.on('enterArena',function (req) {
        userInfo[socket.id]=req;
        socket.join(req.arenaId);
        console.log('player entered arena with detals :'+ userInfo[socket.id].arenaId+' '+userInfo[socket.id].userId);
    });


});

http.listen(4000,function () {
    console.log('Listen to 4000');
});

module.exports = app;
