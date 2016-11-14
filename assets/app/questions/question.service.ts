import {Http, Response, Headers} from "@angular/http";
import {Injectable, EventEmitter} from "@angular/core";
import 'rxjs/Rx';
import {Observable} from "rxjs";
import 'rxjs/add/operator/map';
import {Question} from "./question";
import {QuestionANS} from "./questionANS";

@Injectable()
export  class QuestionService{
    private questions:Question[]=[];
    constructor(private http:Http){}


    getQuestions() {
        return this.http.get('http://localhost:3000/question')
            .map((response: Response) => {
                const questions = response.json().obj;
                let transformedMessages: Question[] = [];
                for (let question of questions) {
                    transformedMessages.push(new Question(
                        question.question,
                        question.optionA,
                        question.optionB,
                        question.optionC,
                        question.optionD,
                        question.answer,
                        question._id
                    ));
                }
                this.questions = transformedMessages;
                return transformedMessages;
            })
            .catch((error: Response) =>Observable.throw(error.json()));
    }

    saveAnswerdQuestion(answer:QuestionANS){
        const body = JSON.stringify(answer);
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post('http://localhost:3000/questionANS', body, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) =>Observable.throw(error.json()));
    }



    getAnsweredQuestions(){
        return this.http.get('http://localhost:3000/questionANS')
            .map((response: Response) => {
                const questions = response.json().obj;
                let transformedMessages: QuestionANS[] = [];
                for (let question of questions) {
                    transformedMessages.push(new QuestionANS(
                        question.questionId,
                        question.answer,
                    ));
                }
                return transformedMessages;
            })
            .catch((error: Response) =>Observable.throw(error.json()));

    }

}