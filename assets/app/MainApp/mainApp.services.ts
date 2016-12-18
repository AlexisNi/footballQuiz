import {Injectable,EventEmitter} from "@angular/core";
import {Http, Headers, Response} from "@angular/http";
import 'rxjs/Rx';
import {Observable} from "rxjs";
import {User} from "../auth/user";
import {ArenaUsers} from "./models/arenaUsers";
import {ArenaPlayers} from "./models/arenaPlayers";
import {Subject} from 'rxjs/Subject';
import * as io from  "socket.io-client";
import {ArenaUserId} from "./models/arenaUserId";



@Injectable()
export class MainAppService{
    private arenas:ArenaUsers[]=[];
    constructor(private http:Http){}

    private  socket:any;

/*

    sendUserId(userId:string)
    {
        this.socket=io('http://localhost:4000'/!*,{query:"UserName: Alex"}*!/);
        this.socket.emit('get-userId',userId);

    }
*/



    findUser(userName:User) {
        const body = JSON.stringify(userName);
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post(' https://footballarenaquiz.herokuapp.com/user/find', body, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) =>Observable.throw(error.json()));
    }


    createArena(arenaPlayer:ArenaPlayers){
        const body = JSON.stringify(arenaPlayer);
        const token=localStorage.getItem('token')? '?token='+localStorage.getItem('token') : '';
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post(' https://footballarenaquiz.herokuapp.com/arena'+token, body, {headers: headers})
            .map((response: Response) => {
                const arenaUsers = new ArenaUsers(response.json().obj._id,
                    response.json().obj.user._id,
                    response.json().obj.invite._id,
                    response.json().obj.status_accept,
                    response.json().obj.invite.lastName,
                    response.json().obj.user_played,
                    response.json().obj.invite_played);
                this.arenas.push(arenaUsers);
                return arenaUsers;
            })
            .catch((error: Response) =>Observable.throw(error.json()));

    }



}

