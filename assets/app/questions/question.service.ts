import {Http, Response, Headers} from "@angular/http";
import {Injectable, EventEmitter} from "@angular/core";
import 'rxjs/Rx';
import {Observable} from "rxjs";
import 'rxjs/add/operator/map';
import {Question} from "./questionModels/question";
import {ArenaQuestion} from "./questionModels/arena_question";
import {QuestionPlayed} from "./questionModels/questionPlayed";
import {StatusPlayed} from "./questionModels/statusPlayedArena";
import {AnsweredQuestion} from "./questionModels/answered-questions";

@Injectable()
export  class QuestionService{
    private arenaQuestionAnswer:AnsweredQuestion[]=[];
    private arenaQuestions:Question[]=[];
    constructor(private http:Http){}

    getArenaQuestions(id:String){
        return this.http.get('http://localhost:3000/question/arenaQuestions'+'?id='+id).
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

      questionPlayed(questionPlayed:QuestionPlayed){
        const body = JSON.stringify(questionPlayed);
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post('http://localhost:3000/question/questionPlayed', body, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) =>Observable.throw(error.json()));
    }


    statusPlayed(arenaInfo:StatusPlayed){
        const body = JSON.stringify(arenaInfo);
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post('http://localhost:3000/arena/playedStatus', body, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) =>Observable.throw(error.json()));

    }

    getCorrectQuestions(playerArena:StatusPlayed){
        var userId=playerArena.userId;
        var arenaId=playerArena.arenaId;
        return this.http.get('http://localhost:3000/questionANS/correct'+'?userId='+userId+'&'+'arenaId='+arenaId)
            . map((response:Response)=>{
                const questionsAnswered=response.json().obj;
                let transformedQuestionsAnswered:AnsweredQuestion[]=[];
                for (let answeredQuestion of questionsAnswered){
                    transformedQuestionsAnswered.push(new AnsweredQuestion(
                       answeredQuestion._id,
                       answeredQuestion.answer
                    ));
                }
                this.arenaQuestionAnswer=transformedQuestionsAnswered;
                return transformedQuestionsAnswered;

            });


    }




}