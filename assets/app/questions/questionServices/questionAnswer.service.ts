import {Injectable} from "@angular/core";
import {Question} from "../questionModels/question";
import {Http, Response, Headers} from "@angular/http";
import {Observable} from "rxjs";
import 'rxjs/add/operator/map';
import {QuestionPlayed} from "../questionModels/questionPlayed";
import {StatusPlayed} from "../questionModels/statusPlayedArena";
import {ArenaQuestion} from "../questionModels/arena_question";
import {AnsweredQuestion} from "../questionModels/answered-questions";
@Injectable()
export class QuestionAnswerServices{
    constructor(private http:Http){}
    private arenaQuestionAnswer:AnsweredQuestion[]=[];


    saveAnswerdQuestion(answer:ArenaQuestion){
        const body = JSON.stringify(answer);
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post('http://localhost:3000/questionANS', body, {headers: headers})
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
