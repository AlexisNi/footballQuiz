import {Component, OnInit, Input} from '@angular/core';
import {Question} from "./question";
import {QuestionService} from "./question.service";

@Component({
    selector: 'my-questionStr',
    templateUrl: './question-structure.component.html'
})
export class QuestionStructure implements OnInit{
    constructor(private questionService:QuestionService){


    }
    questions:Question[]=[];
    index=0;
    myQuestion;
    question;
    optionA;
    optionB;
    optionC;
    optionD;

    ngOnInit(): any {


        this.getQuestions();

    }

    getQuestions(){
        this.questionService.getQuestions()
            .subscribe(
                (questions:Question[])=>{
                    this.questions=questions;
                    this.getQuestion();
                }
            );

    }


    getQuestion(){
        this.question=this.questions[this.index].question;
    }

    nextQuestion(){
        this.index++;
        this.getQuestion();
    }











}