import {Injectable} from "@angular/core";
import {Http, Headers, Response} from "@angular/http";
import 'rxjs/Rx';
import {Observable} from "rxjs";
import {User} from "../auth/user";
import {ArenaUsers} from "./arenaUsers";



@Injectable()
export class MainAppService{
    constructor(private http:Http){}




    findUser(userName:User) {
        const body = JSON.stringify(userName);
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post('http://localhost:3000/user/find', body, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) =>Observable.throw(error.json()));
    }


    createArena(arenaUser:ArenaUsers){
        const body = JSON.stringify(arenaUser);
        const token=localStorage.getItem('token')? '?token='+localStorage.getItem('token') : '';
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post('http://localhost:3000/arena'+token, body, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) =>Observable.throw(error.json()));

    }
/*    getArenas(){
        return this.http.get('http://localhost:3000/arena/arenas')
            .map((response: Response) => {
                const questions = response.json().obj;
                let transformedMessages: ArenaUsers[] = [];
                for (let question of questions) {
                    transformedMessages.push(new ArenaUsers(
                        question.
                    ));
                }
                return transformedMessages;
            })
            .catch((error: Response) =>Observable.throw(error.json()));

    }*/


}
