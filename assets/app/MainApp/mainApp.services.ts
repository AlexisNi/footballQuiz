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
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post('http://localhost:3000/arena', body, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) =>Observable.throw(error.json()));

    }


}
