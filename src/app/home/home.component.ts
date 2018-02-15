import { Component, OnInit, OnDestroy, ViewChild, HostListener, ElementRef} from '@angular/core'
import { Router, NavigationEnd } from '@angular/router'
import { Observable } from "rxjs/Observable"
import { Response } from "@angular/http"
import * as Constant from "../core/models/constants"
import { NetworkService } from "../core/service/network-service.service"
import { SharedPreferencesService } from "../core/service/shared-preferences-service.service"
declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [SharedPreferencesService, NetworkService]
})
export class HomeComponent implements OnInit {

    bodyClasses = 'skin-blue sidebar-mini';
    body: HTMLBodyElement = document.getElementsByTagName('body')[0];
  
    constructor(private networkService: NetworkService, private router: Router, private sharedPreferencesService: SharedPreferencesService, private element: ElementRef) {
  
        $('.wrapper').css("height", (window.screen.height) + "px");
    }

  ngOnInit() {
      // add the the body classes
      this.body.classList.add('skin-blue');
      this.body.classList.add('sidebar-mini');
  }

  logoutApp() {
      this.sharedPreferencesService.clearSession();
      this.router.navigateByUrl('/login');
  }


}
