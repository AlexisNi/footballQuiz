var express = require('express');
var router = express.Router();
var Questions=require('../models/questions');
var ArenaUser=require('../models/arena');



router.get('/arenaQuestions',function (req,res,next) {
    console.log('get on arena questiosn caught');
   var arenaId=req.query.id;

    ArenaUser.findOne()
        .where({_id: arenaId})
        .populate('questions')
        .exec(function (err,arena) {
            if(err){
                return res.status(500).json({
                    title:'An error occured',
                    error:err
                });
            }
            res.status(200).json({
                message:'Success',
                obj:arena.questions
            });

        });
});

router.post('/questionPlayed',function (req,res,next) {
    console.log(req.body);
    var arenaId=req.body.arenaId;
    var questionId=req.body.questionId;
    ArenaUser.findOne()
        .where({ $and:[ {_id:arenaId}, {questions:questionId}]})
        .populate({path:'questions',match:{_id:questionId}})
        .exec(function (err,arena) {
            if(err){
                return res.status(500).json({
                    title:'An error occured',
                    error:err
                });
            }

            console.log(arena);


            /*for(var key in arena.questions){
                if (arena.questions[key]._id==questionId){
                    console.log(arena.questions[key].answer);
                }


            }*/



        });



});



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

