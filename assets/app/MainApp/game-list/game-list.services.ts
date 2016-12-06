import {Injectable} from "@angular/core";
import {Http, Headers, Response} from "@angular/http";
import {ArenaUserId} from "../models/arenaUserId";
import {Observable} from "rxjs";
import 'rxjs/add/operator/map';
import {ArenaUsers} from "../models/arenaUsers";

/**
 * Created by alex on 06/12/2016.
 */

@Injectable()
export class GameListServices{
    constructor(private http:Http){}

    public arenas:ArenaUsers[]=[];




    getResult(arenaUserInfo:ArenaUserId){
        const body = JSON.stringify(arenaUserInfo);
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post('http://localhost:3000/questionANS/getResults', body, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) =>Observable.throw(error.json()));
    }

    getArenas(){
        const token=localStorage.getItem('token')? '?token='+localStorage.getItem('token') : '';
        return this.http.get('http://localhost:3000/arena/arenas'+token)
            .map((response: Response) => {
                const arenas = response.json().obj;
                let transformedArenas: ArenaUsers[] = [];
                for (let arena of arenas) {
                    transformedArenas.push(new ArenaUsers(
                        arena._id,
                        arena.user ,
                        arena.invite._id,
                        arena.status_accept,
                        arena.user.lastName || arena.invite.lastName,
                        arena.user_played,
                        arena.invite_played
                    ));
                }
                const UserArenas=response.json().objUser;
                for (let userArena of UserArenas){
                    transformedArenas.push(new ArenaUsers(
                        userArena._id,
                        userArena.user._id ,
                        userArena.invite,
                        userArena.status_accept,
                        userArena.user.lastName,
                        userArena.user_played,
                        userArena.invite_played

                    ));
                }
                this.arenas=transformedArenas;
                return transformedArenas ;
            })
            .catch((error: Response) =>Observable.throw(error.json()));

    }





}