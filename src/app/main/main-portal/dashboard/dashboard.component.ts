import {Component, OnInit, ViewEncapsulation} from '@angular/core';
// import {routerTransition} from '../../router.animations';
import {CompetitionService} from '../../../services/competition.service';
import {Competition} from '../../../models/mygolf/competition';
import * as moment from 'moment';
// import {parseString} from 'xml2js';

@Component({
    selector   : 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls  : ['./dashboard.component.scss'],
    // animations : [routerTransition()]
        encapsulation: ViewEncapsulation.None

})
export class DashboardComponent implements OnInit {
    public alerts: Array<any>  = [];
    public sliders: Array<any> = [];
    public upcomingCompetitions: Competition [];
    constructor(private competitionService: CompetitionService) {
        this.sliders.push({
            imagePath      : 'assets/images/fader1.jpg',
            label          : 'Official Live Scoring System Provider for',
            text           : 'Nulla vitae elit libero, a pharetra augue mollis interdum.',
            link           : 'http://mga.mygolf2u.com/tournament-leaderboard/192',
            // link           : 'http://mga.mygolf2u.com/leaderboard/289',
            routerLink     : ['/teamleaderboard/173'],
            // routerLink     : ['../../../leaderboard-module/team-leaderboard/173'],
            iosPic         : 'assets/images/main_page_phone.png',
            tournament_name: 'Nomura Cup 2017',
            hide           : false,
            details        : ['/competition/details/173'],
          }, {
            imagePath      : 'assets/images/fader1.jpg',
            label          : 'Official Live Scoring System Provider for',
            text           : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            link           : 'http://www.google.com',
            iosPic         : 'assets/images/main_page_phone.png',
            tournament_name: 'Prudential Astro Masters 2017',
            hide           : true,
            details        : ['/tournament-details/192']

        }, {
            imagePath      : 'assets/images/fader1.jpg',
            label          : 'Official Live Scoring System Provider for',
            text           : 'Praesent commodo cursus magna, vel scelerisque nisl consectetur.',
            link           : 'http://www.google.com',
            iosPic         : 'assets/images/main_page_phone.png',
            tournament_name: 'Bridgestone Amateur Open 2017',
            hide           : true,
            routerLink     : ['/teamleaderboard/192'],
            details        : ['/tournament-details/192']

        });
        this.alerts.push({
            id     : 1,
            type   : 'success',
            message: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Voluptates est animi quibusdam praesentium quam, et perspiciatis,
                consectetur velit culpa molestias dignissimos
                voluptatum veritatis quod aliquam! Rerum placeat necessitatibus, vitae dolorum`
        }, {
            id     : 2,
            type   : 'warning',
            message: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Voluptates est animi quibusdam praesentium quam, et perspiciatis,
                consectetur velit culpa molestias dignissimos
                voluptatum veritatis quod aliquam! Rerum placeat necessitatibus, vitae dolorum`
        });

// let htmlContent = 'http://www.thestar.com.my/sport/golf/';
//         let parser = new DOMParser();
// let parsedHtml = parser.parseFromString(htmlContent, 'text/html');

// let xml ="http://www.thestar.com.my/rss/sport/golf/";
//
// parseString(xml, function (err, result) {
//     console.log(result);
// });
    }

    ngOnInit() {
        this.refreshUpcomingCompetitions();
    }

    public closeAlert(alert: any) {
        const index: number = this.alerts.indexOf(alert);
        this.alerts.splice(index, 1);
    }
    private refreshUpcomingCompetitions() {
        this.competitionService.searchUpcomingCompetitions(null, 1, 3)
            .subscribe((compList) => {
                this.upcomingCompetitions = compList.competitions;
            });
    }

    compStartsIn(startDate: Date) {
        return moment(startDate).fromNow();
    }
    daysToToday(date: Date) {
        return moment(date).diff(moment.now(), 'days');
    }
}
