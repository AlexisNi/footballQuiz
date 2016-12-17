import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../auth/auth.service";
import {SocketService} from "../socketHanding/socket.service";


@Component({
    selector: 'my-arena',
    template: `<div class="row">
    <div class="col-md-5">
        <h1>{{userName}}</h1>
        <opponent-find></opponent-find>
    </div>
    <div class="col-md-7">
        <game-list></game-list>
    </div>
</div>`
})
export class ArenaComponent implements  OnInit{
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