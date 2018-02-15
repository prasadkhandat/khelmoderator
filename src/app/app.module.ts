import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import {AuthGuard} from './core/guard/auth-guard.guard'
import { NetworkService } from "./core/service/network-service.service"
import { SharedPreferencesService } from "./core/service/shared-preferences-service.service"
import { RoutingModule } from "./routing/routing.module";

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { Daterangepicker } from 'ng2-daterangepicker';

import { DateTimePickerModule} from 'ngx-datetime-picker';
import { BsModalModule } from 'ng2-bs3-modal';

@NgModule({
    imports: [       
        FormsModule,
        BrowserModule,
        RoutingModule,
        HttpModule,
        BsDropdownModule.forRoot(),
        TooltipModule.forRoot(),
        ModalModule.forRoot(),
        Daterangepicker,
DateTimePickerModule,
BsModalModule     
    ],
    declarations: [
        AppComponent,       
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        DashboardComponent
    ],   
    exports: [BsDropdownModule, TooltipModule, ModalModule],
    providers: [AuthGuard, NetworkService, SharedPreferencesService],
    bootstrap: [AppComponent]
})
export class AppModule { }
