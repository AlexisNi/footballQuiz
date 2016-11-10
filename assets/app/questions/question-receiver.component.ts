import {Component, OnInit} from '@angular/core';
import {Question} from "./question";
import {QuestionService} from "./question.service";

@Component({
    selector: 'my-receiver',
    templateUrl: './question-receiver.component.html'
})
export class QuestionReceiver implements  OnInit{
    constructor(private questionService:QuestionService){}
    questions:Question[]=[];

    ngOnInit(): any {
        this.questionService.getQuestions()
            .subscribe(
                (questions:Question[])=> {
                    this.questions=questions;
                });


    }






}