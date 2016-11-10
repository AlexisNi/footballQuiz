import {Routes} from "@angular/router";
import {SignUpComponent} from "./signup.component";
import {LoginComponent} from "./login.component";
import {LogoutComponent} from "./logout.component";

/**
 * Created by alex on 20/10/2016.
 */


export const AUTH_ROUTES:Routes=[
    {path:'',redirectTo:'signup', pathMatch:'full'},
    {path:'signup',component:SignUpComponent},
    {path:'signin',component:LoginComponent},
    {path:'logout',component:LogoutComponent},

];
