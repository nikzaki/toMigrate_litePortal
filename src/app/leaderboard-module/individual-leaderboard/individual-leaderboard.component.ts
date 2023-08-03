import { Session } from './../../models/session/session';
import { AuthenticationService } from './../../services/authentication.service';
import { PrizeListComponent } from '../../component-module/prize-list/prize-list.component';
import { ConfigurationService } from './../../services/configuration.service';
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
    EventEmitter,
    ElementRef,
    ChangeDetectionStrategy, ChangeDetectorRef
} from '@angular/core';
import {
    Router,
    ActivatedRoute
} from '@angular/router';
import {
    Subscription
} from 'rxjs/Subscription';
import {
    DOCUMENT
} from '@angular/common';
import {
    LeaderBoard
} from '../../models/mygolf/competition/leaderboard';
import {
    LeaderBoardPlayer
} from '../../models/mygolf/competition/leaderboard-player';
import {
    Competition
} from '../../models/mygolf/competition/competition';
import {
    CompetitionDetails
} from '../../models/mygolf/competition/competition-details';
import {
    CompetitionService
} from '../../services/competition.service';
import {
    CompetitionGameRound
} from '../../models/mygolf/competition/competition-game-round';
import {
    LeaderboardSettingsComponent,
    LeaderboardRefreshParams
} from '../../component-module/leaderboard-settings/leaderboard-settings.component';
import {
    LeaderboardSettings,
    DefaultLeaderboardSettings
} from '../../component-module/leaderboard-settings/leaderboard-settings';
import {
    UserPreferenceService
} from '../../services/user-preference.service';

import {
    Team
} from '../../models/mygolf/competition/team';
import {
    ColumnsHidden,
    TableColumnDetails
} from '../../component-module/leaderboard-settings/column-visibility';
import {
    Observable
} from 'rxjs/Observable';
import {
    ScoringNotification
} from '../../models/session/user-notifications';
import {
    NotificationService
} from '../../redux/notifications/notification-service';
import {
    MediaChange,
    ObservableMedia
} from '@angular/flex-layout';
import {
    DateAdapter
} from '@angular/material';

import {GameRound} from '../../models/mygolf/gameround';
import {CompetitionCategory} from '../../models/mygolf/competition/competition-category';
import { FlightInfo, FlightMember } from 'app/models/mygolf.data';

import * as moment from 'moment';


@Component({
    selector: 'individual-leaderboard',
    templateUrl: './individual-leaderboard.component.html',
    styleUrls: ['./individual-leaderboard.component.scss'],
    encapsulation: ViewEncapsulation.None,
    // changeDetection: ChangeDetectionStrategy.OnPush
})
export class IndividualLeaderboardComponent implements OnInit, OnChanges,  AfterViewInit {
    // OnDestroy,

    // private _onDestroy = new Subject<void>();
    private subscriptions: Subscription[] = [];

    @Input() competitionId: number;
    @Input() embedded: boolean = false;
    @Input() showSettings: boolean = false;
    @Input() paused: boolean = false;
    @Input() settings: LeaderboardSettings = DefaultLeaderboardSettings;
    @Input() hiddenColumns: ColumnsHidden = {};
    @Output() leaderboardSettingsChange: EventEmitter < LeaderboardSettings > = new EventEmitter();
    @Output() columnsVisibilityChange: EventEmitter < ColumnsHidden > = new EventEmitter();
    fullScreen: boolean = false;
    colorSet: string = 'amateur';
    showByCategory: boolean = false;
    competition: Competition;
    compDetails: CompetitionDetails;
    teams: Team[];
    leaderBoard: LeaderBoard;
    playersToDisplay: LeaderBoardPlayer[] = [];
    topNplayersDisplay: LeaderBoardPlayer[] = [];
    totalPlayers: number = 0;
    totalPages: number = 0;
    currentPage: number = 1;
    pauseScroll: boolean = false;
    playerRowExpanded: LeaderBoardPlayer;

    display: boolean = false;
    validRounds: GameRound[]           = [];
    validCategories: CompetitionCategory [];

    totalRounds: number = 0;
    nextRound: number = 0;

    url_qrCode: string;

    refreshSubList: Subscription[] = [];
    busyConfig: any = {
        busy: []
    };
    private paramSubscription: Subscription;
    refreshParams: LeaderboardRefreshParams;
    private watcher: Subscription;
    activeMediaQuery = "";
    mobileScreen: boolean;
    mqAlias: string;
    private currentScrollTop: number;
    scoringNotifications: Observable < ScoringNotification[] > ;
    leaderboardColumns: TableColumnDetails[];
    @ViewChild('settingsComp') leaderBoardSettings: LeaderboardSettingsComponent;

    visibilityDialog: boolean;
    @ViewChild('leaderboardSection') leaderboardSection: ElementRef;
    @ViewChild('prizeLists') prizeList: PrizeListComponent;

    hideLogo: boolean = false;
    hideCompName: boolean = false;
    hideCompHeader: boolean = false;
    hideTopBar: boolean = false;
    enableToyota: boolean = false;
    hideCatTabs: boolean = true;
    hidePlayerImage: boolean = false;
    hideAllCategory: boolean = false;
    showPlayerId: boolean = false;
    showCompPlayerId: boolean = false;
    prizeDialog: boolean = false;
    showWinners: boolean = false;
    overrideWinner: boolean = false;
    maxSponsorDisplay: number = 3;
    constructor(router: Router,
        private activeRoute: ActivatedRoute,
        private userPreference: UserPreferenceService,
        private notfService: NotificationService,
        private competitionService: CompetitionService,
        private authService: AuthenticationService,

        @Inject(DOCUMENT) private document: Document,
        private media: ObservableMedia,
        private cdr: ChangeDetectorRef,
        private configService: ConfigurationService,) {
            // router.events.pipe(takeUntil(this._onDestroy)).subscribe(event => {
            //     // do stuff here
    
            // });

        this.settings = DefaultLeaderboardSettings;
        this.watcher = media.subscribe((change: MediaChange) => {
            this.activeMediaQuery = change ? `'${change.mqAlias}' = (${change.mediaQuery})` : "";
            this.mqAlias = change ? change.mqAlias : '';
            if (change && (change.mqAlias === 'xs' || change.mqAlias === 'sm')) {
                this.mobileScreen = true;
            } else {
                this.mobileScreen = false;
            }
        });
        this.scoringNotifications = this.notfService.scoringNotifications()
            .map((notfs: ScoringNotification[]) => {
                if (this.competitionId)
                    return notfs.filter(notf => notf['competitionId'] === this.competitionId);
                else
                    return notfs;
            });
        this.leaderboardColumns = [{
            id: 'handicap',
            name: 'Handicap'
        }, {
            id: 'on',
            name: 'On',
            hidden: true
        }, {
            id: 'thru',
            name: 'Thru'
        }, {
            id: 'ocb',
            name: 'OCB',
            hidden: true
        }, {
            id: 'team',
            name: 'Team',
            hidden: true
        }, {
            id: 'nationality',
            name: 'Nationality',
            hidden: true
        }];


    }

    ngOnInit() {
        this.activeRoute.queryParams
        .subscribe(params => {
            if(params['maxSponsorDisplay'] && params['maxSponsorDisplay'] > 0)
                this.maxSponsorDisplay = params['maxSponsorDisplay'];
            else if(params['maxSponsorDisplay'] && params['maxSponsorDisplay'] === 0)
                this.maxSponsorDisplay = params['maxSponsorDisplay'];
            else this.maxSponsorDisplay = 3;
            if(params['enableToyota'] && params['enableToyota'] === 'true') {
                this.enableToyota = true;
                this.hideLogo = true;
                this.hideCompName = true;
                this.hideCompHeader = true;
                this.hideTopBar = true;
                // this.settings.scrollSize = this.totalPlayers; 
                this.hideCatTabs = false;
                this.hidePlayerImage = true;
                this.hideAllCategory = true;
                this.leaderboardColumns.forEach(det => {
                    if(det.id === 'handicap')
                        det.hidden = true;
                    // if(det.id === 'thru')
                    //     det.hidden = true;
                    // if(det.id === 'on')
                    //     det.hidden = false;
                });
                if(params['overrideWinner'] && params['overrideWinner'] ==='true' && params['secretCode'] && params['secretCode']==='xsoftbritex')
                    this.overrideWinner = true;
                // if(this.validCategories && this.validCategories.length > 0) 
                //     this.settings.selectedCategory = this.validCategories[0].categoryId;
            }
            if(params['showPlayerId'] && params['showPlayerId'] === 'true') {
                this.showPlayerId = true;
            } else if(params['showPlayerId'] && params['showPlayerId'] === 'false') this.showPlayerId = false;
            if(params['showCompPlayerId'] && params['showCompPlayerId'] === 'true') {
                this.showCompPlayerId = true;
            } else if(params['showCompPlayerId'] && params['showCompPlayerId'] === 'false') this.showCompPlayerId = false;
            if(params['hideLogo'] && params['hideLogo'] === 'true')
                this.hideLogo = true;
            else if(params['hideLogo'] && params['hideLogo'] === 'false') this.hideLogo = false;
            if(params['hideCompName'] && params['hideCompName'] === 'true')
                this.hideCompName = true;
            else if(params['hideCompName'] && params['hideCompName'] === 'false') this.hideCompName = false;
            if(params['hideCompHeader'] && params['hideCompHeader'] === 'true')
                this.hideCompHeader = true;
            else if(params['hideCompHeader'] && params['hideCompHeader'] === 'false') this.hideCompHeader = false;
            if(params['hideTopBar'] && params['hideTopBar'] === 'true')
                this.hideTopBar = true;
            else if(params['hideTopBar'] && params['hideTopBar'] === 'false') this.hideTopBar = false;
            if(params['hidePlayerImage'] && params['hidePlayerImage'] === 'true')
                this.hidePlayerImage = true;
            else if(params['hidePlayerImage'] && params['hidePlayerImage'] === 'false') this.hidePlayerImage = false;
            if(params['hideAllCategory'] && params['hideAllCategory'] === 'true')
                this.hideAllCategory = true;
            else if(params['hideAllCategory'] && params['hideAllCategory'] === 'false') this.hideAllCategory = false;
            

          console.log(params); // { orderby: "price" }
        //   this.fullScreen= params.fullScreen;
        //   if(params.fullScreen === 'true' || params.fullScreen) {
        //     this.enterFullScreen()
        //   }

        //   console.log(this.fullScreen); // price
        }
      );
        // console.log('ngOnInit() : ', this.embedded)
        if (!this.embedded) {
            this.restorePreferences();
        }

        this.columnVisibilityChanged(this.leaderboardColumns);
        // this.showSettings = true;
        this.savePreferences();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.competitionId) {
            this.refreshCompInfo();
        } else if (changes.hiddenColumns) {
            this.applyHiddenColumns();
        }
    }

    // ngOnDestroy(): void {
    //     if (this.paramSubscription) this.paramSubscription.unsubscribe();
    //     if (this.watcher) {
    //         this.watcher.unsubscribe();
    //         this.watcher = null;
    //     }

    //     this.busyConfig.forEach(sub => sub.unsubscribe());
    //     this.refreshSubList.forEach(sub2 => sub2.unsubscribe());
    //     this.subscriptions.forEach(sub3 => sub3.unsubscribe());
    //     // this.scoringNotifications.forEach(sub4 => sub4.unsubscribe());

    //     // this._onDestroy.next();
    //     // this._onDestroy.complete();
    // }

    ngAfterViewInit(): void {
        this.paramSubscription = this.activeRoute.params.subscribe(params => {
            if (params['competitionId'])
                this.competitionId = +params['competitionId'];
            this.refreshCompInfo();
            
        });

        // this.cdr.detach();
        // let getInitials = function (string) {
        //     let names = string.split(' '),
        //         initials = names[0].substring(0, 1).toUpperCase();

        //     if (names.length > 1) {
        //         initials += names[names.length - 1].substring(0, 1).toUpperCase();
        //     }
        //     return initials;
        // };

        // console.log(getInitials('FirstName LastName'));
        // console.log(getInitials('FirstName MiddleName LastName'));
        // console.log(getInitials('1stName 2ndName 3rdName 4thName 5thName'));

        // this.columnsVisibilityChange.emit(this.hiddenColumns);

    }
    isMobileScreen() {
        return this.media.isActive('xs') || this.media.isActive('sm');
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
    onLeaderboardSettingsChange(settings: LeaderboardSettings) {
        // console.log('This.settings :', this.settings)
        // console.log('Settings : ', settings)
        // console.log('Embedded? : ', this.embedded)
        // this.settings = settings;
        if (this.embedded) {
            this.leaderboardSettingsChange.emit(this.settings);
        } else {
            this.savePreferences();
        }
    }
    onToggleShowSettings() {
        this.showSettings = !this.showSettings;
        this.savePreferences();
    }
    nextPage(data) {
        // this.topNplayersDisplay = this.leaderBoard.players.slice(0, 3); FOR DISPLAY TOP 3 ONLY
        // console.log('Top N Players : ', this.topNplayersDisplay)
        // this.leaderBoard.players = this.leaderBoard.players.filter(function(ptd) {
        //     return (ptd.position !== 'W' && ptd.position !== 'CUT')
        // })
        let notPlay: number = 0;
        this.playersToDisplay = this.leaderBoard.players.slice(data.startIndex, data.endIndex);
        console.log("Total players : ", this.totalPlayers)
        this.playersToDisplay
        .sort((a,b)=>{
            console.debug("sorting : ",this.compDetails.roundInProgress, a,b)
            
            let _thruTimeA = moment(this.checkThru(a),"HH:mm:ss");
            let _thruTimeB = moment(this.checkThru(b),"HH:mm:ss");
            console.debug("sorting : ",_thruTimeA,_thruTimeA.isValid(), _thruTimeB,_thruTimeB.isValid())
            // if(Number(a.position) < Number(b.position)) return -1; 
            // else if(Number(a.position) > Number(b.position)) return 1;
            // else {
                // if(Number(a.thru) > 0 && Number(b.thru) === 0) return -1;
                // else if(Number(a.thru) === 0 && Number(b.thru) > 0) return 1;
                
                if(this.compDetails.roundInProgress) {
                    if(_thruTimeA.isValid() && !_thruTimeB.isValid()) {
                        return 1
                    } else if(!_thruTimeA.isValid() && _thruTimeB.isValid()) {
                        return -1
                    } else if(_thruTimeA.isValid() && _thruTimeB.isValid()) {
                        if(_thruTimeA.isAfter(_thruTimeB, 'm')) return 1;
                        else if(_thruTimeA.isBefore(_thruTimeB, 'm')) return -1;
                        else {
                            if(Number(this.checkThru(a)) > Number(this.checkThru(b))) return -1;
                            else if(Number(this.checkThru(a)) < Number(this.checkThru(b))) return 1;
                            else {
                                
                                if(Number(a.position) < Number(b.position)) return -1;
                                else if(Number(a.position) > Number(b.position)) return 1;
                                else {
                                if(a.position === 'CUT' && b.position === 'W') {
                                    if(a.round4Gross === 0 && b.round4Gross > 0) return 1;
                                    else if(a.round4Gross > 0 && b.round4Gross === 0) return -1;
                                    else {
                                        if(a.round3Gross === 0 && b.round3Gross > 0) return 1;
                                        else if(a.round3Gross > 0 && b.round3Gross === 0) return -1;
                                        else {
                                            if(a.round2Gross === 0 && b.round2Gross > 0) return 1;
                                            else if(a.round2Gross > 0 && b.round2Gross === 0) return -1;
                                            else {
                                                if(a.round1Gross === 0 && b.round1Gross > 0) return 1;
                                                else if(a.round1Gross > 0 && b.round1Gross === 0) return -1;
                                                else {
                                                    return 0
                                                }
                                            }
                                        }
                                    }
                                } else if(a.position === 'W' && b.position === 'CUT') {
                                    
                                    if(a.round4Gross === 0 && b.round4Gross > 0) return 1;
                                    else if(a.round4Gross > 0 && b.round4Gross === 0) return -1;
                                    else {
                                        if(a.round3Gross === 0 && b.round3Gross > 0) return 1;
                                        else if(a.round3Gross > 0 && b.round3Gross === 0) return -1;
                                        else {
                                            if(a.round2Gross === 0 && b.round2Gross > 0) return 1;
                                            else if(a.round2Gross > 0 && b.round2Gross === 0) return -1;
                                            else {
                                                if(a.round1Gross === 0 && b.round1Gross > 0) return 1;
                                                else if(a.round1Gross > 0 && b.round1Gross === 0) return -1;
                                                else {
                                                    return 0
                                                }
                                            }
                                        }
                                    }
                                }
                                else if(a.position === 'W' && b.position === 'W'){
                                    
                                    if(a.round4Gross === 0 && b.round4Gross > 0) return 1;
                                    else if(a.round4Gross > 0 && b.round4Gross === 0) return -1;
                                    else {
                                        if(a.round3Gross === 0 && b.round3Gross > 0) return 1;
                                        else if(a.round3Gross > 0 && b.round3Gross === 0) return -1;
                                        else {
                                            if(a.round2Gross === 0 && b.round2Gross > 0) return 1;
                                            else if(a.round2Gross > 0 && b.round2Gross === 0) return -1;
                                            else {
                                                if(a.round1Gross === 0 && b.round1Gross > 0) return 1;
                                                else if(a.round1Gross > 0 && b.round1Gross === 0) return -1;
                                                else {
                                                    return 0
                                                }
                                            }
                                        }
                                    }
                                }
                        }
                    }

            }

                     }
                    
                } else {
                    
                            // if(Number(this.checkThru(a)) > Number(this.checkThru(b))) return -1;
                            // else if(Number(this.checkThru(a)) < Number(this.checkThru(b))) return 1;
                            // else {
                                
                                if(Number(a.position) < Number(b.position)) return -1;
                                else if(Number(a.position) > Number(b.position)) return 1;
                                else {
                                if(a.position === 'CUT' && b.position === 'W') {
                                    if(a.round4Gross === 0 && b.round4Gross > 0) return 1;
                                    else if(a.round4Gross > 0 && b.round4Gross === 0) return -1;
                                    else {
                                        if(a.round3Gross === 0 && b.round3Gross > 0) return 1;
                                        else if(a.round3Gross > 0 && b.round3Gross === 0) return -1;
                                        else {
                                            if(a.round2Gross === 0 && b.round2Gross > 0) return 1;
                                            else if(a.round2Gross > 0 && b.round2Gross === 0) return -1;
                                            else {
                                                if(a.round1Gross === 0 && b.round1Gross > 0) return 1;
                                                else if(a.round1Gross > 0 && b.round1Gross === 0) return -1;
                                                else {
                                                    return 0
                                                }
                                            }
                                        }
                                    }
                                } else if(a.position === 'W' && b.position === 'CUT') {
                                    
                                    if(a.round4Gross === 0 && b.round4Gross > 0) return 1;
                                    else if(a.round4Gross > 0 && b.round4Gross === 0) return -1;
                                    else {
                                        if(a.round3Gross === 0 && b.round3Gross > 0) return 1;
                                        else if(a.round3Gross > 0 && b.round3Gross === 0) return -1;
                                        else {
                                            if(a.round2Gross === 0 && b.round2Gross > 0) return 1;
                                            else if(a.round2Gross > 0 && b.round2Gross === 0) return -1;
                                            else {
                                                if(a.round1Gross === 0 && b.round1Gross > 0) return 1;
                                                else if(a.round1Gross > 0 && b.round1Gross === 0) return -1;
                                                else {
                                                    return 0
                                                }
                                            }
                                        }
                                    }
                                }
                                else if(a.position === 'W' && b.position === 'W'){
                                    
                                    if(a.round4Gross === 0 && b.round4Gross > 0) return 1;
                                    else if(a.round4Gross > 0 && b.round4Gross === 0) return -1;
                                    else {
                                        if(a.round3Gross === 0 && b.round3Gross > 0) return 1;
                                        else if(a.round3Gross > 0 && b.round3Gross === 0) return -1;
                                        else {
                                            if(a.round2Gross === 0 && b.round2Gross > 0) return 1;
                                            else if(a.round2Gross > 0 && b.round2Gross === 0) return -1;
                                            else {
                                                if(a.round1Gross === 0 && b.round1Gross > 0) return 1;
                                                else if(a.round1Gross > 0 && b.round1Gross === 0) return -1;
                                                else {
                                                    return 0
                                                }
                                            }
                                        }
                                    }
                                }
                                    }
                }
        })
        this.playersToDisplay.forEach(ptd=>{
            if( ptd.position ==='W' || ptd.position === 'CUT' || ptd.position === 'N' 
            // || ( ptd.round1Gross >= 144)
            //  || ptd.round2Gross >= 180 || ptd.round3Gross >= 180 || ptd.round4Gross >= 180 )

            ) {
        }
        else if (ptd.round1Gross >= 144 || ptd.round2Gross >= 180 || ptd.round3Gross >= 180 || ptd.round4Gross >= 180) {
            notPlay += 1;
        }
        else {
                let pos_:number = Number(ptd.position);
                // if(pos_ > this.totalPlayers) ptd.position = String(pos_ - this.totalPlayers + notPlay);

            // console.log("Position PTD : ",ptd.position, pos_, this.totalPlayers, notPlay);
        }});

        // this.playersToDisplay = this.playersToDisplay.filter(function(hero) {
        //     return (hero.position !== 'W' && hero.position !== 'CUT')
        // })
        // this.playersToDisplay 
        this.currentPage = data.currentPage;
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

    private refreshCompInfo() {
        
    const _portalPath = this.configService.getPortalPath();
        if (this.competitionId >= 0) {
            let sub1 = this.competitionService.getCompetitionInfo(this.competitionId)
                .subscribe((comp: Competition) => {
                    this.competition = comp;
                    this.totalRounds = comp.totalRounds;
                    // if(comp.status.toLowerCase() === 'completed') this.settings.autoScroll = false;
                    if (comp.teamEvent) {
                        this.competitionService.getCompetitionTeams(this.competitionId)
                            .subscribe(compTeams => {
                                this.teams = compTeams.competitionTeams;
                                this.derivePlayerTeams();
                            });
                    }
                    this.url_qrCode = 'https://api.qrserver.com/v1/create-qr-code/?data=' + _portalPath;
                    if (this.competition && this.competition.teamEvent) this.url_qrCode += '/teamleaderboard/' + this.competitionId;
                    else this.url_qrCode += '/leaderboard/' + this.competitionId;
                });
            let sub2 = this.competitionService.getCompetitionDetails(this.competitionId)
                .subscribe((det: CompetitionDetails) => {
                    this.compDetails = det;
                    this.nextRound = det.nextRound;

                    if(this.enableToyota) {

                        this._deriveCategories();
                        this._deriveRounds();
                    } else {

                    this.refreshLeaderBoard();
                    }
                    // console.log("Comp Sponsor : ", this.compDetails);
                });
            this.addToBusyList([sub1, sub2]);

        }
    }

    onPlayerRowExpand(event) {
        // console.log("Event Data : ", event)
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
        this.pauseScroll = false;
        this.playerRowExpanded = null;
    }
    deriveScoringFormat() {
        // console.log("[scoring format] ", this.competition.scoringFormat)
        if(this.competition.scoringFormat === 'Stableford')
            return 'Point'
        else return 'Net'
    }
    isRefreshing: boolean = false;
    refreshLeaderBoard() {
        // if(this.isRefreshing) return;
        this.isRefreshing = true;
        if (this.refreshParams) {
            let round = this.refreshParams['round'];
            let category = this.refreshParams['category'];
            let scoreType = this.refreshParams['scoreType'];
            let orderBy = 2;
            if (scoreType === 'net') {
                let scoringFormat = (this.competition && this.competition.scoringFormat) ?
                    this.competition.scoringFormat.toLowerCase() :
                    "strokeplay";
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


            // if(round !== undefined && round > 0) {
                this.getFlightList();
            // }
            this.leaderBoard = null;
            if(this.enableToyota && category && category.categoryId < 0) {
                return;
            }
            let sub = this.competitionService.getLeaderboard(this.competitionId,
                    round && round.roundNo ? round.roundNo : null,
                    category && category.categoryId !== -1 ? category.categoryId : null,
                    orderBy,
                    false)
                .subscribe((leaderboard: LeaderBoard) => {
                    if(leaderboard) this.isRefreshing = false;
                    this.leaderBoard = leaderboard;
                    // this.leaderBoard.players = this.leaderBoard.players
                    // // .filter((lbp: LeaderBoardPlayer)=>{
                    // //     return lbp.position === 'W'
                    // // })
                    // .sort((a,b)=>{
                    //     console.debug("sorting : ",this.compDetails.roundInProgress, a,b)
                    //     if(a.position === 'CUT' && b.position === 'W') {
                    //         if(a.round4Gross === 0 && b.round4Gross > 0) return 1;
                    //         else if(a.round4Gross > 0 && b.round4Gross === 0) return -1;
                    //         else {
                    //             if(a.round3Gross === 0 && b.round3Gross > 0) return 1;
                    //             else if(a.round3Gross > 0 && b.round3Gross === 0) return -1;
                    //             else {
                    //                 if(a.round2Gross === 0 && b.round2Gross > 0) return 1;
                    //                 else if(a.round2Gross > 0 && b.round2Gross === 0) return -1;
                    //                 else {
                    //                     if(a.round1Gross === 0 && b.round1Gross > 0) return 1;
                    //                     else if(a.round1Gross > 0 && b.round1Gross === 0) return -1;
                    //                     else {
                    //                         return 0
                    //                     }
                    //                 }
                    //             }
                    //         }
                    //         // if (this.compDetails.roundInProgress === 4) {
                    //         //     if(a.round3Gross === 0 && b.round3Gross > 0) return 1
                    //         //     else if(a.round3Gross > 0 && b.round3Gross === 0) return -1
                    //         //     else return 0
                    //         // } else if(this.compDetails.roundInProgress === 3) {
                    //         //     if(a.round2Gross === 0 && b.round2Gross > 0) return 1
                    //         //     else if(a.round2Gross > 0 && b.round2Gross === 0) return -1
                    //         //     else return 0
                    //         // } else if(this.compDetails.roundInProgress === 2) {
                    //         //     if(a.round1Gross === 0 && b.round1Gross > 0) return 1
                    //         //     else if(a.round1Gross > 0 && b.round1Gross === 0) return -1
                    //         //     else return 0
                    //         // }
                    //     }
                    //     else if(a.position === 'W' && b.position === 'W'){
                            
                    //         if(a.round4Gross === 0 && b.round4Gross > 0) return 1;
                    //         else if(a.round4Gross > 0 && b.round4Gross === 0) return -1;
                    //         else {
                    //             if(a.round3Gross === 0 && b.round3Gross > 0) return 1;
                    //             else if(a.round3Gross > 0 && b.round3Gross === 0) return -1;
                    //             else {
                    //                 if(a.round2Gross === 0 && b.round2Gross > 0) return 1;
                    //                 else if(a.round2Gross > 0 && b.round2Gross === 0) return -1;
                    //                 else {
                    //                     if(a.round1Gross === 0 && b.round1Gross > 0) return 1;
                    //                     else if(a.round1Gross > 0 && b.round1Gross === 0) return -1;
                    //                     else {
                    //                         return 0
                    //                     }
                    //                 }
                    //             }
                    //         }
                    //         // if (this.compDetails.roundInProgress === 4) {
                    //         //     if(a.round3Gross === 0 && b.round3Gross > 0) return 1
                    //         //     else if(a.round3Gross > 0 && b.round3Gross === 0) return -1
                    //         //     else return 0
                    //         // } else if(this.compDetails.roundInProgress === 3) {
                    //         //     if(a.round2Gross === 0 && b.round2Gross > 0) return 1
                    //         //     else if(a.round2Gross > 0 && b.round2Gross === 0) return -1
                    //         //     else return 0
                    //         // } else if(this.compDetails.roundInProgress === 2) {
                    //         //     if(a.round1Gross === 0 && b.round1Gross > 0) return 1
                    //         //     else if(a.round1Gross > 0 && b.round1Gross === 0) return -1
                    //         //     else {
                    //         //         if(a.round4Gross === 0 && b.round4Gross > 0) return 1;
                    //         //         else if(a.round4Gross > 0 && b.round4Gross === 0) return -1;
                    //         //         else {
                    //         //             if(a.round3Gross === 0 && b.round3Gross > 0) return 1;
                    //         //             else if(a.round3Gross > 0 && b.round3Gross === 0) return -1;
                    //         //             else {
                    //         //                 if(a.round2Gross === 0 && b.round2Gross > 0) return 1;
                    //         //                 else if(a.round2Gross > 0 && b.round2Gross === 0) return -1;
                    //         //                 else {
                    //         //                     if(a.round1Gross === 0 && b.round1Gross > 0) return 1;
                    //         //                     else if(a.round1Gross > 0 && b.round1Gross === 0) return -1;
                    //         //                     else {
                    //         //                         return 0
                    //         //                     }
                    //         //                 }
                    //         //             }
                    //         //         }
                    //         //     }
                    //         // }
                    //     }
                    // })
                    /* NOT SHOWING WITHDRAW OR CUT PLAYERS HERE */
                    if (!this.settings.showNonPlaying){
                        this.leaderBoard.players = this.leaderBoard.players.filter(function (ptd) {
                            return (ptd.position !== 'W' && ptd.position !== 'CUT' && ptd.position !== 'N' 
                            && ( ptd.round1Gross < 144 && ptd.round2Gross < 180 && ptd.round3Gross < 180 && ptd.round4Gross < 180 )
                            // ptd.outTotalGross >= 144
                            
                            )
                        });
                        this.totalPlayers = this.leaderBoard.players.length;
                        this.activeRoute.queryParams
                        .subscribe(params => {
                            if(params['enableToyota'] && params['enableToyota'] === 'true') {
                                this.settings['scrollSize'] = this.totalPlayers;
                            }
                        });
                    } 
                    else {
                        this.totalPlayers = this.leaderBoard.players.length;
                        this.activeRoute.queryParams
                        .subscribe(params => {
                            if(params['enableToyota'] && params['enableToyota'] === 'true') {
                                this.settings['scrollSize'] = this.totalPlayers;
                            }
                        });
                    }
                //     this.leaderBoard.players.forEach(function(pl){
                //         if (pl.position === 'N') {
                //         pl.position = 'NS';
                //     }
                // });
                    
                    this.playersToDisplay = [];
                    this.topNplayersDisplay =  [];
                    this.derivePlayerTeams();
                    this.leaderBoardSettings.dataRefreshed(this.totalPlayers);
                },(error)=>{

                },()=>{
                    this.isRefreshing = false;
                });
                this.subscriptions.push(sub);
                // this.addToBusyList([sub]);
        }
        

    }
    isColumnHidden(columnId: string) {
        return this.hiddenColumns[columnId];
    }
    isGrossHidden() {
        if (!this.settings) return false;
        if (this.settings.autoScroll && this.settings.scrollScoreTypes &&
            this.refreshParams)
            return (this.refreshParams.scoreType === 'net' && this.settings.hideGrossColumns)
        else return this.settings.scoreType === 'net' &&
            this.settings.hideGrossColumns;
    }
    isNetHidden() {
        if (!this.settings) return true;
        if (this.settings.autoScroll && this.settings.scrollScoreTypes &&
            this.refreshParams)
            return (this.refreshParams.scoreType === 'gross' && this.settings.hideNetColumns);

        else return this.settings.scoreType === 'gross' &&
            this.settings.hideNetColumns;
    }

    isAllRoundHidden() {
        if (this.refreshParams.round.roundNo === 0 && this.totalRounds > 1) return true
    }

    isMultiRoundHidden(roundNo: number) {
        // console.log('----- Multi Round Start -----')
        // console.log('Multi Round | Refresh Params : ',this.refreshParams.round.roundNo, 'Param Round : ', roundNo)
        // console.log('Multi Round | Next Round : ', this.nextRound, 'Total Rounds : ', this.totalRounds)
        let multiRoundHide: boolean = true;
        if (this.refreshParams.round.roundNo === 0) multiRoundHide = false
        else multiRoundHide = true;
        if (this.totalRounds === 1) multiRoundHide = true;
        // console.log('Multi Round | Multi Round Hide  : ', multiRoundHide)
        // console.log('----- Multi Round End -----')

        return multiRoundHide || this.isMaxRoundHidden(roundNo);
    }

    isMaxRoundHidden(roundNo: number, multiRoundHide ? : boolean) {
        // console.log('isMaxRoundHidden : ', this.totalRounds, roundNo)
        if (this.refreshParams.round.roundNo === 0)
            if (roundNo > this.totalRounds) return true
    }

    isSponsorHidden() {
        // || this.compDetails.sponsors.length === 0
        if (!this.settings.showSponsor)
            return true;
        // && this.compDetails.sponsors.length > 0
        else if (this.settings.showSponsor)
            return false;
    }

    isExpanderHidden() {
        if (this.settings.hideExpanderColumns) return true
        else return false
    }

    colspan() {
        let colspan: number = 3;
        // console.log("colspan() : ", colspan, this.totalRounds, this.refreshParams.round.roundNo)

        if (this.refreshParams.round.roundNo === 0 && this.totalRounds === 1) return colspan
        else if (this.refreshParams.round.roundNo !== 0) return colspan
        else return ((colspan - 2) + this.totalRounds)
    }
    private prepareScorecardDisplay() {
        let rows: any[] = [];
        this.playerRowExpanded.rounds.forEach(round => {
            let parRow: any = {};
            parRow['round'] = round.roundNo;
            parRow['rowType'] = 'Par';
            parRow['courseNames'] = round.courseNames;
            parRow['outTotal'] = null;
            parRow['inTotal'] = null;
            round.nines.forEach(nine => {
                nine.scores.forEach(score => {
                    parRow["g" + score.holeNo] = score.parScore;
                    parRow["n" + score.holeNo] = score.parScore;
                });
            });
            rows.push(parRow);

            let idxRow: any = {};
            idxRow['round'] = round.roundNo;
            idxRow['rowType'] = 'Index';
            idxRow['courseNames'] = round.courseNames;
            idxRow['outTotal'] = null;
            idxRow['inTotal'] = null;
            round.nines.forEach(nine => {
                nine.scores.forEach(score => {
                    idxRow["g" + score.holeNo] = score.index;
                    idxRow["n" + score.holeNo] = score.index;
                });
            });
            rows.push(idxRow);

            let scoreRow: any = {};
            scoreRow['round'] = round.roundNo;
            scoreRow['rowType'] = 'Gross';
            scoreRow['courseNames'] = round.courseNames;
            scoreRow['outTotal'] = round.outTotal;
            scoreRow['inTotal'] = round.inTotal;
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
        let columnVisibility = {};
        hiddenColumns.map(col => {
            if (col.hidden)
                columnVisibility[col.id] = col.hidden;
        });
        setTimeout(() => {
            this.hiddenColumns = columnVisibility;
            this.leaderboardColumns.forEach(det => {
                det.hidden = this.hiddenColumns[det.id];
            });
            if (!this.embedded) {
                this.savePreferences();
            } else {
                this.columnsVisibilityChange.emit(this.hiddenColumns);
            }
        }, 100);

    }

    checkThru(data: LeaderBoardPlayer) {
        // console.log('[Check Thru]', data);
        // console.log("CheckThru() : ",data.startTime.+":",data.startTime.getMinutes())
        // console.log("Round??:",this.compDetails.roundInProgress, this.compDetails.gameRounds,this.compDetails.nextRound)
        // let date: Date = new Date();
        // date.setHours(Number(data.startTime.hour));
        // date.setMinutes(Number(data.startTime.minute));
        
        if (data.position === 'W' || data.position === 'X' || data.position === 'CUT')
            return data.thru;


        // if(0) {
        //     let _hour: string = (data.startTime.hour === null) ? '' : data.startTime.hour.toString();
        //     if (_hour.length === 1) _hour = '0' + _hour;
        //     else _hour = _hour;
        //     let _minute: string = (data.startTime.minute === null) ? '' : data.startTime.minute.toString();
        //     // console.log("Minute : ",_minute,data.startTime.minute,_minute.length)
        //     if (_minute.length === 1) _minute = '0' + _minute;
        //     else _minute = _minute;
    
        //     // _minute = _minute.length===1?(_minute=="0"?"00":"0"+_minute):_minute;
        //     let _time = _hour + ":" + _minute;
        //     // _hour+":"+_minute
        // }
        let _time = String(data.startTime);
        _time = _time.substr(0, 5);
        // console.log("Get hours : ", _time.substr(0, 5));
        if(this.enableToyota) {
            if (data.thru === 'F') return data.thru
            else if (this.compDetails.roundInProgress === 1 && data.thru === "0")
                return this.getStartTime(data.playerId);
                // return ''; //_time
            else if (this.compDetails.roundInProgress === 2 && data.thru === "18")
                return this.getStartTime(data.playerId);
                // return ''; //_time
            else if (this.compDetails.roundInProgress === 3 && data.thru === "36")
                return this.getStartTime(data.playerId);
                // return ''; //_time
            else if (this.compDetails.roundInProgress === 4 && data.thru === "54")
                return this.getStartTime(data.playerId);
                // return ''; //_time
            else if (this.compDetails.roundInProgress > 1 && data.thru === "0")
                return this.getStartTime(data.playerId);
            else if (this.compDetails.roundInProgress > 1 && data.thru !== "0") {
                if(this.settings.selectedRound === 0) {
                    return 18-(18*this.compDetails.roundInProgress - Number(data.thru))
                } else return (18*this.compDetails.roundInProgress)-(18*this.compDetails.roundInProgress - Number(data.thru))
            }
                // return 18-(18*this.compDetails.roundInProgress - Number(data.thru))
            else return data.thru;
        } else {
            if (data.thru === 'F') return data.thru
            else if (this.compDetails.roundInProgress === 1 && data.thru === "0")
                return ''; //_time
            else if (this.compDetails.roundInProgress === 2 && data.thru === "18")
                return ''; //_time
            else if (this.compDetails.roundInProgress === 3 && data.thru === "36")
                return ''; //_time
            else if (this.compDetails.roundInProgress === 4 && data.thru === "54")
                return ''; //_time
            else
                return data.thru

        }

    }
    addToBusyList(sub: Subscription[]) {
        this.busyConfig.busy = this.refreshSubList.filter(s => !s.closed);
        // this.refreshSubList.splice(0, this.refreshSubList.length);
        this.busyConfig.busy.push(...sub);
    }
    private savePreferences() {
        this.userPreference.setInSession("Leaderboard.settings", {
            lbSettings: this.settings,
            hiddenColumns: this.hiddenColumns,
            showSettings: this.showSettings
        });
    }
    private restorePreferences() {
        let val = this.userPreference.getFromSession("Leaderboard.settings");
        // console.log('restore pref : ', val)
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
                    if (players && players.length)
                        players.forEach(pl => {
                            pl['teamName'] = team.teamName;
                            pl['teamLogo'] = team.teamLogo;
                        })
                })
            })
        }
    }

    toggleDialog(mode?: boolean) {
        // console.log("toggle dialog here ")
        // this.display = mode;
        // console.log(this.compDetails)
        // console.log(this.competition)
        // console.log(this.totalRounds)
        // console.log(this.settings)
        // this._deriveCategories();
        // this._deriveRounds();
        // console.log(this.validCategories)
        // console.log(this.validRounds)
    }


    private _deriveCategories() {
        if (this.compDetails && this.compDetails.categories) {
            let categories = this.compDetails.categories
                                 .filter(c => c.forGrouping);
            let allCatg    = {
                forGrouping : true,
                sequence    : 0,
                categoryId  : -1,
                categoryName: 'All',
            };
            if (categories.length > 1) {
                this.validCategories           = [allCatg, ...categories];
                this.settings.selectedCategory = -1;
            } else if (categories.length === 1) {
                this.validCategories           = categories;
                this.settings.selectedCategory = this.validCategories[0].categoryId;
            }
            else {
                this.validCategories           = [allCatg];
                this.settings.selectedCategory = -1;
            }
        
        setTimeout(() => {
        this.activeRoute.queryParams
        .subscribe(params => {
            if(this.validCategories && this.validCategories.length > 0) {
                this.validCategories.sort((a,b)=>{
                    if(a.gender === 'M' && b.gender !== 'M') return -1;
                    else if(a.gender!== 'M' && b.gender === 'M') return 1;
                    else {
                        if(a.categoryId < 0 && b.categoryId > 0 ) return 1;
                        else if(a.categoryId > 0 && b.categoryId < 0 ) return -1;
                        else if(a.categoryId < b.categoryId) return -1
                        else if(a.categoryId > b.categoryId) return 1;
                        else return 0;
                    }

                })
            }
            if(params['enableToyota'] && params['enableToyota'] === 'true') {
                // this.settings['scrollSize'] = this.totalPlayers;
                this.settings['scrollFrequency'] = 60;
                this.settings['showNonPlaying'] = true
                if(this.validCategories && this.validCategories.length > 0) {
                    let _initCat = this.validCategories.filter((c)=>{
                        return c.gender === 'M'
                    }).map((c)=>{ return c })

                    if(_initCat && _initCat.length > 0) {
                        this.settings.selectedCategory = _initCat[0].categoryId?_initCat[0].categoryId:-1 //this.validCategories[1].categoryId;
                        this.refreshParams['category'] = _initCat[0].categoryId?_initCat[0]:null; //this.validCategories[1];
                    }
                    this.refreshLeaderBoard();
                    }
                    
                }
            });
        },1000);
        }
    }

    private _deriveRounds() {
        if (this.compDetails && this.compDetails.gameRounds) {
            let validRounds = this.compDetails.gameRounds.filter(r => r.status === 'InProgress' || r.status === 'Completed');
            let round       = {
                roundNo: 0
            };
            if (validRounds.length > 1) {
                this.validRounds            = [round, ...validRounds]
                this.settings.selectedRound = 0;
            } else if (validRounds.length === 1) {
                this.settings.selectedRound = validRounds[0].roundNo;
                this.validRounds            = validRounds; //[round, ...validRounds];
            } else {
                this.validRounds            = [round];
                this.settings.selectedRound = 0;
            }
        }
    }

    getFlagUrl(flagUrl: string) { 
        if(flagUrl == null) return null
        else {
            let flagIcon = flagUrl.split("/")
            return "assets/images/flag/" + flagIcon[2];
        }
    }

    onClickCategory(e, cat) {

        console.debug("category clicked : ",e,  cat, this.settings.selectedCategory);
        // if(!cat) return;
        if(!cat) this.settings.selectedCategory = null;
        else  this.settings.selectedCategory = cat.categoryId;
        this.refreshParams['category'] = cat;
        this.refreshLeaderBoard();
    }

    
    onClickRound(e, round) {
        this.showWinners = false;
        console.debug("round clicked : ",e,  round, this.settings.selectedRound);
        // if(!round) return;
        if(!round) {
            this.settings.selectedRound = 0;
            this.refreshParams.round = {
                roundNo: 0
            }
        }
        // else if(round.roundNo === 0) {
        //     this.refreshParams.round = null;
        //     this.settings.selectedRound = 0;
        // }
        else {
            this.settings.selectedRound = round.roundNo;
            this.refreshParams['round'] = round;
        }
        this.refreshLeaderBoard();
    }

    onClickMyGolf2uLink() {
        window.open('https://www.mygolf2u.com','_blank');

    }

    getRoundTitle(x: number) {
        if(!x) return '-';
        if(!this.compDetails) return '-';
        if(this.compDetails && !this.compDetails.gameRounds) return '-';
        if(this.compDetails && this.compDetails.gameRounds && this.compDetails.gameRounds.length === 0) return '-';
        if(!this.totalRounds) return '-';
        if(x === this.totalRounds) return "FR"
        else return "R"+x;
    }

    getCurrentCourses() {
        // if(!this.refreshParams.round.roundNo) return;
        // if(!this.compDetails) return;
        // if(!this.compDetails.gameRounds) return;
        // if(this.compDetails.gameRounds && this.compDetails.gameRounds.length === 0) return;
        let _courseNames; 
        // this.compDetails.gameRounds.filter((round: GameRound)=>{
        //     return round.roundNo === this.refreshParams.round.roundNo;
        // }).map((round: GameRound)=>{
        //     _courseNames = round.courseNames
        // })

        // return _courseNames.join(" | "); 
        if(!this.leaderBoard) return;
        _courseNames = this.leaderBoard.firstNineCourseName + " | " + this.leaderBoard.secondNineCourseName;
        return _courseNames;

    }

    getClubName() {
        if(!this.competition) return;
        let _clubName = this.competition.clubName;
        return _clubName;
    }

    getRowClass(e) {
        console.debug("row class : ", e);
    }

    flightList: Array<FlightInfo> = [];
    getFlightList() {
        let _compId = this.competition.competitionId;
        let _roundNo = this.compDetails.roundInProgress;
        // this.flightList = [];

        this.competitionService.getFlightList(_compId, _roundNo)
        .subscribe((data)=>{
            if(data) {
                this.flightList = data;
            }
        });
        // this.addToBusyList([sub]);
    }

    getStartTime(playerId) {
        let _filteredFlight = 
        this.flightList.filter((f: FlightInfo) => {
            return f.flightMembers.filter((fm: FlightMember) => fm.playerId === playerId).length > 0;
        })
        return moment(_filteredFlight[0].startTime,"HH:mm:ss").format('HH:mm');
    }

    getRoundThru(player, round: number) {
        let _thru: number;
        if(player.thru === 'F') return true;// player.thru;
        // else if(round === 1) return 
        else if(this.settings.selectedRound === 0) {
            if(round > 0  && (Number(player.thru) >= 18*(round))) {
                // Number(player.thru) >= 9*(round) && 
                // && round < this.totalRounds
                return true;
            } else return false;
        } else return false;
    }

    getCutOffClass(player, idx, playersToDisplay: Array<any>) { 
        let _idx;
        let _class = '';
        
        console.debug("cut off class : ", idx,player, playersToDisplay, this.leaderBoard, this.playersToDisplay)
        if(player.position === 'CUT') {
            // return 'cut-off-line'
        }
            
        if(!this.playersToDisplay || this.playersToDisplay.length === 0 ) return;
        // if(!this.leaderBoard || this.leaderBoard.players.length === 0) return;
        // this.playersToDisplay.filter((p: LeaderBoardPlayer, i, lbp)=>{
        let _hasCut = this.playersToDisplay.find((p: LeaderBoardPlayer, i, lbp)=>{
            
        console.debug("cut off class [1]: ",player, p, lbp, i)
            return p.playerId === player.playerId && player.position === 'CUT'; // && lbp[i-1].position !== 'CUT'
        });
        if(_hasCut) _class = 'cut-off-line'
        return _class;
    }

    
    winnersList: Array<number>; //competitionPlayerIds
    selectedWinner: number;
    selectedCategory: number;
    overrideMode: boolean = false;
    username: string;
    password: string;
    errorMessage: string;
    executeOverrideWinners() {
        this.errorMessage = null;
        this.getAuthenticate()
        .then((result: any)=>{
            console.debug("after get auth ", result)
            if(result && result.success) {
                let _compId = this.competition.competitionId;
                let _grossOrNet = 'G'; //'N'
                let _winners = [];
                if(this.selectedWinner) _winners.push(this.selectedWinner);
                let _category;
                if(this.selectedCategory) _category = this.selectedCategory;
                let _authToken = result.session.authToken;
                this.competitionService.overrideWinners(_compId, _grossOrNet, _winners, _category, true, _authToken)
                .subscribe((result: any)=>{
                    console.debug("execute override winners : ", result, )
                    this.refreshLeaderBoard();
                    this.overrideMode = false;
                    this.selectedCategory = null;
                    this.selectedWinner = null;
                })
            } else {
                if(result.session && result.session.exception)
                this.errorMessage = result.session.exception;
            }
        }).catch((error: any)=>{
            if(error && !error.success) this.errorMessage = error.message;
        })
    }

    getAuthenticate() { 
        return new Promise((resolve, reject)=>{
            this.competitionService.getAuth(this.username, this.password)
                .subscribe((session: any) => {
                    console.log("authenticate : ", session)
                    resolve({
                        success: session.success,
                        session: session
                    })
                    // if(url) session.returnUrl = url;
                    // return createAction(SessionActions.LOGIN_SUCESS, session);
                },(error)=>{
                    let _error = error.json();
                    let _msg = _error.errorMessage;
                    this.errorMessage = _msg;
                    resolve({
                        success: false,
                        message: _msg
                    })
                })
                // .catch((error: any) => {
                //     const msg = Util.getErrorMessage(error, 'Unknown error occured while signing in. Server may be down.');
                //     this.messageActions.errorGrowl(msg, 'Sign In Failed');
                //      return Observable.of(createAction(SessionActions.LOGIN_FAILED, msg));
                // });
        })
    }
 }