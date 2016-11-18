import {Component, OnInit} from '@angular/core';
import {AuthService} from "../auth/auth.service";
import {User} from "../auth/user";

@Component({
    selector: 'my-app',
    templateUrl: './main.component.html'
})
export class MainComponent implements  OnInit{
    constructor(private userService:AuthService){}
    private userName;
    ngOnInit(): void {
        this.userService.getUser()
            .subscribe(
                (user:string)=> {
                    this.userName=user;
                    console.log(user)
                });
    }

}