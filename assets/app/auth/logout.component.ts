/**
 * Created by alex on 20/10/2016.
 */
import {Component} from "@angular/core";
import {AuthService} from "./auth.service";
import {Router} from "@angular/router";
@Component({
    selector:'app-logout',
    template:`<div class="col-md-8 col-md-offset-2">
        <button class="btb btn-danger" (click)="onLogout()">Logout</button>
       
</div>`

})

export  class LogoutComponent{
    constructor(private authService:AuthService,private router:Router){}
    onLogout(){
        this.authService.logout();
        this.router.navigate(['/auth','signin']);


    }

}