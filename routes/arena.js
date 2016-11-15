var express = require('express');
var router = express.Router();
var ArenaUser=require('../models/arena');
var QuestionArena=require('../models/question_arena');
router.post('/', function (req, res, next) {
    console.log(req.body);
    console.log('Post received! On Arena');
    var arenaUser = new ArenaUser({
        user_id:req.body.userId,
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

        var questionArena=new QuestionArena({
            id_arena:arenaUser._id
        });

        questionArena.save(function (err,result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(201).json({
                message: 'ArenaQuestion created',
                obj: result
            });

        });



        res.status(201).json({
            message: 'Arena created',
            obj: result
        });
    });
});
module.exports=router;
