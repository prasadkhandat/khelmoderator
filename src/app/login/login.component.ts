import { Component, OnInit } from '@angular/core'
import { Router, ActivatedRoute, Params } from '@angular/router'
import { NetworkService } from "../core/service/network-service.service"
import { Response } from "@angular/http"
import { SharedPreferencesService } from "../core/service/shared-preferences-service.service"
import * as Constant from "../core/models/constants"

declare var $: any;

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    userName: string = "";
    password: string = "";
    remember: boolean = false;
    message: string = "";
    status: string = "active";
    isTrue: boolean = true;
    isTrueL: boolean = true;
    //client: string = "";
    state: string = "";
    client_id: string = "";
    response_type: string = "";
    scope: string = "";
    redirect_uri: string = "";


    constructor(private activatedRoute: ActivatedRoute, private networkService: NetworkService, private router: Router, private sharedPrefrences: SharedPreferencesService) {
        //let rememberMe = this.sharedPrefrences.getGlobalVeriable(Constant.Remember_me);
        //if (rememberMe == Constant.True) {
        //    this.remember = true;
        //    this.userName = this.sharedPrefrences.getGlobalVeriable(Constant.username);
        //    this.password = this.sharedPrefrences.getGlobalVeriable(Constant.password);
        //}
        //this.router.navigateByUrl('/home');
    }

    ngOnInit() {
        // subscribe to router event
        this.activatedRoute.queryParams.subscribe((params: Params) => {
            this.state = params[Constant.state] == undefined ? '' : params[Constant.state];
            this.client_id = params[Constant.client_id] == undefined ? '' : params[Constant.client_id];
            this.response_type = params[Constant.response_type] == undefined ? '' : params[Constant.response_type];
            this.scope = params[Constant.scope] == undefined ? '' : params[Constant.scope];
            this.redirect_uri = params[Constant.redirect_uri] == undefined ? '' : params[Constant.redirect_uri];
            //console.log(this.client);            
        });

        //this.userName = this.redirect_uri + "#access_token=thisistoken&state=" + this.state + "&token_type=Bearer"
    }


    performLogin() {
        debugger
        this.isTrue = true;
        this.status = 'loading';

        this.networkService.authenticate(this.userName, this.password, this.client_id.length > 0 ? "voicedevice" : "").subscribe(res => this.success(res), res => this.error(res));
    }

    private success(res: Response) {
        var data = res.json();
        if (this.redirect_uri.length > 0) {
            //state=xyz\∾cess_token=2YotnFZFEjr1zCsicxLpAA& token_type=Bearer
            window.location.href = this.redirect_uri + "#access_token=" + data.refresh_token + "&state=" + this.state + "&token_type=Bearer";
            //window.location.href = "https://layla.amazon.com/spa/skill/account-linking-status.html?vendorId=M141YC924A7UGL#state=xyz&access_token=" + data.access_token + "&token_type=Bearer";
            //window.location.href = "https://layla.amazon.com/spa/skill/account-linking-status.html?vendorId=M141YC924A7UGL#access_token=" + data.refresh_token + "&state=refresh_token&token_type=Bearer";
        } else {
            this.message = res.statusText;
            this.isTrueL = false;
            var user_id = "";
            var masterCustomerid = "";
            this.state = "";
            this.client_id = "";
            this.response_type = "";
            this.scope = "";
            this.redirect_uri = "";
            user_id = data.user_id;
            masterCustomerid = data.mastercustomerid;

            if (res.status == this.networkService.HTTP_OK) {

                if (this.remember) {
                    this.sharedPrefrences.setGlobalVeriable(Constant.Remember_me, Constant.True);
                    this.sharedPrefrences.setGlobalVeriable(Constant.username, this.userName);
                    this.sharedPrefrences.setGlobalVeriable(Constant.password, this.password);

                }

                this.sharedPrefrences.setGlobalVeriable(Constant.mastercustomerid, masterCustomerid);
                this.sharedPrefrences.setGlobalVeriable(Constant.userid, user_id);
                this.sharedPrefrences.setAuthInformation(JSON.stringify(res.json()));
                this.router.navigateByUrl('/home');
            }
            else {
                this.isTrueL = true;
                this.status = 'active';
                this.message = Constant.Invalid_username_password;
                this.isTrue = false;
                alert('invalid authentication');
            }
        }
    }

    private error(res: Response) {
        this.isTrueL = true;
        this.status = 'active';
        console.log(res.json());
        this.message = Constant.Invalid_username_password;
        this.isTrue = false;
        alert('invalid authentication');
    }

}

