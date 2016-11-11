import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from "./app.component";
import {LoginComponent} from "./auth/login.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SignUpComponent} from "./auth/signup.component";
import {HttpModule} from "@angular/http";
import {AuthService} from "./auth/auth.service";
import {routing} from "./app.routing";
import {AuthenticationComponent} from "./auth/authentication.component";
import {HeaderComponent} from "./header.component";
import {LogoutComponent} from "./auth/logout.component";
import {MainComponent} from "./MainApp/main.component";
import {QuestionStructure} from "./questions/question-structure.component";
import {QuestionService} from "./questions/question.service";
import {QuestionReceiver} from "./questions/question-receiver.component";
import {MaterialRootModule} from "@angular/material";

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        SignUpComponent,
        AuthenticationComponent,
        HeaderComponent,
        LogoutComponent,
        MainComponent,
        QuestionStructure,
        QuestionReceiver

    ],
    imports: [BrowserModule,FormsModule,routing,ReactiveFormsModule,HttpModule,MaterialRootModule],
    providers:[AuthService,QuestionService],
    bootstrap: [AppComponent]
})
export class AppModule {

}