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

        }else {
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

        }



    });




});

router.get('/correct',function (req,res,next) {
    console.log('Correct question works');
    console.log(req.query);
    ArenaQuestions.findOne().where({ $and:[ {arenaId:req.query.arenaId}, {userId:req.query.userId}]})
        .exec(function (err,questionsCorrect) {
            if (err){
                return res.status(500).json({
                    title:'An error occured',
                    error:err
                });
            }



            console.log(questionsCorrect);
            res.sendStatus(200);


            /* for(var i in questionsCorrect){
                 console.log(questionsCorrect[i]
                     .questionAnswer[i].questionId);

             }*/



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

router.post('/getResults',function (req,res,next) {
    console.log('Get Results works')
    console.log(req.body.arenaId);
    console.log(req.body.userId);
    var arenaId=req.body.arenaId;
    var userId=req.body.userId;
    ArenaQuestions.findOne().where({ $and:[ {arenaId:arenaId}, {userId:userId}]})
        .populate('userId','lastName')
        .exec(function (err,answerCount) {
            if (err){
                return res.status(500).json({
                    title:'An error occured',
                    error:err
                });
            }

          ArenaQuestions.findOne().where({ $and:[ {arenaId:arenaId}, {userId:{$ne:userId}}]})
              .populate('userId','lastName')
              .exec(function (err,answerCountB) {
                  if (err){
                      return res.status(500).json({
                          title:'An error occured',
                          error:err
                      });
                  }


                  if(answerCount.questionAnswer.length>answerCountB.questionAnswer.length){
                      res.status(200).json({
                          message:'success',
                          winner:answerCount.userId,
                          loser:answerCountB.userId
                      });

                  }else if(answerCount.questionAnswer.length<answerCountB.questionAnswer.length) {
                      res.status(200).json({
                          message:'success',
                          loser:answerCount.userId,
                          winner:answerCountB.userId
                      });

                  }
                  else{
                      res.sendStatus(200);
                  }

              });
        });


});


module.exports=router;

