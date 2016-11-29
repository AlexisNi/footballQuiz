import {Component, OnInit, OnDestroy} from '@angular/core';
import {AuthService} from "../auth/auth.service";
import {MainAppService} from "./mainApp.services";
import {SocketService} from "./socketHanding/socket.service";

@Component({
    selector: 'my-app',
    templateUrl: './main.component.html'
})
export class MainComponent implements OnInit,OnDestroy{
    constructor(private socketService:SocketService,private userIdService:AuthService){}

    ngOnInit(): void {
        this.userId=this.userIdService.getUserId();
        this.sendUserId();
    }

    ngOnDestroy(): void {
    }
    userId:string;

    sendUserId(){
        this.socketService.sendUserId(this.userId);
    }



}