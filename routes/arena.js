var express = require('express');
var router = express.Router();
var ArenaUser=require('../models/arena');
var User=require('../models/user');
var jwt=require('jsonwebtoken');
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
        var arenaUser = new ArenaUser({
            user:user,
            invite:req.body.inviteId,
            status_accept:false
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
            User.findById(arenaUser.invite,function (err,user) {
                if (err){
                    return res.status(500).json({
                        title:'An error occured',
                        error:err
                    });
                }
                user.arenas.push(result);
                user.save();
            });

            User.findById(arenaUser.invite_id,function (err,user) {
                if (err){
                    return res.status(500).json({
                        title:'An error occured',
                        error:err
                    });
                }
            });
            res.status(201).json({
                message:'Saved Message',
                obj:result
            });

    });



    });

});





router.get('/arenas',function (req,res,next) {
    console.log('post done');
    var decoded=jwt.decode(req.query.token);
    console.log(decoded);
    ArenaUser.find({user:'582a33c92e09f20a4873c085'})
        .populate('user','lastName')
        .exec(function (err,arenas) {
            if (err){
                return res.status(500).json({
                    title:'An error occured',
                    error:err
                });
            }
            res.status(200).json({
                message:'success',
                obj:arenas
            });
        });
});



module.exports=router;
