import {Component, ViewEncapsulation, OnInit} from "@angular/core";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

import {SelectItem} from "primeng/components/common/api";



import {PlayerService} from '../../services/player.service';
import {Player} from '../../models/mygolf/player/player';
import {Util} from '../../util';
import {CustomValidators} from 'ng2-validation';
@Component({
  selector: 'app-player-registration',
  templateUrl: './player-registration.component.html',
  styleUrls: ['./player-registration.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class PlayerRegistrationComponent implements OnInit {
  private emailRegex              = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          regForm: FormGroup;
          handicap: number        = 0;
          registrationMessages    = [];
          emailValidationsMsgs = [];
          duplicateEmail: boolean = false;
          teeoffOptions: SelectItem[];

          countryDropdown: SelectItem[] = [];
          countrySuccess: boolean = true;
          countryList;
          selCountry: any;

  constructor(public fb: FormBuilder,
      private playerService: PlayerService) {
    this.teeoffOptions = [];
    this.teeoffOptions.push({label: "Black", value: "Black"});
    this.teeoffOptions.push({label: "Blue", value: "Blue"});
    this.teeoffOptions.push({label: "White", value: "White"});
    this.teeoffOptions.push({label: "Red", value: "Red"});
    let password = new FormControl('', Validators.compose([Validators.required, Validators.minLength(6),
                                                           Validators.maxLength(15)]));
    let password2 = new FormControl('', Validators.compose([Validators.required, CustomValidators.equalTo(password)]));
    this.regForm = this.fb.group({
      email    : ['', Validators.compose([Validators.required,
                                          Validators.pattern(this.emailRegex)])],
      password : password,
      // ['', Validators.compose([Validators.required, Validators.minLength(6),
      //                                 Validators.maxLength(15)])],
      password2: password2,
      // ['', Validators.compose([Validators.required, Validators.minLength(6),
      //                                 Validators.maxLength(15), CustomValidators])],
      firstName: ['', Validators.compose([Validators.required,
                                          Validators.maxLength(50)])],
      lastName : ['', Validators.maxLength(50)],
      nhsNumber:    ['', Validators.maxLength(50)],
      gender   : ['M'],
      handicap : [0, Validators.required],
      teeoff   : ['Blue'],
      phone    : [''],
      nationality: new FormControl('', Validators.compose([Validators.required])),
      country: new FormControl('', Validators.compose([Validators.required])),
      dateOfBirth: ['']
    });

  }

  ngOnInit() {
    this.refreshCountryList();

  }

  onSubmit(value: any) {
    console.log(JSON.stringify(value));
    //Register the player
    this.playerService.registerPlayer(value)
        .subscribe((playerInfo: Player)=>{
          this.registrationMessages = [];
          this.registrationMessages.push({
            severity: 'info',
            detail: "Successfully registered with myGolf2u. Download APP in your mobile"
          });
          this.onReset();
        }, (error)=>{
          if(error.json) error = error.json();
          let msg = Util.getErrorMessage(error, "Error registering with myGolf2u");
          this.registrationMessages = [];
          this.registrationMessages.push({
            severity: 'error', detail: msg
          })
        })
  }

  onReset() {
    this.regForm.reset({gender: 'M', handicap:0, teeoff: 'Blue'});

  }

  onEmailChange() {
    this.playerService.isEmailUsed(this.regForm.value.email)
        .subscribe((used: boolean) => {
          this.duplicateEmail = used;
        })
  }

  refreshCountryList() {
    this.countrySuccess = true;
    this.playerService.getCountryList()
        .subscribe((countryList: any) => {
            this.countryList = countryList;
            console.log('country list ', countryList)
            // this.countryDropdown.push({
            //     label: 'All Countries',
            //     value: {
            //         id: null,
            //         name: '',
            //         sportCode: '',
            //         flag: ''
            //     }
            // })
            this.countryList.forEach((c: any) => {
                // clubItem = {
                //     label: c.clubName, value: {clubId: c.clubId, clubName: c.clubName}
                // }

                this.countryDropdown.push({
                    label: c.name,
                    value: {
                        id: c.id,
                        name: c.name,
                        sportCode: c.sportCode,
                        flag: c.flagUrl
                    }
                })
                // this.clubDropdown.push(clubItem);
            })
            console.log("country list:", this.countryList)
            console.log("country dropdown : ",this.countryDropdown)
        }, (error) => {
            if(error) this.countrySuccess = false;
        })
}

selectedCountry(country?: any) {
  console.log("dropdown country : ", this.regForm.value.nationality)
  // this.regForm.value.nationality = country.id
}

captchaResponse: string;
resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response ${captchaResponse}:`);
    this.captchaResponse = captchaResponse;
    if(this.captchaResponse && this.captchaResponse.length > 0) this.onSubmit(this.regForm.value);
    else {
    }
    //  this.goQuickBook();
}
}