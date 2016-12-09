/**
 * Created by alex on 09/12/2016.
 */
var socketio=require('socket.io');
var connectedUserList=[];
var io={};
var userInfo=[];
module.exports={
    startSocketServer:function (app) {
        io = socketio.listen(app);
        var nsp=io.of('/game');
        nsp.on('connection',function (socket) {
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
    }
    };
