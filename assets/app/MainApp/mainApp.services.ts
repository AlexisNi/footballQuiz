import {Injectable} from "@angular/core";
import {Http, Headers, Response} from "@angular/http";
import 'rxjs/Rx';
import {Observable} from "rxjs";
import {User} from "../auth/user";
import {ArenaUsers} from "./arenaUsers";
import {ArenaPlayers} from "./arenaPlayers";



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


    createArena(arenaPlayer:ArenaPlayers){
        const body = JSON.stringify(arenaPlayer);
        const token=localStorage.getItem('token')? '?token='+localStorage.getItem('token') : '';
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post('http://localhost:3000/arena'+token, body, {headers: headers})
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
                        arena.user.lastName || arena.invite.lastName
                    ));
                }
                const UserArenas=response.json().objUser;
                for (let userArena of UserArenas){
                    transformedArenas.push(new ArenaUsers(
                        userArena._id,
                        userArena.user._id ,
                        userArena.invite,
                        userArena.status_accept,
                        userArena.user.lastName
                    ));
                }

                return transformedArenas ;
            })
            .catch((error: Response) =>Observable.throw(error.json()));

    }


}
