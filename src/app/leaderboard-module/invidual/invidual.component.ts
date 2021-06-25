import {DOCUMENT} from '@angular/common';
import {Component, ElementRef, Inject, Input, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {ColumnsHidden, TableColumnDetails} from '../../component-module/leaderboard-settings/column-visibility';
import {
    DefaultLeaderboardSettings,
    LeaderboardSettings
} from '../../component-module/leaderboard-settings/leaderboard-settings';
import {LeaderboardRefreshParams} from '../../component-module/leaderboard-settings/leaderboard-settings.component';
import {
    Competition,
    CompetitionDetails,
    CompetitionGameRound,
    LeaderBoard,
    LeaderBoardPlayer,
    Team
} from '../../models/mygolf/competition';
import {NotificationService} from '../../redux/notifications/notification-service';
import {CompetitionService} from '../../services/competition.service';
import {UserPreferenceService} from '../../services/user-preference.service';

@Component({
    selector   : 'app-player-leaderboard',
    templateUrl: './invidual.component.html',
    styleUrls  : ['./invidual.component.scss']
})
export class InvidualComponent implements OnInit {
    @Input() competitionId: number;
    @Input() embedded: boolean                     = false;
    @Input() showSettings: boolean                 = true;
    @Input() paused: boolean                       = false;
    @Input() settings: LeaderboardSettings         = DefaultLeaderboardSettings;
    @Input() hiddenColumns: ColumnsHidden          = {};
    @Input() competition: Competition;
    @Input() compDetails: CompetitionDetails;
    @Input() refreshParams: LeaderboardRefreshParams;
             fullScreen: boolean                   = false;
             colorSet: string                      = 'amateur';
             showByCategory: boolean               = false;
              @Input() teams: Team [];
             leaderBoard: LeaderBoard;
             playersToDisplay: LeaderBoardPlayer[] = [];
             totalPlayers: number                  = 0;
             totalPages: number                    = 0;
             currentPage: number                   = 1;
             pauseScroll: boolean                  = false;
             playerRowExpanded: LeaderBoardPlayer;
             refreshSubList: Subscription[]        = [];
             busyConfig: any                       = {
                 busy: []
             };
    private currentScrollTop: number;
             leaderboardColumns: TableColumnDetails[];
             visibilityDialog: boolean;
    @ViewChild('leaderboardSection') leaderboardSection: ElementRef;

    constructor(private router: Router,
        private activeRoute: ActivatedRoute,
        private userPreference: UserPreferenceService,
        private notfService: NotificationService,
        private competitionService: CompetitionService,
        @Inject(DOCUMENT) private document: Document) {
        this.settings           = DefaultLeaderboardSettings;
        this.leaderboardColumns = [{
            id: 'handicap', name: 'Handicap'
        }, {
            id: 'on', name: 'On'
        }, {
            id: 'thru', name: 'Thru'
        }, {
            id: 'ocb', name: 'OCB'
        }];
    }

    ngOnInit() {
        if (!this.embedded) {
            this.restorePreferences();
        }
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.hiddenColumns) {
            this.applyHiddenColumns();
        } else if (changes.refreshParams) {
            this.refreshLeaderBoard();
        } else if(changes.competition) {
          this.competitionChanged();
        }
    }

    ngOnDestroy(): void {
    }

    ngAfterViewInit(): void {
        if (this.competition) {
            this.refreshLeaderBoard();
        }
    }

    enterFullScreen() {
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

    nextPage(data) {
        this.playersToDisplay = this.leaderBoard.players.slice(data.startIndex, data.endIndex);
        this.currentPage      = data.currentPage;
    }

    refresh(params: LeaderboardRefreshParams) {
        this.refreshParams = params;
        this.refreshLeaderBoard();
    }

    showAutoScrollDetail() {
        return !this.showSettings;
        // (this.settings && this.settings.autoScroll
        //    && (this.settings.scrollRounds
        //        || this.settings.scrollCategories
        //    || this.settings.scrollScoreTypes)) &&
    }

    private competitionChanged() {
        // if (this.competition.teamEvent) {
        //     this.competitionService.getCompetitionTeams(this.competition.competitionId)
        //         .subscribe(compTeams => {
        //             this.teams = compTeams.competitionTeams;
        //             this.derivePlayerTeams();
        //             this.refreshLeaderBoard();
        //         });
        // }
        // if (this.competitionId >= 0) {
        //     let sub1 = this.competitionService.getCompetitionInfo(this.competitionId)
        //                    .subscribe((comp: Competition) => {
        //                        this.competition = comp;
        //                    });
        //     let sub2 = this.competitionService.getCompetitionDetails(this.competitionId)
        //                    .subscribe((det: CompetitionDetails) => {
        //                        this.compDetails = det;
        //                    });
        //     this.addToBusyList([sub1, sub2]);
        // }
    }

    onPlayerRowExpand(event) {
        this.playerRowExpanded = event.data;
        if (this.playerRowExpanded) {
            this.pauseScroll = true;
            if (!this.playerRowExpanded.rounds) {
                let sub = this.competitionService.getAllScoresForPlayer(this.competitionId,
                    this.playerRowExpanded.playerId)
                              .subscribe((compRounds: CompetitionGameRound[]) => {
                                  this.playerRowExpanded.rounds = compRounds;
                                  // this.prepareScorecardDisplay();
                              });
                this.addToBusyList([sub]);
            }
        }
    }

    onPlayerRowCollapsed(event) {
        this.pauseScroll       = false;
        this.playerRowExpanded = null;
    }

    refreshLeaderBoard() {
        if (this.refreshParams) {
            let round     = this.refreshParams['round'];
            let category  = this.refreshParams['category'];
            let scoreType = this.refreshParams['scoreType'];
            let orderBy   = 2;
            if (scoreType === 'net') {
                let scoringFormat = (this.competition && this.competition.scoringFormat)
                    ? this.competition.scoringFormat.toLowerCase()
                    : "strokeplay";
                switch (scoringFormat) {
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
                round && round.roundNo ? round.roundNo : null,
                category && category.categoryId !== -1 ? category.categoryId : null,
                orderBy,
                false)
                          .subscribe((leaderboard: LeaderBoard) => {
                              this.leaderBoard      = leaderboard;
                              this.totalPlayers     = this.leaderBoard.players.length;
                              this.playersToDisplay = [];
                              this.derivePlayerTeams();
                              // this.leaderBoardSettings.dataRefreshed(this.totalPlayers);
                          });
        }
    }

    isColumnHidden(columnId: string) {
        return this.hiddenColumns[columnId];
    }

    isGrossHidden() {
        if (!this.settings) return false;
        if (this.settings.autoScroll && this.settings.scrollScoreTypes
            && this.refreshParams) {
            return (this.refreshParams.scoreType === 'net' && this.settings.hideGrossColumns)
        } else {
            return this.settings.scoreType === 'net'
                && this.settings.hideGrossColumns;
        }
    }

    isNetHidden() {
        if (!this.settings) return true;
        if (this.settings.autoScroll && this.settings.scrollScoreTypes
            && this.refreshParams) {
            return (this.refreshParams.scoreType === 'gross' && this.settings.hideNetColumns);
        } else {
            return this.settings.scoreType === 'gross'
                && this.settings.hideNetColumns;
        }
    }

    private prepareScorecardDisplay() {
        let rows: any [] = [];
        this.playerRowExpanded.rounds.forEach(round => {
            let parRow: any       = {};
            parRow['round']       = round.roundNo;
            parRow['rowType']     = 'Par';
            parRow['courseNames'] = round.courseNames;
            parRow['outTotal']    = null;
            parRow['inTotal']     = null;
            round.nines.forEach(nine => {
                nine.scores.forEach(score => {
                    parRow["g" + score.holeNo] = score.parScore;
                    parRow["n" + score.holeNo] = score.parScore;
                });
            });
            rows.push(parRow);
            let idxRow: any       = {};
            idxRow['round']       = round.roundNo;
            idxRow['rowType']     = 'Index';
            idxRow['courseNames'] = round.courseNames;
            idxRow['outTotal']    = null;
            idxRow['inTotal']     = null;
            round.nines.forEach(nine => {
                nine.scores.forEach(score => {
                    idxRow["g" + score.holeNo] = score.index;
                    idxRow["n" + score.holeNo] = score.index;
                });
            });
            rows.push(idxRow);
            let scoreRow: any       = {};
            scoreRow['round']       = round.roundNo;
            scoreRow['rowType']     = 'Gross';
            scoreRow['courseNames'] = round.courseNames;
            scoreRow['outTotal']    = round.outTotal;
            scoreRow['inTotal']     = round.inTotal;
            round.nines.forEach(nine => {
                nine.scores.forEach(score => {
                    scoreRow["g" + score.holeNo] = score.grossScore;
                    scoreRow["n" + score.holeNo] = score.netScore;
                });
            });
            rows.push(scoreRow);
        });
        this.playerRowExpanded.scores = rows;
    }

    columnVisibilityChanged(hiddenColumns: TableColumnDetails[]) {
        this.visibilityDialog = false;
        let columnVisibility  = {};
        hiddenColumns.map(col => {
            if (col.hidden) {
                columnVisibility[col.id] = col.hidden;
            }
        });
        setTimeout(() => {
            this.hiddenColumns = columnVisibility;
            this.leaderboardColumns.forEach(det => {
                det.hidden = this.hiddenColumns[det.id];
            });
            if (!this.embedded) {
                this.savePreferences();
            }
            else {
                // this.columnsVisibilityChange.emit(this.hiddenColumns);
            }
        }, 100);
    }

    addToBusyList(sub: Subscription[]) {
        this.busyConfig.busy = this.refreshSubList.filter(s => !s.closed);
        // this.refreshSubList.splice(0, this.refreshSubList.length);
        this.busyConfig.busy.push(...sub);
    }

    private savePreferences() {
        this.userPreference.setInSession("Leaderboard.settings", {
            lbSettings   : this.settings,
            hiddenColumns: this.hiddenColumns,
            showSettings : this.showSettings
        });
    }

    private restorePreferences() {
        let val = this.userPreference.getFromSession("Leaderboard.settings");
        if (val) {
            if (val.lbSettings) this.settings = val.lbSettings;
            this.showSettings = val.showSettings;
            if (val.hiddenColumns) {
                this.hiddenColumns = val.hiddenColumns;
                this.applyHiddenColumns();
            }
        }
    }

    private applyHiddenColumns() {
        let columns = [];
        this.leaderboardColumns.forEach(det => {
            det.hidden = this.hiddenColumns[det.id];
            columns.push(det);
        });
        this.leaderboardColumns = columns;
    }

    private derivePlayerTeams() {
        if (this.teams && this.leaderBoard) {
            this.teams.forEach(team => {
                team.teamPlayers.forEach(tp => {
                    let players: LeaderBoardPlayer[] = this.leaderBoard.players.filter(pl => {
                        return pl.playerId === tp.teamPlayerId;
                    });
                    if (players && players.length) {
                        players.forEach(pl => {
                            pl['teamName'] = team.teamName;
                            pl['teamLogo'] = team.teamLogo;
                        })
                    }
                })
            })
        }
    }
}
