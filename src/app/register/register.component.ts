import { Component, OnInit } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { NetworkService } from "../core/service/network-service.service"
import { Response } from "@angular/http"
import { SharedPreferencesService } from "../core/service/shared-preferences-service.service"
import * as Constant from "../core/models/constants"
import { RegistrationModel} from "../core/models/registration-model"
declare var $: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    test: Date = new Date();
	patID: string = '';
	firstName: string = '';
	lastName: string = '';
	practiceName: string = '';
	address: string = '';
	state: string = '';
	city: string = '';
	country: string = '';
	zip: string = '';
	emailaddress: string = '';
	phonenumber: string = '';
	username: string = '';
	password: string = '';

	 message: string = "";
    status: string = "active";
    isTrue: boolean = true;

    constructor(private activatedRoute: ActivatedRoute, private networkService: NetworkService, private router: Router, private sharedPreferencesService: SharedPreferencesService) {

        $('input').iCheck({
            checkboxClass: 'icheckbox_square-blue',
            radioClass: 'iradio_square-blue',
            increaseArea: '20%' // optional
        });
    }

 signup(event: any){
 debugger
//let data = "\id\": "+ this.patID + " , "\first_name\": "+ this.firstName +" , "\last_name"\: " + this.lastName ;
//let data = "{\"id\":" + this.patID + ",\"first_name\":\"" + this.firstName + "\",\"last_name\":\"" + this.lastName + "\",\"practice_name\":\"" + this.practiceName + "\",\"address\":\"" + this.address + "\",\"city\":\"" + this.city + "\",\"country\":\"" + this.country + "\",\"zip\":\"" + this.zip + "\",\"email_address\":\"" + this.emailaddress + "\",\"user_name\":\"" + this.username + "\",\"password\":\"" + this.password  + "\"}"; 
let data :RegistrationModel=new RegistrationModel();
		data.first_name=this.firstName;
        data.last_name=this.lastName;
        data.practice_name=this.practiceName;
        data.address=this.address;
        data.state=this.state;
        data.city=this.city;
        data.country=this.country;
        data.zip=this.zip;
        data.email_address=this.emailaddress;
        data.phone_number=this.phonenumber;
        data.user_name=this.username;
        data.password=this.password;

console.log(data);
this.networkService.signup(data).subscribe(res => this.success(res), res => this.error(res));
 }

  private success(res: Response) {
        //var data = res.json();
        this.router.navigateByUrl('/login');
    
    }

    private error(res: Response) {      
        this.status = 'active';
       // console.log(res.json());
        alert(this.message);
        this.isTrue = false;
    }

  //checkFullPageBackgroundImage() {
  //    var $page = $('.full-page');
  //    var image_src = $page.data('image');

  //    if (image_src !== undefined) {
  //        var image_container = '<div class="full-page-background" style="background-image: url(' + image_src + ') "/>'
  //        $page.append(image_container);
  //    }
  //};

  ngOnInit() {
      //this.checkFullPageBackgroundImage();
  }

}
