var express = require('express');
var router = express.Router();
var Questions=require('../models/questions');



router.get('/',function (req,res,next) {
    Questions.find()
        .exec(function (err,questions) {
            if (err){
                return res.status(500).json({
                    title:'An error occured',
                    error:err
                });
            }
            res.status(200).json({
                message:'success',
                obj:questions

            });
        });


});



module.exports=router;

