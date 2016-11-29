/**
 * Created by alex on 18/10/2016.
 */
export  class AnsweredQuestion{
   questionId:string;
   answer:Boolean;



    constructor(questionId:string,answer:Boolean,){

        this.questionId=questionId;
        this.answer=answer;
    }


}