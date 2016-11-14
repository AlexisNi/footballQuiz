var express = require('express');
var router = express.Router();
var QuestionsANS=require('../models/questionsANS');



router.post('/', function (req, res, next) {
    console.log('Post received! On QuestionANS');
    var QuestionAns = new QuestionsANS({
        questionId:req.body.questionId,
        answer:req.body.answer

    });
    QuestionAns.save(function(err, result) {
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
    QuestionsANS.find()
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

