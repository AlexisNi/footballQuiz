var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var User=require('../models/user');
var jwt=require('jsonwebtoken');


router.post('/', function (req, res, next) {
    console.log('Post received! On user');
    var user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: bcrypt.hashSync(req.body.password, 10),
        email: req.body.email
    });
    user.save(function(err, result) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        res.status(201).json({
            message: 'User created',
            obj: result
        });
    });
});



router.post('/signin',function (req,res,next) {
    User.findOne({email:req.body.email},function (err,user) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if(!user){
            return res.status(401).json({
                title:'Login failed',
                error:{Message:'Invalid Login Credentials'}
            });
        }

        if (!bcrypt.compareSync(req.body.password,user.password)){
            return res.status(401).json({
                title:'Login failed',
                error:{Message:'Invalid Login Credentials'}
            });
        }
        var token=jwt.sign({user:user},'secret',{expiresIn:7200});
        res.status(200).json({
            message:'Succefully logged in',
            userId:user._id,
            token:token
        });


    });
});

router.post('/find',function (req,res,next) {
    console.log(req.body);

    User.findOne({lastName:req.body.lastName},function (err,user) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if(!user){
            return res.status(400).json({
                title:'User Not Found',
                error:{Message:'User Not Found'}
            });
        }
        res.status(200).json({
            message:'User Found',
            lastName:user.lastName
        });


    });
});
module.exports=router;

