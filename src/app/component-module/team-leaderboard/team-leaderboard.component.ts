import {Component, OnInit, ViewEncapsulation, OnDestroy, Input, ViewChild, ElementRef} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CompetitionService} from '../../services/competition.service';
import {Competition, CompetitionDetails} from '../../models/mygolf/competition';
import {Subscription} from 'rxjs/Subscription';
import {Util} from '../../util';
import {SystemMessageActions} from '../../redux/messages/system-message-actions';
import {CompetitionTeams} from '../../models/mygolf/competition/competition-teams';
import {GameRound} from '../../models/mygolf/gameround';
import {TeamScores} from '../../models/mygolf/competition/team-scores';
import {DataTable} from 'primeng/primeng';
import {Observable} from 'rxjs/Observable';
import {
    LeaderboardSettingsComponent,
    LeaderboardRefreshParams
} from '../leaderboard-settings/leaderboard-settings.component';
import {BusyConfig} from 'angular2-busy';
import {CompetitionLeaderboardComponent} from '../competition-leaderboard/competition-leaderboard.component';
import {LeaderboardSettings, DefaultLeaderboardSettings} from '../leaderboard-settings/leaderboard-settings';
import {UserPreferenceService} from '../../services/user-preference.service';
import {TableColumnDetails, ColumnsHidden} from '../leaderboard-settings/column-visibility';
import {ScoringNotification} from '../../models/session/user-notifications';
import {NotificationService} from '../../redux/notifications/notification-service';

@Component({
    selector     : 'team-leaderboard',
    templateUrl  : './team-leaderboard.component.html',
    styleUrls    : ['./team-leaderboard.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class TeamLeaderboardComponent implements OnInit, OnDestroy {
    @Input() competitionId: number;
             competition: Competition;
             byTeam: boolean = true;
             competitionDetails: CompetitionDetails;
             competitionTeams: CompetitionTeams;
             teamScores: TeamScores[]   = [];
             rounds: GameRound[]        = [];
             colorSet: string           = 'amateur';
             autoScroll: boolean        = true;

             fullScreen: boolean        = false;
             processedTeamScores: any[] = [];
             teamScoreDisplay: any[]    = [];
             showSettings: boolean      = false;

             currentPage: number        = 1;
             totalPages: number         = 0;

             refreshParams: LeaderboardRefreshParams;
             busyConfig: any = {
                 busy: []
             };
    teamLeaderboardSettings: LeaderboardSettings = Object.assign({},DefaultLeaderboardSettings);
    individualLeaderboardSettings: LeaderboardSettings = Object.assign({}, DefaultLeaderboardSettings);
    tlbColumns: TableColumnDetails[];
    ilbColumns : TableColumnDetails[];
    tlbVisibility: ColumnsHidden ={};
    ilbVisibility: ColumnsHidden={};
    leaderboardColumns: TableColumnDetails[];
    scoringNotifications: Observable<ScoringNotification[]>;
    private paramSubscription: Subscription;
    @ViewChild('teamleaderboard') leaderboard: DataTable;
    @ViewChild('settings') settingsComp: LeaderboardSettingsComponent;
    @ViewChild('invidualleaderboard') individualLeaderboard: CompetitionLeaderboardComponent;
    @ViewChild('individualSection') indSection: ElementRef;
    @ViewChild('teamSection') teamSection: ElementRef;
    constructor(private activatedRoute: ActivatedRoute,
        private compService: CompetitionService,
        private userPreference: UserPreferenceService,
        private notfService: NotificationService,
        private messageActions: SystemMessageActions) {
        this.scoringNotifications = this.notfService.scoringNotifications()
            .map( (notfs: ScoringNotification[])=>{
                if(this.competitionId)
                    return notfs.filter(notf=>notf['competitionId']===this.competitionId);
                else
                    return notfs;
            });
        this.ilbColumns = [{
            id: 'handicap', name:'Handicap'
        },{
            id:'team', name:'Team'
        },{
            id:'on', name:'On'
        },{
            id: 'thru', name: 'Thru'
        }, {
            id: 'ocb', name: 'OCB'
        }];
        this.tlbColumns = [{
            id:'rounds', name:'Rounds'
        },{
            id: 'total', name: 'Total'
        }, {
            id: 'ocb', name: 'OCB'
        }];
        this.restorePreference();
    }

    ngOnInit() {
        this.paramSubscription = this.activatedRoute.params.subscribe(params => {
            if (params['competitionId']) {
                this.competitionId = +params['competitionId'];
                this._refreshComp();
            }
        });
    }
    enterFullScreen(){
        if(this.byTeam){
            let i = this.teamSection.nativeElement;
            if (i.requestFullscreen) {
                i.requestFullscreen();
            } else if (i.webkitRequestFullscreen) {
                i.webkitRequestFullscreen();
            } else if (i.mozRequestFullScreen) {
                i.mozRequestFullScreen();
            } else if (i.msRequestFullscreen) {
                i.msRequestFullscreen();
            }
        }
        else {
            this.individualLeaderboard.enterFullScreen();
        }
    }
    ngOnDestroy(): void {
        if (this.paramSubscription) {
            this.paramSubscription.unsubscribe();
            this.paramSubscription = null;
        }
    }
    isColumnHidden(columnId: string) {
        if(this.tlbVisibility)
            return this.tlbVisibility[columnId];
        else return false;
    }
    private _refreshComp() {

        let sub1 = this.compService.getCompetitionInfo(this.competitionId)
            .subscribe(comp => {
                this.competition = comp;
                if (this.competition.teamEvent) {
                    this.compService.getCompetitionTeams(this.competitionId)
                        .subscribe(teams => {
                            this.competitionTeams = teams;
                        });
                }
            }, error => {
                let msg = Util.getErrorMessage(error, 'Error getting competition information');
                this.messageActions.errorGrowl(msg);
            });
        let sub2 = this.compService.getCompetitionDetails(this.competitionId)
            .subscribe(det => {
                this.competitionDetails = det;
                this.rounds             = this.competitionDetails.gameRounds.filter(gr => {
                    return gr.status !== 'Pending';
                });
                this.refreshLeaderBoard();
            }, (error) => {
                let msg = Util.getErrorMessage(error, 'Error getting competition details');
                this.messageActions.errorGrowl(msg);
            });
        this.addToBusyList([sub1, sub2]);
    }
    nextPage(data){
        this.totalPages = data.totalPages;
        this.currentPage = data.currentPage;
        this.teamScoreDisplay = this.processedTeamScores.slice(data.startIndex,data.endIndex);
    }
    onTeamLeaderboardSettingsChange(settings: LeaderboardSettings) {
        this.teamLeaderboardSettings = settings;
        // this.userPreference.setInSession("TeamLeaderBoard.teamLeaderboardSettings", settings);
        this.saveSettings();
    }
    columnVisibilityChanged(hiddenColumns: TableColumnDetails[]) {
        let columnVisibility = {};
        hiddenColumns.map(col=>{
            if(col.hidden)
                columnVisibility[col.id] = col.hidden;
        });
        setTimeout(()=>{
            if(this.byTeam){
                this.tlbVisibility = columnVisibility;
                this.tlbColumns.forEach(det=>{
                    det.hidden = this.tlbVisibility[det.id];
                });
            }
            else {
                this.ilbVisibility = columnVisibility;
                this.ilbColumns.forEach(det=>{
                    det.hidden = this.ilbVisibility[det.id];
                });
            }
            this.saveSettings();
        }, 100);
    }
    onInvidualLbSettingsChange($event){
        this.saveSettings();
    }
    onToggleShowSettings() {
        this.showSettings = !this.showSettings;
        this.saveSettings();
    }
    onLeaderboardTypeChange() {
        this.saveSettings();
        this.refreshLeaderBoard();
    }
    refresh(refreshParams) {
        this.refreshParams = this.refreshParams;
        this.refreshLeaderBoard();
    }
    isGrossDisplay() {
        if(this.settingsComp)
            return this.settingsComp.settings.teamsByGrossOrNet==='gross';
        else return true;
    }
    refreshLeaderBoard() {
        if(this.byTeam){
            let sub =  this.compService.getTeamEventScores(this.competitionId,
                    this.settingsComp.settings.teamsByGrossOrNet==='net'?'n':'g')
                           .subscribe(teamScores => {
                               this.teamScores = teamScores;
                               this.processTeamScores();
                               this.settingsComp.dataRefreshed(this.processedTeamScores.length)
                           });
            this.addToBusyList([sub]);
        }
        else {
            this.individualLeaderboard.refreshLeaderBoard();
        }

    }
    getRowClass(row: any) {
        if(row.topNToPar < 0) {
            return "under-par";
        }
        else if(row.topNToPar > 0)
            return 'over-par';
        else return 'on-par';
    }
    private processTeamScores() {
        let display = [];
        this.teamScores.forEach(ts => {
            let team: any           = {};
            team.teamScores         = ts;
            team.teamId             = ts.teamId;
            team.teamName           = ts.teamName;
            team.status             = ts.status;
            team.logo               = ts.teamLogo;
            team.position           = ts.position;
            team.topNToPar          = ts.topNToPar;
            team.toPar              = ts.toPar;
            team.topNToParNet       = ts.topNToParNet;
            team.toParNet           = ts.toParNet;
            team.totalGross         = ts.totalGross;
            team.totalNet           = ts.totalNet;
            team.topNTotalGross     = ts.topNTotalGross;
            team.topNTotalNet       = ts.topNTotalNet;
            team.playerOveralTotals = ts.playerOveralTotals;
            team.roundScores        = ts.roundScores;
            team.ocb =ts.ocb;
            team.ocbNet = ts.ocbNet;
            ts.roundScores.forEach(round => {
                let prefix                       = 'R' + round.roundNumber;
                team[prefix + '_topNToPar']      = round.topNToPar;
                team[prefix + '_topNToParNet']   = round.topNToParNet;
                team[prefix + '_toPar']          = round.toPar;
                team[prefix + '_toParNet']       = round.toParNet;
                team[prefix + '_totalGross']     = round.totalGross;
                team[prefix + '_totalNet']       = round.totalNet;
                team[prefix + '_topNTotalGross'] = round.topNTotalGross;
                team[prefix + '_topNTotalNet']   = round.topNTotalNet;
            });
            display.push(team);
        });
        this.processedTeamScores = display;
        // this.teamScoreDisplay = display;
    }
    addToBusyList(sub: Subscription[]) {
        this.busyConfig.busy = this.busyConfig.busy.filter(s=>!s.closed);
        // this.refreshSubList.splice(0, this.refreshSubList.length);
        this.busyConfig.busy.push(...sub);
    }
    expandRow(team: any) {
        this.leaderboard.toggleRow(team);
    }
    saveSettings(){
        let settings = {
            tlbSettings: this.teamLeaderboardSettings,
            ilbSettings: this.individualLeaderboardSettings,
            ilbVisibility: this.ilbVisibility,
            tlbVisibility: this.tlbVisibility,
            byIndividual: !this.byTeam,
            showSettings: this.showSettings
        }
        this.userPreference.setInSession("TeamLeaderboard.settings", settings);
    }
    private restorePreference(){
        let settings = this.userPreference.getFromSession("TeamLeaderboard.settings");
        if(settings){
            if(settings.tlbSettings)
                this.teamLeaderboardSettings = settings.tlbSettings;
            if(settings.ilbSettings) this.individualLeaderboardSettings = settings.ilbSettings;
            if(settings.ilbVisibility) this.ilbVisibility = settings.ilbVisibility;
            if(settings.tlbVisibility) this.tlbVisibility = settings.tlbVisibility;
            this.byTeam = !settings.byIndividual;
            this.showSettings = settings.showSettings;
            this.applyHiddenColumns();
        }

    }
    private applyHiddenColumns(){
        let columns = [];

        this.tlbColumns.forEach(det=>{
            det.hidden = this.tlbVisibility[det.id];
            columns.push(det);
        });
        this.tlbColumns = columns;
        columns = [];
        this.ilbColumns.forEach(det=>{
            det.hidden = this.ilbVisibility[det.id];
            columns.push(det);
        });
        this.ilbColumns = columns;
    }
}
