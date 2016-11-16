var express = require('express');
var router = express.Router();
var ArenaUser=require('../models/arena');
var User=require('../models/user');
var jwt=require('jsonwebtoken');
router.use('/',function (req,res,next) {
    jwt.verify(req.query.token,'secret',function (err,decoded) {
        if(err){
            return res.status(401).json({
                title:'Not Authenticated',
                error:err
            });
        }
        next();

    })

});

router.post('/', function (req, res, next) {
    var decoded=jwt.decode(req.query.token);
    User.findById(decoded.user._id,function (err,user) {
        if (err){
            return res.status(500).json({
                title:'An error occured',
                error:err
            });
        }
        var arenaUser = new ArenaUser({
            user_id:user,
            invite_id:req.body.inviteId,
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


            
            res.status(201).json({
                message:'Saved Message',
                obj:result
            });

    });
    });

});





router.get('/questionArena',function (req,res,next) {
    ArenaUser.find()






});



module.exports=router;
