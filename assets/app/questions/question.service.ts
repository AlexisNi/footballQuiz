import {Http, Response, Headers} from "@angular/http";
import {Injectable, EventEmitter} from "@angular/core";
import 'rxjs/Rx';
import {Observable} from "rxjs";
import 'rxjs/add/operator/map';
import {Question} from "./question";
import {ArenaQuestion} from "./arena_question";

@Injectable()
export  class QuestionService{
    private arenaQuestions:Question[]=[];
    constructor(private http:Http){}

    getArenaQuestions(){
        return this.http.get('http://localhost:3000/question/arenaQuestions').
            map((response:Response)=>{
            const questions=response.json().obj;
            let transformedQuestions:Question[]=[];
            for (let question of questions){
                transformedQuestions.push(new Question(
                    question.question,
                    question.optiona,
                    question.optionb,
                    question.optionc,
                    question.optiond,
                    question.answer,
                    question._id
                ));
            }
            this.arenaQuestions=transformedQuestions;
            return transformedQuestions;

        })
            .catch((error: Response) =>Observable.throw(error.json()));



    }

    saveAnswerdQuestion(answer:ArenaQuestion){
        const body = JSON.stringify(answer);
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post('http://localhost:3000/questionANS', body, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) =>Observable.throw(error.json()));
    }


/*
    getAnsweredQuestions(){
        return this.http.get('http://localhost:3000/questionANS')
            .map((response: Response) => {
                const questions = response.json().obj;
                let transformedMessages: ArenaQuestion[] = [];
                for (let question of questions) {
                    transformedMessages.push(new ArenaQuestion(
                        question.questionId,
                        question.answer,
                    ));
                }
                return transformedMessages;
            })
            .catch((error: Response) =>Observable.throw(error.json()));

    }*/

}