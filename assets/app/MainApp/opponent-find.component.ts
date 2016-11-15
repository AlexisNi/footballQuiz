import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl,  Validators} from "@angular/forms";
import {MainAppService} from "./mainApp.services";
import {User} from "../auth/user";
import {ArenaUsers} from "./arenaUsers";


@Component({
    selector:'opponent-find',
    templateUrl: './opponent-find.component.html'
})



export class OpponentComponentFind implements OnInit{
    myForm:FormGroup;
    userName;
    inviteId;
    searched=false;

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
                    this.inviteId=data.inviteId;

                },
                error=>console.error(error),
                this.userName=null
            );
    }

    playWith(inviteId:string){
       var userId= localStorage.getItem('userId');
        var arenaUser=new ArenaUsers(userId,inviteId);

        this.mainappservices.createArena(arenaUser)
            .subscribe(
                data => console.log(data),
                error => console.error(error)
            );



    }



}