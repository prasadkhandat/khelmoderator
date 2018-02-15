import { Injectable } from '@angular/core'
import { AuthInfo } from "../models/auth-info"
import * as Constant from "../models/constants"

@Injectable()
export class SharedPreferencesService {

    setAuthInformation(authInformation: string) {
        sessionStorage.setItem(Constant.auth_info, authInformation);
        console.log(authInformation);
    }

    setSignalRConnectionInfo(connectionInfo: string) {
        sessionStorage.setItem(Constant.SignalR, connectionInfo);
        console.log(connectionInfo);
    }

    private getAuthenticationInfo(): AuthInfo {

        let authInfo: AuthInfo = null;
        try {
            authInfo = JSON.parse(sessionStorage.getItem(Constant.auth_info));
        } catch (e) {
            console.log(e);
        }
        return authInfo;

    }


    private convertUTCDateToLocalDate(date: Date): Date {

        var newDate = new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000);
        var offset = date.getTimezoneOffset() / 60;
        var hours = date.getHours();
        newDate.setHours(hours - offset);
        return newDate;
    }

    isValidSession(): boolean {
        let flag: boolean = false;
        try {
            var date = this.convertUTCDateToLocalDate(new Date(this.getUTCExpiryDate()));
            if (date.getTime() > (new Date()).getTime()) {
                flag = true;
            }
        } catch (e) {
            console.log('SharedPreferencesService >> isvalidsession() >> ' + e);
        }

        return flag;
    }

    getUTCExpiryDate(): string {

        let authInfo: AuthInfo = this.getAuthenticationInfo();

        if (authInfo == null)
            return "";
        else
            return authInfo.expiry;
    }

    getMasterCustomerID(): string {

        let authInfo: AuthInfo = this.getAuthenticationInfo();

        if (authInfo == null)
            return "";
        else
            return authInfo.mastercustomerid;
    }

    getUserType(): string {

        let authInfo: AuthInfo = this.getAuthenticationInfo();

        if (authInfo == null)
            return "";
        else
            return authInfo.user_type;
    }

    getAuthToken(): string {

        let authInfo: AuthInfo = this.getAuthenticationInfo();

        if (authInfo == null)
            return "";
        else
            return authInfo.access_token;
    }

    getFirstName(): string {

        let authInfo: AuthInfo = this.getAuthenticationInfo();

        if (authInfo == null)
            return "";
        else
            return authInfo.first_name;
    }

    getLastName(): string {

        let authInfo: AuthInfo = this.getAuthenticationInfo();

        if (authInfo == null)
            return "";
        else
            return authInfo.last_name;
    }

    getUserID(): string {

        let authInfo: AuthInfo = this.getAuthenticationInfo();

        if (authInfo == null)
            return "";
        else
            return authInfo.user_id;
    }
    getEmail(): string {

        let authInfo: AuthInfo = this.getAuthenticationInfo();

        if (authInfo == null)
            return "";
        else
            return authInfo.email;
    }

    getGlobalVeriable(key: string): string {
        return localStorage.getItem(key);
    }

    setGlobalVeriable(key: string, value: string): void {
        localStorage.setItem(key, value);
    }

    clearSession() {
        sessionStorage.clear();
    }
}