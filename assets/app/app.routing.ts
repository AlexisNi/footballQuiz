/**
 * Created by alex on 19/10/2016.
 */
import {Routes, RouterModule} from "@angular/router";
import {SignUpComponent} from "./auth/signup.component";
import {LoginComponent} from "./auth/login.component";
import {AuthenticationComponent} from "./auth/authentication.component";
import {AUTH_ROUTES} from "./auth/auth.routes";
import {LogoutComponent} from "./auth/logout.component";
import {MainComponent} from "./MainApp/main.component";
import {QuestionStructure} from "./questions/question-structure.component";
import {QuestionReceiver} from "./questions/question-receiver.component";


const APP_ROUTES:Routes =[
    {path:'',redirectTo:'questions',pathMatch:'full'},
    {path:'mainApp',component:MainComponent},
    {path:'questions',component:QuestionStructure},
    {path:'auth',component:AuthenticationComponent,children:AUTH_ROUTES}






];
export const routing = RouterModule.forRoot(APP_ROUTES);