import { Injectable } from "@angular/core"
import { Router, Route, CanLoad, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router"
import { SharedPreferencesService } from "../service/shared-preferences-service.service"

@Injectable()
export class AuthGuard implements CanLoad, CanActivate {

    constructor(private router: Router, private sharedPreferencesService: SharedPreferencesService) {
    }

    canLoad(route: Route): boolean {

        console.log(this.sharedPreferencesService.getUTCExpiryDate());

        if (this.sharedPreferencesService.isValidSession()) {
            console.log("valid");
            return true;
        }
        console.log("invalid");
        this.router.navigate(['/login']);
        return false;
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        console.log(this.sharedPreferencesService.getUTCExpiryDate());

        if (this.sharedPreferencesService.isValidSession()) {
            console.log("valid");
            return true;
        }
        console.log("invalid");
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}