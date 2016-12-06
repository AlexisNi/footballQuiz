import {Question} from "../../questions/questionModels/question";
export  class ArenaUsers{
    constructor(public arenaId:string,public userId:string,public inviteId:string,public status_accept?:boolean,public lastName?:string,public user_played?:boolean,public invite_played?:boolean,public questions?:Question[]){

    }
}