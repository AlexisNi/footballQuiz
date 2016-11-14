import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl,  Validators} from "@angular/forms";
import {MainAppService} from "./mainApp.services";
import {User} from "../auth/user";


@Component({
    selector:'opponent-find',
    templateUrl: './opponent-find.component.html'
})



export class OpponentComponentFind implements OnInit{
    myForm:FormGroup;
    userName;
    searched;
    constructor(private mainappservices:MainAppService){}
    ngOnInit(): void {
        this.myForm=new FormGroup({
            userName:new FormControl(null,Validators.required)
        });

    }

    onSubmit(){
        this.searched=true;
        const userName = new User(this.myForm.value.userName,this.myForm.value.userName,this.myForm.value.userName,this.myForm.value.userName);
        this.mainappservices.findUser(userName)
            .subscribe(
                data=>{
                    console.log(data);
                    console.log(data.lastName);
                    this.userName=data.lastName;
                },
                error=>console.error(error)
            );
    }



}