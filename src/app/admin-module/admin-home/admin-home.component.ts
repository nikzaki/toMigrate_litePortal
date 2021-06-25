import {Component, OnInit, ViewEncapsulation, ViewChild} from '@angular/core';
import {Competition} from '../../models/mygolf/competition/competition';
import {CompetitionService} from '../../services/competition.service';
import {Action} from '../../models/action';
import {Router} from '@angular/router';
import {CompetitionList} from '../../models/mygolf/competition/competition-list';
import {CompetitionListComponent} from '../../component-module/competition-list/competition-list.component';
import {UserPreferenceService} from '../../services/user-preference.service';
import {AdminHomePref} from './admin-home-pref';
import {Subscription} from 'rxjs/Subscription';

@Component({
    selector     : 'admin-home',
    templateUrl  : './admin-home.component.html',
    styleUrls    : ['./admin-home.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AdminHomeComponent implements OnInit {
    private static PrefKey: string                   = 'admin-home-pref';
                   adminHomePref: AdminHomePref      = {
                       searchType            : 'Upcoming',
                       activeCompSearchText  : '',
                       upcomingCompSearchText: '',
                       upcomingCompPageSize  : 10,
                       tabIndex: 0,
                       upcomingCompPageNo    : 1
                   };
                   activeCompSearchText: string      = '';
                   upcomingCompSearchText: string    = '';
                   upcomingCompPageNo: number        = 1;
                   upcomingCompPageSize: number      = 10;
                   searchType: string                = 'Upcoming';//Another value is 'All'
                   upcomingCompetitions: CompetitionList;
                   activeCompetitions: Competition[] = [];
                   activeCompActions: Action[];
                   upcomingCompetitionActions: Action [];
                   refreshSubscriptions: Subscription[] = [];
    @ViewChild('compList') upcomingCompList: CompetitionListComponent;
    private firstPageReq: boolean                    = true;

    constructor(private competitionService: CompetitionService,
        private userPrefService: UserPreferenceService,
        private router: Router) {
        let pref = this.userPrefService.getFromSession(AdminHomeComponent.PrefKey);
        if (pref) {
            this.adminHomePref = pref;
        }
        this.activeCompActions = [
            {
                actionId        : 'details', actionLabel: 'Details',
                description: 'Show details of this competition', color:'primary',
                icon: 'mdi mdi-information', iconOnly: false,
                extraClasses    : '', flat: true,
                deriveRouterLink: (data: Competition) => {
                    return ['/admin/competition/details', '' + data.competitionId]
                }
            },
            {
                actionId    : 'monitor',
                actionLabel: 'Monitor',
                icon: 'mdi mdi-monitor', iconOnly: false, color:'primary',
                description: 'Start monitor scoring for this competition',
                extraClasses: '',
                flat        : true,
                isDisplay   : (data) => {
                    return data.status === 'In Progress'
                },
                deriveRouterLink: (data)=>{
                    return ['/admin/competition/monitorscoring', '' + data.competitionId]
                }
            },
            {
                actionId    : 'manualscoring', actionLabel: 'Manual Scoring', icon: 'mdi mdi-table-edit', iconOnly: false,
                description: 'Enter manual scores for this competition',
                extraClasses: 'deep-orange-btn', flat: false, color: 'primary',
                isDisplay   : (data) => {
                    return data.status === 'In Progress'
                },
                deriveRouterLink: (data)=>{
                    return ['/admin/competition/manualscoring', '' + data.competitionId]
                }
            }, {
                actionId : 'leaderboard', actionLabel: 'Leaderboard', icon: 'mdi mdi-school', iconOnly: false,
                flat     : false,
                description: 'Display leader board for this competition', color: 'primary',
                isDisplay: (data) => {
                    return data.status === 'Completed' || data.status === 'In Progress'
                },
                deriveRouterLink: (data)=>{
                    if (data.teamEvent) {
                        return ['/admin/competition/teamleaderboard', '' + data.competitionId];
                    } else {
                        return ['/admin/competition/leaderboard', '' + data.competitionId];
                    }
                }
            }
        ];
    }

    savePreference() {
        this.userPrefService.setInSession(AdminHomeComponent.PrefKey, this.adminHomePref);
    }

    ngOnInit() {
        this.refreshActiveCompetitions();
        this.refreshUpcomingCompetitions();
    }

    onFilter(filterText: string) {
        this.adminHomePref.activeCompSearchText = filterText;
        this.savePreference();
        this.refreshActiveCompetitions();
    }

    onFilterOtherComps(filterText: string) {
        // this.upcomingCompSearchText = filterText;
        this.adminHomePref.upcomingCompSearchText = filterText;
        this.savePreference();
        this.refreshUpcomingCompetitions();
    }

    refreshActiveCompetitions() {
        this.competitionService.getActiveCompetitions(this.activeCompSearchText)
            .subscribe((activeComps: Competition[]) => {
                this.activeCompetitions = activeComps;
            });
    }

    refreshUpcomingCompetitions() {
        if (this.adminHomePref.searchType === 'Upcoming') {
            this.competitionService.searchUpcomingCompetitions(this.adminHomePref.upcomingCompSearchText,
                this.adminHomePref.upcomingCompPageNo, this.adminHomePref.upcomingCompPageSize)
                .subscribe((compList: CompetitionList) => {
                    this.upcomingCompetitions = compList;
                });
        }
        else {
            this.competitionService.searchAllCompetitions(this.adminHomePref.upcomingCompSearchText,
                this.adminHomePref.upcomingCompPageNo, this.adminHomePref.upcomingCompPageSize)
                .subscribe((compList: CompetitionList) => {
                    this.upcomingCompetitions = compList;
                });
        }
    }

    onCompetitionAction(event) {
        let comp: Competition = event.data;
        switch (event.actionId) {
            case 'details':
                this.router.navigate(['/admin/competition/details', '' + comp.competitionId]);
                break;
            case 'manualscoring':
                this.router.navigate(['/admin/competition/manualscoring', '' + comp.competitionId]);
                break;
            case 'monitor':
                this.router.navigate(['/admin/competition/monitorscoring', '' + comp.competitionId]);
                break;
            case 'leaderboard':
                if (comp.teamEvent) {
                    this.router.navigate(['/admin/competition/teamleaderboard', '' + comp.competitionId]);
                } else {
                    this.router.navigate(['/admin/competition/leaderboard', '' + comp.competitionId]);
                }
                break;
        }
    }

    onUpcomingCompetitionAction(event) {
        let comp: Competition = event.data;
        switch (event.actionId) {
            case 'details':
                this.router.navigate(['/admin/competition/details', '' + comp.competitionId]);
                break;
        }
    }

    onSearchTypeChange($event) {
        // this.adminHomePref.searchType = $event;
        this.savePreference();
        this.refreshUpcomingCompetitions();
    }

    onUpcomingCompPageRequest($event) {
        if (this.firstPageReq) {
            this.firstPageReq = false;
            return;
        }
        this.adminHomePref.upcomingCompPageNo = $event.page;
        this.savePreference();
        this.refreshUpcomingCompetitions();
    }
}
