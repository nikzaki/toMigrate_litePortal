import {Component, OnInit, ViewContainerRef} from '@angular/core';
import { Router } from '@angular/router';
import {ToastsManager} from 'ng2-toastr/ng2-toastr';

// import {DashboardComponent} from '../main-portal/dashboard/dashboard.component';
// import {AboutUsComponent} from '../main-portal/about-us/about-us.component';
// import {ContactUsComponent} from '../main-portal/contact-us/contact-us.component';
// import {FaqComponent} from '../main-portal/faq/faq.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

      constructor(public router: Router, private toastManager: ToastsManager,
          private vcr: ViewContainerRef) {
          toastManager.setRootViewContainerRef(vcr);
      }

      ngOnInit() {
          // if (this.router.url === '/') {
          //     this.router.navigate(['/dashboard']);
          // }
      }

  }
