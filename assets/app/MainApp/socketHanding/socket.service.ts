import * as io from  "socket.io-client";
import {Injectable} from "@angular/core";
@Injectable()

export class SocketService{
    private socket:any;

    sendUserId(userId:string)
    {
        this.socket=io('http://localhost:4000/game',{query:"UserName: Alex"});
        this.socket.emit('get-userId',userId);

    }

    enterArena(arenaId:string,userId:string){
        this.socket.emit('enterArena',{arenaId:arenaId,userId:userId});
    }
    arenaLeave(){
        this.socket.emit('leaveArena');
    }


    getSystemMessages(){

    }


}