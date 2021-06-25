import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {
    DefaultLeaderboardSettings,
    LeaderboardSettings
} from '../../component-module/leaderboard-settings/leaderboard-settings';
import {Competition, CompetitionDetails, Team} from '../../models/mygolf/competition';
import {CompetitionService} from '../../services/competition.service';
import {LeaderboardRefreshParams} from '../../component-module/leaderboard-settings/leaderboard-settings.component';

@Component({
    selector   : 'app-leaderboard',
    templateUrl: './leaderboard.component.html',
    styleUrls  : ['./leaderboard.component.scss']
})
export class LeaderboardComponent implements OnInit {
    @Input() competitionId: number;
             competition: Competition;
             compDetails: CompetitionDetails;
             teams: Team [];
             leaderboardType: string       = 'individual';
             showSettings: boolean;
             fullScreen: boolean;
             settings: LeaderboardSettings = DefaultLeaderboardSettings;
    visibilityDialog: boolean;
             refreshParams: LeaderboardRefreshParams;
    constructor(private router: Router,
        private activeRoute: ActivatedRoute,
        private competitionService: CompetitionService) {
    }

    ngOnInit() {
        this.activeRoute.params
            .subscribe(params => {
                //Pop the competition id
                this.competitionId = +params['competitionId'];
                this.refreshCompInfo();
            });
    }

    toggleShowSettings() {
        this.showSettings = !this.showSettings;
    }
    refresh() {

    }
    enterFullScreen() {

    }
    onSettingsRefresh(params: LeaderboardRefreshParams) {
        this.refreshParams = params;
    }
    private refreshCompInfo() {
        if (this.competitionId >= 0) {
            this.competitionService.getCompetitionInfo(this.competitionId)
                .subscribe((comp: Competition) => {
                    this.competition = comp;
                    if(comp.teamEvent) {
                        this.competitionService.getCompetitionTeams(this.competitionId)
                            .subscribe(teams => {
                                this.teams = teams.competitionTeams;
                            })
                    }
                });
            this.competitionService.getCompetitionDetails(this.competitionId)
                .subscribe((det: CompetitionDetails) => {
                    this.compDetails = det;
                });

        }
    }
}
