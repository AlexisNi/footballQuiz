/**
 * Created by alex on 18/10/2016.
 */
export  class Question{
    questionId:string;
    question:string;
    optionA:string;
    optionB:string;
    optionC :string;
    optionD:string;
    answer:string;


    constructor(question:string,optionA:string,optionB:string,optionC:string,optionD:string,answer:string,questionId:string,){
        this.questionId=questionId;
        this.question=question;
        this.optionA=optionA;;
        this.optionB=optionB;
        this.optionC=optionC;
        this.optionD=optionD;
        this.answer=answer;

    }


}