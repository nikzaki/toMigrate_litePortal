import {Component} from '@angular/core';

@Component({
    selector: 'app-footer',
    template: `
        <div class = "footer">
            <div class = "card clearfix">
                <span class = "footer-text-left">myGolf2u by Britesoft Solutions</span>
                <span class = "footer-text-right"><span class = "ui-icon ui-icon-copyright"></span>  <span>All Rights Reserved</span></span>
            </div>
            <ng-content></ng-content>
        </div>
    `
})
export class AppFooter {

}
