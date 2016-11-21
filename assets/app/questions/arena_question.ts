import {AnsweredQuestion} from "./answered-questions";
/**
 * Created by alex on 18/10/2016.
 */
export  class ArenaQuestion{
    arenaId:string;
    userId:string;



    constructor(arenaId:string,userId:string,question:AnsweredQuestion[]){
        this.arenaId=arenaId;
        this.userId=userId;

    }


}