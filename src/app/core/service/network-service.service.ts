import { Injectable } from '@angular/core'
import { Http, Response, Headers, RequestOptions } from '@angular/http'
import { Observable } from 'rxjs/Rx'
import { VerificationModel } from '../models/verification-model'
import { SharedPreferencesService } from '../service/shared-preferences-service.service'
import * as Constant from "../models/constants"
import { RegistrationModel} from "../models/registration-model"

import { ModertModel } from "../models/moder_data"

@Injectable()
export class NetworkService {

    private Service_Base: string = Constant.APIEndpoint + "/v1";
    private http: Http = null;
    HTTP_OK: number = 200;

    formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [year, month, day].join('-');
    }

    constructor(_http: Http, private sharedPreferencesService: SharedPreferencesService) {
        // constructor(_http: Http) {
        this.http = _http;


    }

    authenticate(username: string, password: string, client: string): Observable<Response> {
        debugger
        let data = "grant_type=password&username=" + username + "&password=" + password;
        if (client.length > 0) data = data + "&client=" + client;

        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        let options = new RequestOptions({ headers: headers });
        // uses rxjs internally to make async data processing
        var observable = this.http.post(this.Service_Base + "/Authenticate", data, options);
        //filter, copy, subscribe
        return observable;
    }

   
    signup(data: RegistrationModel): Observable<Response> {
        //signup(data: string): Observable<Response> {
        // let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        var observable = this.http.post(this.Service_Base + "/Account", data, options);
        return observable;
    }

 

    moderatorDetails(): Observable<Response> {
        //let data = 'current_date=' + this.formatDate(new Date());
        let headers = new Headers({ 'Authorization': 'bearer ' + this.sharedPreferencesService.getAuthToken() });
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
       // var observable = this.http.get(this.Service_Base + "/Patient", options);
        var observable = this.http.get(this.Service_Base + "/Moderator", options);
        return observable;
    }

    postModertorData(mdata: any): Observable<Response> {
        debugger
        let headers = new Headers({ 'Authorization': 'bearer ' + this.sharedPreferencesService.getAuthToken() });
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
        var observable = this.http.post(this.Service_Base + "/Moderator", mdata, options);
        return observable;
    }



}
