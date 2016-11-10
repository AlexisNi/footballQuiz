import {Component, OnInit} from "@angular/core";
import {FormGroup, Validators, FormControl} from "@angular/forms";
import {User} from "./user";
import {AuthService} from "./auth.service";
import {Router} from "@angular/router";

@Component({
    selector:'quiz-signin',
    templateUrl:'./login.component.html'

})

export class LoginComponent implements OnInit{
    myForm:FormGroup;

    constructor(private authservice:AuthService,private router:Router){}
    onSubmit(){
        const user=new User(this.myForm.value.email,this.myForm.value.password);
        this.authservice.signin(user)
            .subscribe(
                data=>{
                    localStorage.setItem('token',data.token);
                    localStorage.setItem('userId',data.userId);
                    this.router.navigateByUrl('mainApp');
                },
                error=>console.error(error)
            );
        this.myForm.reset();

    }







    ngOnInit(): void {
        this.myForm=new FormGroup({
            email:new FormControl(null,Validators.required),
            password:new FormControl(null,Validators.required)
        });

    }
}