import {
    Component,
    OnInit,
    Input,
    ViewEncapsulation,
    Inject,
    OnDestroy,
    ViewChild,
    AfterViewInit,
    OnChanges,
    SimpleChanges,
    Output,
    EventEmitter, ElementRef
} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {DOCUMENT} from '@angular/common';
import {LeaderBoard} from '../../models/mygolf/competition/leaderboard';
import {LeaderBoardPlayer} from '../../models/mygolf/competition/leaderboard-player';
import {Competition} from '../../models/mygolf/competition/competition';
import {CompetitionDetails} from '../../models/mygolf/competition/competition-details';
import {CompetitionService} from '../../services/competition.service';
import {CompetitionGameRound} from '../../models/mygolf/competition/competition-game-round';
import {
    LeaderboardSettingsComponent,
    LeaderboardRefreshParams
} from '../leaderboard-settings/leaderboard-settings.component';
import {LeaderboardSettings, DefaultLeaderboardSettings} from '../leaderboard-settings/leaderboard-settings';
import {UserPreferenceService} from '../../services/user-preference.service';

import {Team} from '../../models/mygolf/competition/team';
import {ColumnsHidden, TableColumnDetails} from '../leaderboard-settings/column-visibility';
import {Observable} from 'rxjs/Observable';
import {ScoringNotification} from '../../models/session/user-notifications';
import {NotificationService} from '../../redux/notifications/notification-service';


@Component({
    selector   : 'competition-leaderboard',
    templateUrl: './competition-leaderboard.component.html',
    styleUrls  : ['./competition-leaderboard.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class CompetitionLeaderboardComponent implements OnInit,OnChanges, OnDestroy, AfterViewInit {
    @Input() competitionId: number;
    @Input() embedded: boolean = false;
    @Input() showSettings: boolean = true;
    @Input() paused: boolean = false;
    @Input() settings: LeaderboardSettings = DefaultLeaderboardSettings;
    @Input() hiddenColumns: ColumnsHidden = {};
    @Output() leaderboardSettingsChange: EventEmitter<LeaderboardSettings> = new EventEmitter();
    @Output() columnsVisibilityChange: EventEmitter<ColumnsHidden> = new EventEmitter();
    fullScreen: boolean = false;
    colorSet: string = 'amateur';
    showByCategory: boolean = false;
    competition: Competition;
    compDetails: CompetitionDetails;
    teams: Team [];
    leaderBoard: LeaderBoard;
    playersToDisplay: LeaderBoardPlayer[] = [];
    totalPlayers: number = 0;
    totalPages: number = 0;
    currentPage: number = 1;
    pauseScroll: boolean = false;
    playerRowExpanded: LeaderBoardPlayer;

    refreshSubList: Subscription[] = [];
    busyConfig: any = {
        busy: []
    };
    private paramSubscription: Subscription;
    refreshParams:  LeaderboardRefreshParams;
    private currentScrollTop: number;
    scoringNotifications: Observable<ScoringNotification[]>;
    leaderboardColumns: TableColumnDetails[];
    @ViewChild('settingsComp') leaderBoardSettings: LeaderboardSettingsComponent;

    visibilityDialog: boolean;
    @ViewChild('leaderboardSection') leaderboardSection: ElementRef;
    constructor(private router: Router,
        private activeRoute: ActivatedRoute,
        private userPreference: UserPreferenceService,
        private notfService: NotificationService,
        private competitionService: CompetitionService,
        @Inject(DOCUMENT) private document: Document) {
        this.settings = DefaultLeaderboardSettings;
        this.scoringNotifications = this.notfService.scoringNotifications()
                                        .map( (notfs: ScoringNotification[])=>{
                                            if(this.competitionId)
                                                return notfs.filter(notf=>notf['competitionId']===this.competitionId);
                                            else
                                                return notfs;
                                        });
        this.leaderboardColumns = [{
            id: 'handicap', name:'Handicap'
        },{
            id:'on', name:'On'
        },{
            id: 'thru', name: 'Thru'
        }, {
            id: 'ocb', name: 'OCB'
        }];

    }

    ngOnInit() {
        if(!this.embedded) {
            this.restorePreferences();
        }
    }

    ngOnChanges(changes: SimpleChanges): void {
        if(changes.competitionId) {
            this.refreshCompInfo();
        } else if(changes.hiddenColumns) {
            this.applyHiddenColumns();
        }
    }

    ngOnDestroy(): void {
        if(this.paramSubscription) this.paramSubscription.unsubscribe();

    }

    ngAfterViewInit(): void {
        this.paramSubscription =  this.activeRoute.params.subscribe(params=>{
            if(params['competitionId'])
                this.competitionId = +params['competitionId'];
            this.refreshCompInfo();
        });

    }
    enterFullScreen(){
        let i = this.leaderboardSection.nativeElement;
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
    onLeaderboardSettingsChange(settings: LeaderboardSettings) {
        // this.settings = settings;
        if(this.embedded){
            this.leaderboardSettingsChange.emit(this.settings);
        }
        else {
            this.savePreferences();
        }
    }
    onToggleShowSettings(){
        this.showSettings = !this.showSettings;
        this.savePreferences();
    }
    nextPage(data){
        this.playersToDisplay = this.leaderBoard.players.slice(data.startIndex, data.endIndex);
        this.currentPage = data.currentPage;
    }
    refresh(params: LeaderboardRefreshParams) {
        this.refreshParams = params;
        this.refreshLeaderBoard();
    }
    showAutoScrollDetail() {
        return !this.showSettings ;
         // (this.settings && this.settings.autoScroll
         //    && (this.settings.scrollRounds
         //        || this.settings.scrollCategories
         //    || this.settings.scrollScoreTypes)) &&

    }
    private refreshCompInfo() {
        if(this.competitionId >=0){
            let sub1 = this.competitionService.getCompetitionInfo(this.competitionId)
                .subscribe((comp: Competition)=>{
                    this.competition = comp;
                    if(comp.teamEvent){
                        this.competitionService.getCompetitionTeams(this.competitionId)
                            .subscribe(compTeams=>{
                                this.teams = compTeams.competitionTeams;
                                this.derivePlayerTeams();
                            });
                    }
                });
            let sub2 = this.competitionService.getCompetitionDetails(this.competitionId)
                .subscribe((det: CompetitionDetails)=>{
                    this.compDetails = det;

                    this.refreshLeaderBoard();
                });
            this.addToBusyList([sub1, sub2]);
        }
    }

    onPlayerRowExpand(event){
        this.playerRowExpanded = event.data;
        if(this.playerRowExpanded){
            this.pauseScroll = true;
            if(!this.playerRowExpanded.rounds) {
                let sub = this.competitionService.getAllScoresForPlayer(this.competitionId,
                    this.playerRowExpanded.playerId)
                    .subscribe((compRounds: CompetitionGameRound[])=>{
                        this.playerRowExpanded.rounds = compRounds;
                        // this.prepareScorecardDisplay();
                    });
                this.addToBusyList([sub]);
            }
        }
    }
    onPlayerRowCollapsed(event) {
        this.pauseScroll = false;
        this.playerRowExpanded = null;
    }
    refreshLeaderBoard() {
        if(this.refreshParams) {
            let round = this.refreshParams['round'];
            let category = this.refreshParams['category'];
            let scoreType = this.refreshParams['scoreType'];
            let orderBy = 2;
            if(scoreType === 'net'){
                let scoringFormat = (this.competition && this.competition.scoringFormat)
                    ?this.competition.scoringFormat.toLowerCase()
                    :"strokeplay";
                switch(scoringFormat){
                    case 'strokeplay':
                    case 'system36':
                        orderBy = 3;
                        break;
                    case 'stableford':
                        orderBy = 4;
                        break;
                    default:
                        orderBy = 3;
                }
            }


            let sub = this.competitionService.getLeaderboard(this.competitionId,
                round && round.roundNo?round.roundNo:null,
                category && category.categoryId !==-1?category.categoryId:null,
                orderBy,
                false)
                          .subscribe((leaderboard: LeaderBoard)=>{
                              this.leaderBoard = leaderboard;
                              this.totalPlayers = this.leaderBoard.players.length;
                              this.playersToDisplay = [];
                              this.derivePlayerTeams();
                              this.leaderBoardSettings.dataRefreshed(this.totalPlayers);
                          });
        }

    }
    isColumnHidden(columnId: string) {
        return this.hiddenColumns[columnId];
    }
    isGrossHidden(){
        if(!this.settings) return false;
        if(this.settings.autoScroll && this.settings.scrollScoreTypes
                && this.refreshParams)
            return (this.refreshParams.scoreType==='net' && this.settings.hideGrossColumns)
        else return this.settings.scoreType === 'net'
            && this.settings.hideGrossColumns;
    }
    isNetHidden() {
        if(!this.settings) return true;
        if(this.settings.autoScroll && this.settings.scrollScoreTypes
            && this.refreshParams)
            return (this.refreshParams.scoreType==='gross' && this.settings.hideNetColumns);

        else return this.settings.scoreType === 'gross'
            && this.settings.hideNetColumns;
    }
    private prepareScorecardDisplay(){
        let rows: any [] = [];
        this.playerRowExpanded.rounds.forEach(round=>{
            let parRow: any = {};
            parRow['round'] = round.roundNo;
            parRow['rowType'] = 'Par';
            parRow['courseNames'] = round.courseNames;
            parRow['outTotal'] = null;
            parRow['inTotal'] = null;
            round.nines.forEach(nine=>{
                nine.scores.forEach(score=>{
                    parRow["g"+score.holeNo] = score.parScore;
                    parRow["n"+score.holeNo] = score.parScore;
                });
            });
            rows.push(parRow);

            let idxRow: any = {};
            idxRow['round'] = round.roundNo;
            idxRow['rowType'] = 'Index';
            idxRow['courseNames'] = round.courseNames;
            idxRow['outTotal'] = null;
            idxRow['inTotal'] = null;
            round.nines.forEach(nine=>{
                nine.scores.forEach(score=>{
                    idxRow["g"+score.holeNo] = score.index;
                    idxRow["n"+score.holeNo] = score.index;
                });
            });
            rows.push(idxRow);

            let scoreRow: any = {};
            scoreRow['round'] = round.roundNo;
            scoreRow['rowType'] = 'Gross';
            scoreRow['courseNames'] = round.courseNames;
            scoreRow['outTotal'] = round.outTotal;
            scoreRow['inTotal'] = round.inTotal;
            round.nines.forEach(nine=>{
                nine.scores.forEach(score=>{
                    scoreRow["g"+score.holeNo] = score.grossScore;
                    scoreRow["n"+score.holeNo] = score.netScore;
                });
            });
            rows.push(scoreRow);
        });

        this.playerRowExpanded.scores = rows;
    }
    columnVisibilityChanged(hiddenColumns: TableColumnDetails[]) {
        this.visibilityDialog = false;
        let columnVisibility = {};
        hiddenColumns.map(col=>{
            if(col.hidden)
                columnVisibility[col.id] = col.hidden;
        });
        setTimeout(()=>{
            this.hiddenColumns = columnVisibility;
            this.leaderboardColumns.forEach(det=>{
                det.hidden = this.hiddenColumns[det.id];
            });
            if(!this.embedded) {
                this.savePreferences();
            }
            else {
                this.columnsVisibilityChange.emit(this.hiddenColumns);
            }
        }, 100);

    }
    addToBusyList(sub: Subscription[]) {
        this.busyConfig.busy = this.refreshSubList.filter(s=>!s.closed);
        // this.refreshSubList.splice(0, this.refreshSubList.length);
        this.busyConfig.busy.push(...sub);
    }
    private savePreferences() {
        this.userPreference.setInSession("Leaderboard.settings", {
            lbSettings:this.settings,
            hiddenColumns: this.hiddenColumns,
            showSettings: this.showSettings
        });
    }
    private restorePreferences() {
        let val = this.userPreference.getFromSession("Leaderboard.settings");
        if(val) {
            if(val.lbSettings) this.settings = val.lbSettings;
            this.showSettings = val.showSettings;
            if(val.hiddenColumns){
                this.hiddenColumns = val.hiddenColumns;
                this.applyHiddenColumns();
            }
        }
    }
    private applyHiddenColumns(){
        let columns = [];

        this.leaderboardColumns.forEach(det=>{
            det.hidden = this.hiddenColumns[det.id];
            columns.push(det);
        });
        this.leaderboardColumns = columns;
    }
    private derivePlayerTeams() {
        if(this.teams && this.leaderBoard){
            this.teams.forEach(team=>{
                team.teamPlayers.forEach(tp=>{
                    let players: LeaderBoardPlayer[] = this.leaderBoard.players.filter(pl=>{
                        return pl.playerId === tp.teamPlayerId;
                    });
                    if(players && players.length)
                        players.forEach(pl=>{
                            pl['teamName'] = team.teamName;
                            pl['teamLogo'] = team.teamLogo;
                        })
                })
            })
        }
    }
}
