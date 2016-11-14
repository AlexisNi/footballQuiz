import {Component, OnInit, Input} from '@angular/core';
import {Question} from "./question";
import {QuestionService} from "./question.service";
import {QuestionANS} from "./questionANS";

@Component({
    selector: 'my-questionScore',
    templateUrl: './question-structure.component.html'
})
export class QuestionStructure implements OnInit{
    constructor(private questionService:QuestionService){}
    questions:Question[]=[];
    index=0;
    answerQuestion:QuestionANS[]=[];

    ngOnInit(): any {
        this.getQuestions();
        this.getQuestionsANS();
    }
    getQuestions(){
        return  this.questionService.getQuestions()
            .subscribe(
                (questions:Question[])=>{
                this.questions=questions;

                });
    }

    getQuestionsANS(){
        return  this.questionService.getAnsweredQuestions()
            .subscribe(
                (questions:QuestionANS[])=>{
                    this.answerQuestion=questions;
                    console.log(questions.length)
                });
    }

    nextQuestion(){
        this.index++;
    }

    onChooseQuestion(activeQuestion:Question,answerChoice:Object){
        if(activeQuestion.answer===answerChoice){
            console.log('Right Answer!!!!');

            var  questionAns=new QuestionANS(activeQuestion.questionId,true);
            this.questionService.saveAnswerdQuestion(questionAns)
                .subscribe(
                    data => console.log(data),
                    error => console.error(error)
                );
            this.nextQuestion()



        }else {

            var  questionAns=new QuestionANS(activeQuestion.questionId,false);
            this.questionService.saveAnswerdQuestion(questionAns)
                .subscribe(
                    data => console.log(data),
                    error => console.error(error)
                );


        }

    }











}