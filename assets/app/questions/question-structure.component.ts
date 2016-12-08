import {Component, OnInit, Input, OnChanges, SimpleChanges, ViewChild, AfterViewInit} from '@angular/core';
import {Question} from "./questionModels/question";
import {QuestionService} from "./question.service";
import {ArenaQuestion} from "./questionModels/arena_question";
import {Subscription} from "rxjs";
import {ActivatedRoute, Data, Router} from "@angular/router";
import {AuthService} from "../auth/auth.service";
import {AnsweredQuestion} from "./questionModels/answered-questions";
import {QuestionPlayed} from "./questionModels/questionPlayed";
import {ModalComponent} from "ng2-bs3-modal/components/modal";
import {StatusPlayed} from "./questionModels/statusPlayedArena";
import {SocketService} from "../MainApp/socketHanding/socket.service";
import {ArenaServices} from "./questionServices/arena.service";
import {QuestionServices} from "./questionServices/question.service";
import {QuestionAnswerServices} from "./questionServices/questionAnswer.service";

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
    close(){
        this.isLost=false;
        this.modal.close();
        this.router.navigate(['/mainApp']);
    }




    constructor(private route:ActivatedRoute
        ,private userService:AuthService
        ,private socketService:SocketService
        ,private  arenaService:ArenaServices
        ,private questionServices:QuestionServices
        ,private questionAnswerService:QuestionAnswerServices
        ,private router:Router){}

    ngOnInit(): any {
        console.log('onInit');
        this.getArenaId();
        this.getUser();
        this.getUserId();
        this.socketService.enterArena(this.arenaId,this.userId);
        this.statusPlayed();
        this.getArenaQuestions();

/*
        this.getQuestionsANS();
*/
    }


    getArenaQuestions(){
        return  this.questionServices.getArenaQuestions(this.arenaId)
            .subscribe(
                (arenaQuestions:Question[])=>{
                   this.arenaQuestions=arenaQuestions;
                });


    }
    getCorrectQuestions(){
        const playedArena=new StatusPlayed(this.arenaId,this.userId);
        return this.questionAnswerService.getCorrectQuestions(playedArena)
            .subscribe(
                (data:Data)=>{
                    console.log(data)
                });
    }


    nextQuestion(){
        this.index++;
    }

    onChooseQuestion(activeQuestion:Question,answerChoice:Object){
        if(activeQuestion.answer===answerChoice){
            var questionAnswer=new AnsweredQuestion(activeQuestion.questionId,true);
            console.log(questionAnswer);
            var  questionAns=new ArenaQuestion(this.arenaId,this.userId,questionAnswer);
            this.questionAnswerService.saveAnswerdQuestion(questionAns)
                .subscribe(
                    data => console.log(data),
                    error => console.error(error)
                );
            var questionPlayed=new  QuestionPlayed(this.arenaId,activeQuestion.questionId);
        /*    this.questionServices.questionPlayed(questionPlayed)
                .subscribe(
                    data=>console.log(data),
                    error=>console.log(error));*/



            this.nextQuestion()



        }else {
            var questionPlayed=new  QuestionPlayed(this.arenaId,activeQuestion.questionId);
          /*  this.questionServices.questionPlayed(questionPlayed)
                .subscribe(
                    data=>console.log(data),
                    error=>console.log(error));
            this.getCorrectQuestions();*/
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

        this.arenaService.statusPlayed(arenaInfo)
            .subscribe(
                data=>console.log(data),
                error=>console.log(error));
    }











}