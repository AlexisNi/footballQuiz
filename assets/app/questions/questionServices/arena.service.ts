import {Injectable} from "@angular/core";
import {Question} from "../questionModels/question";
import {Http, Response, Headers} from "@angular/http";
import {Observable} from "rxjs";
import 'rxjs/add/operator/map';
import {QuestionPlayed} from "../questionModels/questionPlayed";
import {StatusPlayed} from "../questionModels/statusPlayedArena";
@Injectable()
export class ArenaServices{
    constructor(private http:Http){}

    statusPlayed(arenaInfo:StatusPlayed){
        const body = JSON.stringify(arenaInfo);
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post('http://localhost:3000/arena/playedStatus', body, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) =>Observable.throw(error.json()));

    }
}
