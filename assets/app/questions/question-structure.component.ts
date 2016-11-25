import {Component, OnInit, Input, OnChanges, SimpleChanges, ViewChild, AfterViewInit} from '@angular/core';
import {Question} from "./question";
import {QuestionService} from "./question.service";
import {ArenaQuestion} from "./arena_question";
import {Subscription} from "rxjs";
import {ActivatedRoute, Data} from "@angular/router";
import {AuthService} from "../auth/auth.service";
import {AnsweredQuestion} from "./answered-questions";
import {QuestionPlayed} from "./questionModels/questionPlayed";
import {ModalComponent} from "ng2-bs3-modal/components/modal";
import {StatusPlayed} from "./questionModels/statusPlayedArena";

@Component({
    selector: 'my-questionScore',
    templateUrl: './question-structure.component.html'
})
export class QuestionStructure implements OnInit{

    @Input()  index=0;
    userName:string;
    userId: string;
    isLost;
    private  arenaId:string;
    private  subscription:Subscription;
    private arenaQuestions:Question[]=[];
    @ViewChild('myModal')
    modal: ModalComponent;

    open() {
        this.modal.open();
    }



    constructor(private questionService:QuestionService,private route:ActivatedRoute,private userService:AuthService){}

    ngOnInit(): any {
        console.log('onInit');
        this.getArenaId();
        this.getUser();
        this.getUserId();
        this.statusPlayed();
        this.getArenaQuestions();
/*
        this.getQuestionsANS();
*/
    }


    getArenaQuestions(){
        return  this.questionService.getArenaQuestions(this.arenaId)
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
            var questionAnswer=new AnsweredQuestion(activeQuestion.questionId,true);
            console.log(questionAnswer);
            var  questionAns=new ArenaQuestion(this.arenaId,this.userId,questionAnswer);
            this.questionService.saveAnswerdQuestion(questionAns)
                .subscribe(
                    data => console.log(data),
                    error => console.error(error)
                );
            var questionPlayed=new  QuestionPlayed(this.arenaId,activeQuestion.questionId);
            this.questionService.questionPlayed(questionPlayed)
                .subscribe(
                    data=>console.log(data),
                    error=>console.log(error));



            this.nextQuestion()



        }else {
            var questionAnswer=new AnsweredQuestion(activeQuestion.questionId,true);
            var  questionAns=new ArenaQuestion(this.arenaId,this.userId,questionAnswer);
            this.questionService.saveAnswerdQuestion(questionAns)
                .subscribe(
                    data => console.log(data),
                    error => console.error(error)
                );
            var questionPlayed=new  QuestionPlayed(this.arenaId,activeQuestion.questionId);
            this.questionService.questionPlayed(questionPlayed)
                .subscribe(
                    data=>console.log(data),
                    error=>console.log(error));

            this.isLost=true;
            this.open();
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

    statusPlayed(){
    var arenaInfo=new StatusPlayed(this.arenaId,this.userId);

        this.questionService.statusPlayed(arenaInfo)
            .subscribe(
                data=>console.log(data),
                error=>console.log(error));
    }











}