import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Rx'
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
//import {Observable} from "rxjs/Observable"
import { Router, ActivatedRoute } from '@angular/router'
import { NetworkService } from "../core/service/network-service.service"
import { Response } from "@angular/http"
import { SharedPreferencesService } from "../core/service/shared-preferences-service.service"
import * as Constant from "../core/models/constants"
declare var require: any;
declare var $: any;
//declare var swal: any;


import { Daterangepicker } from 'ng2-daterangepicker';
//import { DaterangepickerConfig } from 'ng2-daterangepicker';
var swal = require('sweetalert');

declare var swal: any;
import { saveAs as importedSaveAs } from "file-saver";

import { ModertModel } from "../core/models/moder_data"

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [SharedPreferencesService, NetworkService]
})
export class DashboardComponent implements OnInit {

    public modalRef: BsModalRef; 
    patid: any;
   
    status: string;
    dataPdetails: Array<Object>;
    selectedRow: Number;


   

    //private daterangepickerOptions: DaterangepickerConfig, 

    moder: ModertModel;

    constructor(private modalService: BsModalService, private activatedRoute: ActivatedRoute, private networkService: NetworkService, private router: Router, private sharedPreferencesService: SharedPreferencesService) {
      
        this.networkService.moderatorDetails().subscribe(res => this.successMDetails(res), res => this.errorMDetails(res));

    } 
  

    private successMDetails(res: Response) {
        this.dataPdetails = res.json();
        debugger
        this.status = res.statusText;

        //  alert("New Patient added successfully.");

    }

    private errorMDetails(res: Response) {
        debugger
        this.status = res.statusText;
        swal({
            type: "warning",
            title: "Khel Approvied Data",
            text: this.status,
            buttonsStyling: false,
            confirmButtonClass: "btn btn-danger"
        });

    }

    RefreshList(event: any) {
        this.networkService.moderatorDetails().subscribe(res => this.successMDetails(res), res => this.errorMDetails(res));

    }
 

    // approvied the game

  setClickedRow(event: any, item: any) {
      debugger
      this.moder = new ModertModel;

      var target = event.target || event.srcElement || event.currentTarget;
      //var idAttr = target.attributes.id;
      var value = event.target.innerHTML;

      this.selectedRow = item;
      let ddd;
      console.log(ddd = item);
      this.patid = item.id;


      this.moder.id = item.id;
      this.moder.name = item.name;
      this.moder.description = item.description;
      this.moder.formation = item.formation;
      this.moder.intensity = item.intensity;
      this.moder.audiance = item.audiance;
      this.moder.min_participants = item.min_participants;
      this.moder.max_participants = item.max_participants;
      this.moder.video = item.video;
      this.moder.avg_rating = 0;
      this.moder.is_validated = true;
      this.moder.validated_by_name = this.sharedPreferencesService.getLastName();
      this.moder.validated_user_id = item.id;
      this.moder.validated_date = item.submited_date;
      this.moder.submited_by_name = this.sharedPreferencesService.getLastName();
      this.moder.submited_by_user_id = item.id;
      this.moder.submited_date = item.submited_date;

      console.log("modert model " + this.moder);

      this.networkService.postModertorData(this.moder).subscribe(res => this.successA(res), res => this.errorA(res));
      

  }

  private successA(res: Response) {
      debugger     
  //led dd = res.json();
      // alert("Appointment created.");
      swal({
          type: "success",
          title: "Khel Approvied",
          text: this.status,
          buttonsStyling: false,
          confirmButtonClass: "btn btn-success"
      });

      this.networkService.moderatorDetails().subscribe(res => this.successMDetails(res), res => this.errorMDetails(res));
  }

  private errorA(res: Response) {      
      this.status = res.statusText;
      swal({
          type: "warning",
          title: "Khel Approvied",
          text:  this.status,
          buttonsStyling: false,
          confirmButtonClass: "btn btn-danger"
      });
  }

 
  ngOnInit() {
     // this.networkService.patientDetails().subscribe(res => this.successPatDetails(res), res => this.errorPatDetails(res));
  }

 

 
}


