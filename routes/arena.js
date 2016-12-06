var express = require('express');
var router = express.Router();
var ArenaUser=require('../models/arena');
var User=require('../models/user');
var jwt=require('jsonwebtoken');
var Questions=require('../models/questions');

/*router.use('/',function (req,res,next) {
    jwt.verify(req.query.token,'secret',function (err,decoded) {
        if(err){
            return res.status(401).json({
                title:'Not Authenticated',
                error:err
            });
        }
        next();

    })

});*/

router.post('/', function (req, res, next) {
    var decoded=jwt.decode(req.query.token);
    console.log(decoded);
    User.findById(decoded.user._id,function (err,user) {
        if (err){
            return res.status(500).json({
                title:'An error occured',
                error:err
            });
        }


        User.findById(req.body.inviteId,function (err,userInvite) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occured',
                    error: err
                });
            }
            Questions.syncRandom(function (err, result) {
                console.log(result.updated);
            });
            Questions.findRandom().limit(10).exec(function (err, questions) {
                if (err) {
                    return res.status(500).json({
                        title: 'An error occured',
                        error: err
                    });
                }

                ArenaUser.schema.eachPath(function (path) {
                    console.log(path);
                });

        var arenaUser = new ArenaUser({
            user:user,
            invite:userInvite,
            status_accept:false,
            questions:questions
        });



        arenaUser.save(function(err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            user.arenas.push(result);
            user.save();
            userInvite.arenas.push(result);
            userInvite.save();

            res.status(201).json({
                message:'Saved Message',
                obj:result
            });

    });


        });
    });

});
});



/*

router.get('/arenas',function (req,res,next) {
    var decoded=jwt.decode(req.query.token);
        ArenaUser.find({user:decoded.user._id})//HERE IS SEARCHING WITH THE USER TOKEN PARAMETER IN THE ARENA DATABASE AT THE USER ROW AND SHOW THE LAST NAME OF INVITE
            .populate('invite', 'lastName')
            .exec(function (err, arenas) {
                if (err) {
                    return res.status(500).json({
                        title: 'An error occured',
                        error: err
                    });
                }
               ArenaUser.find({invite: decoded.user._id})//HERE IS SEARCHING WITH THE USER TOKEN PARAMETER IN THE ARENA DATABASE AT THE INVITE ROW AND SHOWS THE LAST NAME OF THE USER
                    .populate('user', 'lastName')
                    .exec(function (err, arenasUser) {
                        if (err) {
                            return res.status(500).json({
                                title: 'An error occured',
                                error: err
                            });
                        }


                        res.status(200).json({
                            message: 'success',
                            obj: arenas,
                            objUser: arenasUser
                        });
                    });
            });
        });
*/

router.get('/arenas',function (req,res,next) {
    var decoded=jwt.decode(req.query.token);
    var arenasArray=[];

        User.findOne({_id:decoded.user._id})//HERE IS SEARCHING WITH THE USER TOKEN PARAMETER IN THE ARENA DATABASE AT THE USER ROW AND SHOW THE LAST NAME OF INVITE
            .populate('arenas','_id')
            .exec(function (err, arenasArr) {
                if (err) {
                    return res.status(500).json({
                        title: 'An error occured',
                        error: err
                    });
                }

                        for(var i=0; i<arenasArr.arenas.length;i++){
                            arenasArray.push(arenasArr.arenas[i]._id);
                        }
                        console.log(arenasArray);

                    ArenaUser.find   ({ $and:[ {user: decoded.user._id},{_id:{$in:arenasArray}}]})//HERE IS SEARCHING WITH THE USER TOKEN PARAMETER IN THE ARENA DATABASE AT THE INVITE ROW AND SHOWS THE LAST NAME OF THE USER
                        .populate('invite', 'lastName')
                        .exec(function (err, arenas) {
                            if (err) {
                                return res.status(500).json({
                                    title: 'An error occured',
                                    error: err
                                });



                            }

                            ArenaUser.find   ({ $and:[ {invite: decoded.user._id},{_id:{$in:arenasArray}}]})//HERE IS SEARCHING WITH THE USER TOKEN PARAMETER IN THE ARENA DATABASE AT THE INVITE ROW AND SHOWS THE LAST NAME OF THE USER
                                .populate('user', 'lastName')
                                .exec(function (err, arenasUser) {
                                    if (err) {
                                        return res.status(500).json({
                                            title: 'An error occured',
                                            error: err
                                        });



                                    }




                        res.status(200).json({
                            message: 'success',
                            obj: arenas,
                            objUser: arenasUser
                        });

            });
            });
            });
            });



router.post('/playedStatus',function (req,res,next) {
    console.log('Post Received');
    console.log(req.body);
    var userId=req.body.userId;
    var arenaId=req.body.arenaId;
    ArenaUser.findOne({_id:arenaId})
        .populate('user')
        .populate('invite')
        .exec(function (err,arenas) {
            if (arenas.user._id==userId){
                console.log(arenas.user_played)
                ArenaUser.update({_id:arenaId},{$set:{user_played:true}},function (err,result) {
                    if (err) {
                        return res.status(500).json({
                            title: 'An error occurred',
                            error: err
                        });
                    }
                });
            }else {
                ArenaUser.update({_id:arenaId},{$set:{invite_played:true}},function (err,result) {
                    if (err) {
                        return res.status(500).json({
                            title: 'An error occurred',
                            error: err
                        });
                    }
                });
            }
        });


});




module.exports=router;
