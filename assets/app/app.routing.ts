/**
 * Created by alex on 19/10/2016.
 */
import {Routes, RouterModule} from "@angular/router";
import {AuthenticationComponent} from "./auth/authentication.component";
import {AUTH_ROUTES} from "./auth/auth.routes";
import {MainComponent} from "./MainApp/main.component";
import {QuestionStructure} from "./questions/question-structure.component";
import {QUESTION_ROUTES} from "./MainApp/mainApp.routes";


const APP_ROUTES:Routes =[
    {path:'',redirectTo:'mainApp',pathMatch:'full'},
    {path:'mainApp',component:MainComponent,children:QUESTION_ROUTES},
    {path:'questions',component:QuestionStructure},
    {path:'auth',component:AuthenticationComponent,children:AUTH_ROUTES}






];
export const routing = RouterModule.forRoot(APP_ROUTES);