var express = require('express');
var router = express.Router();
var Questions=require('../models/questions');


/*
router.get('/',function (req,res,next) {
    console.log('Get done');
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
*/

router.get('/',function (req,res,next) {
    Questions.syncRandom(function (err,result) {
        console.log(result.updated);
    });
    Questions.findRandom().limit(2).exec(function (err, questions) {
        console.log(questions);
        res.status(201).json({
            message:'Questions Found',
            obj:questions
        });
    });

});
module.exports=router;

