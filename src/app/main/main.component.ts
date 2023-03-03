import {Component, OnInit, ViewContainerRef} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

    embedded: boolean = false;
      constructor(public router: Router, private toastManager: ToastsManager,
          private vcr: ViewContainerRef,
          private activeRoute: ActivatedRoute) {

          toastManager.setRootViewContainerRef(vcr);
      }

      ngOnInit() {
        
        this.activeRoute.queryParams
        .subscribe(params => {
            if(params.embedded === 'true') {
                this.embedded = true;
            }
            if(params['enableToyota'] && params['enableToyota'] === 'true') {
              this.embedded = true;
            }
        });
          // if (this.router.url === '/') {
          //     this.router.navigate(['/dashboard']);
          // }
      }

  }
