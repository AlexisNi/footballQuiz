/**
 * Created by alex on 09/12/2016.
 */
var socketio=require('socket.io');
var ArenaUser=require('../models/arena');
var User=require('../models/user');
var io={};
var userInfo=[];
var connectedUserList=[];

module.exports={
    startSocketServer:function (app) {
        io = socketio.listen(app);
        var nsp=io.of('/game');
        nsp.on('connection',function (socket) {
        console.log('User connected!');
            connectedUserList[socket.handshake.query.userId]=socket;
/*
            connectedUserList['583095a7612b9025a49881d8'].emit('updateArenas',{status:true});
*/


            socket.on('disconnect',function () {
            console.log('User Disconcted');
            delete connectedUserList[socket.id];

            var userData=userInfo[socket.id];
            if(typeof userData!=='undefined'){
                socket.leave(userData.arenaId);
                delete userInfo[socket.id];
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
                console.log('player left arena with id  '+userData.userId);}

        });

        socket.on('enterArena',function (req) {
            userInfo[socket.id]=req;
            socket.join(req.arenaId);
            console.log('player entered arena with detals :'+ userInfo[socket.id].arenaId+' '+userInfo[socket.id].userId);
        });


            socket.on('setfinish',function (data) {
               nsp.emit('getFinish',{status:data}) ;
            });












            socket.on('getArenas',function (req) {
                console.log('here get arenas!')

                if(req.userId!=null) {
                    var arenasArray = [];
                    User.findOne({_id: req.userId/*socket.handshake.query.userId*/})//HERE IS SEARCHING WITH THE USER TOKEN PARAMETER IN THE ARENA DATABASE AT THE USER ROW AND SHOW THE LAST NAME OF INVITE
                        .populate('arenas', '_id')
                        .exec(function (err, arenasArr) {
                            if (err) {
                                throw err;
                            }
                            for (var i = 0; i < arenasArr.arenas.length; i++) {
                                arenasArray.push(arenasArr.arenas[i]._id);
                            }
                            console.log(req);
                            ArenaUser.find({$and: [{user: req.userId}, {_id: {$in: arenasArray}}]})//HERE IS SEARCHING WITH THE USER TOKEN PARAMETER IN THE ARENA DATABASE AT THE INVITE ROW AND SHOWS THE LAST NAME OF THE USER
                                .populate('invite', 'lastName')
                                .exec(function (err, arenas) {
                                    if (err) {
                                        throw err;
                                    }
                                    ArenaUser.find({$and: [{invite: req.userId}, {_id: {$in: arenasArray}}]})//HERE IS SEARCHING WITH THE USER TOKEN PARAMETER IN THE ARENA DATABASE AT THE INVITE ROW AND SHOWS THE LAST NAME OF THE USER
                                        .populate('user', 'lastName')
                                        .exec(function (err, arenasUser) {
                                            if (err) {

                                                throw err;
                                            }
                                            if(connectedUserList[req.userId]!=null) {
                                                connectedUserList[req.userId].emit('loadArenas', {
                                                    obj: arenas,
                                                    objUser: arenasUser
                                                })
                                            }
                                        });
                                });
                        });
                }
            });







    });
    }
    };
