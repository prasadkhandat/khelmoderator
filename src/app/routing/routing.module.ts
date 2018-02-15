import { NgModule } from '@angular/core';
//import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router'
import { LoginComponent } from '../login/login.component'
import { HomeComponent } from '../home/home.component'
import { RegisterComponent } from '../register/register.component'
import { DashboardComponent } from '../dashboard/dashboard.component'
import { AuthGuard } from "../core/guard/auth-guard.guard"



const appRoutes: Routes =
    [
        { path: '', component: LoginComponent, pathMatch: 'full' },
        { path: 'login', component: LoginComponent },
        { path: 'register', component: RegisterComponent },
        {
            path: 'home', component: HomeComponent,
            children: [
                { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
                { path: 'dashboard', component: DashboardComponent }
                //,
                //{ path: 'newpatient', component: NewpatientComponent },
                //{ path: 'patientrx', component: PatientRxComponent }

            ]
        }
    ];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule],
    declarations: []
})
export class RoutingModule { }

