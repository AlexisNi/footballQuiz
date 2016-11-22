var express = require('express');
var router = express.Router();
var ArenaQuestions=require('../models/ArenaQuestion');



router.post('/', function (req, res, next) {
    console.log('Post received! On ArenaQuestion');
    console.log(req.body);


        ArenaQuestions.findOne({ $and:[ {arenaId:req.body.arenaId}, {userId:req.body.userId}]})
    .exec(function (err,arenaQuestion) {
        if(arenaQuestion){

            ArenaQuestions.update({_id:arenaQuestion._id},{$push:{questionAnswer:req.body.question}},function (err,result) {
                if (err) {
                    return res.status(500).json({
                        title: 'An error occurred',
                        error: err
                    });
                }
                res.status(201).json({
                    message: 'QuestionAnswer created',
                    obj: result
                });

            });

        }



    });



    var arenaQuestion = new ArenaQuestions({
        arenaId:req.body.arenaId,
        userId:req.body.userId,
        questionAnswer:req.body.question

    });

    arenaQuestion.save(function(err, result) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        res.status(201).json({
            message: 'QuestionSaved created',
            obj: result
        });
    });
});


router.get('/',function (req,res,next) {
    console.log('Get done');
    ArenaQuestions.find()
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

