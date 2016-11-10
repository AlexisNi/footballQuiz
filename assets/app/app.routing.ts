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


const APP_ROUTES:Routes =[
    {path:'',redirectTo:'auth',pathMatch:'full'},
    {path:'mainApp',component:MainComponent},
    {path:'auth',component:AuthenticationComponent,children:AUTH_ROUTES}






];
export const routing = RouterModule.forRoot(APP_ROUTES);