import {Component, OnInit, Input} from '@angular/core';
import {Question} from "./question";
import {QuestionService} from "./question.service";

@Component({
    selector: 'my-questionStr',
    templateUrl: './question-structure.component.html'
})
export class QuestionStructure implements OnInit{
    constructor(private questionService:QuestionService){}

    questions:Question[]=[];
    index=0;
    myQuestion;
    question;
    optionA;
    optionB;
    optionC;
    optionD;
    answer;

    ngOnInit(): any {


    this.getQuestions();


    }




    getQuestions(){
       return  this.questionService.getQuestions()
            .subscribe(
                (questions:Question[])=>{
                    this.questions=questions;
                    this.getQuestion();
                }
            );

    }


    getQuestion(){
        this.question=this.questions[this.index].question;
        this.optionA=this.questions[this.index].optionA;
        this.optionB=this.questions[this.index].optionB;
        this.optionC=this.questions[this.index].optionC;
        this.optionD=this.questions[this.index].optionD;
        this.answer=this.questions[this.index].answer;
    }

    nextQuestion(){
        this.index++;
        this.getQuestion();
    }

   checkBtnA(){


    }











}