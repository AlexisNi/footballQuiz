import {Component, OnInit, Input} from '@angular/core';
import {Question} from "./question";
import {QuestionService} from "./question.service";
import {ArenaQuestion} from "./arena_question";
import {Subscription} from "rxjs";
import {ActivatedRoute, Data} from "@angular/router";
import {AuthService} from "../auth/auth.service";

@Component({
    selector: 'my-questionScore',
    templateUrl: './question-structure.component.html'
})
export class QuestionStructure implements OnInit{
    index=0;
    userName:string;
    userId: string;
    answerQuestion:ArenaQuestion[]=[];
    private arenaId:string;
    private  subscription:Subscription;
    private arenaQuestions:Question[]=[];


    constructor(private questionService:QuestionService,private route:ActivatedRoute,private userService:AuthService){}

    ngOnInit(): any {
        this.getArenaId();
        this.getUser();
        this.getUserId();
        this.getArenaQuestions();
/*
        this.getQuestionsANS();
*/
    }

    getArenaQuestions(){
        return  this.questionService.getArenaQuestions()
            .subscribe(
                (arenaQuestions:Question[])=>{
                   this.arenaQuestions=arenaQuestions;
                });


    }

/*    getQuestionsANS(){
        return  this.questionService.getAnsweredQuestions()
            .subscribe(
                (questions:ArenaQuestion[])=>{
                    this.answerQuestion=questions;
                    console.log(questions.length)
                });
    }*/

    nextQuestion(){
        this.index++;
    }

    onChooseQuestion(activeQuestion:Question,answerChoice:Object){
        if(activeQuestion.answer===answerChoice){
            console.log('Right Answer!!!!');

            var  questionAns=new ArenaQuestion(this.arenaId,this.userId,activeQuestion.questionId,true);
            this.questionService.saveAnswerdQuestion(questionAns)
                .subscribe(
                    data => console.log(data),
                    error => console.error(error)
                );
            this.nextQuestion()



        }else {

            var  questionAns=new ArenaQuestion(this.arenaId,this.userId,activeQuestion.questionId,false);
            this.questionService.saveAnswerdQuestion(questionAns)
                .subscribe(
                    data => console.log(data),
                    error => console.error(error)
                );

            this.nextQuestion()
        }

    }

    getArenaId(){
        this.subscription=this.route.params.subscribe(
            (params:any)=>{
                if (params.hasOwnProperty('id')){
                    this.arenaId=params['id'];
                }
            }
        );

    }
    getUser(){
            this.userService.getUser()
                .subscribe(
                    (user:string)=> {
                        this.userName=user;
                        console.log(user)
                    });

    }

    getUserId(){
       this.userId=this.userService.getUserId();
        console.log(this.userId);
    }












}