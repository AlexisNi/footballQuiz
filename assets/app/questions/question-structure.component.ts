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
    iindex=0;

    rightQuestions:Question[]=[];
    wrongQuestions :Question[]=[];
    testQuestion :Question[]=[];

    ngOnInit(): any {


        this.getQuestions();


    }




    getQuestions(){
        return  this.questionService.getQuestions()
            .subscribe(
                (questions:Question[])=>{
                    this.questions=questions;
                    this.testQuestion.push(this.questions[1]);
                });

    }




    nextQuestion(){
        this.iindex++;
    }
    onChooseQuestion(activeQuestion:Question,answerChoice:Object){

        if(activeQuestion.answer===answerChoice){
            console.log('Right Answer!!!!');
            this.rightQuestions.push(activeQuestion);
            this.nextQuestion();

        }else {

         var question:Question[]=[];
            question.push(activeQuestion);
            console.log(question);


            this.wrongQuestions.push(activeQuestion);
            console.log( this.wrongQuestions.length)
            console.log('Wrong Answer!!!!');
            console.log('The answer is :');
            console.log(activeQuestion.answer);
            this.nextQuestion();




        }

    }











}