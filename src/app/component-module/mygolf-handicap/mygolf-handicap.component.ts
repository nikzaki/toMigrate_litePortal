import { PlayerDataLite } from './../../models/mygolf.data';
import {
    Component,
    OnInit,
    Input,
    EventEmitter,
    Output,
    ViewChild
} from '@angular/core';
import {
    Competition
} from '../../models/mygolf/competition/competition';
import {
    Actions
} from '@ngrx/effects';
import {
    Action
} from '../../models/action';
import {
    DataList,
    SelectItem,
    OverlayPanelModule,
    OverlayPanel
} from 'primeng/primeng';
import {
    HandicapService
} from 'app/services/handicap.service';
// import {
//     ClubHandicap,
// } from 'app/models/mygolf/handicap-history';
import {
    Player
} from 'app/models/mygolf/player/player';
import * as moment from 'moment';
import {
    ClubService
} from 'app/services/club.service';
import {
    Club,
    ClubCourse,
    TeeBoxInfo
} from 'app/models/mygolf/club';
import {
    ClubList
} from '../../models/mygolf/club/club-list';
import {
    DialogModule
} from 'primeng/primeng';
import {
    PlayerService
} from 'app/services/player.service';
import {
    PlayerList
} from 'app/models/mygolf/player/player-list';
import {
    PaginatorModule
} from 'primeng/primeng';
import {
    ConfirmDialog,
    Message,
    ConfirmationService
} from 'primeng/primeng';
import {
    MessagesModule
} from 'primeng/primeng';
// import {MessageModule} from 'primeng/primeng';
// import {Message} from 'primeng/components/common/api';
import {
    MessageService
} from 'primeng/components/common/messageservice';
import {
    FieldsetModule
} from 'primeng/primeng';
import {
    PanelModule
} from 'primeng/primeng';
import { HandicapSystem,
    HandicapCalculation,
    HandicapGameRound,
    HandicapScore,
    PlayerInfo,
    ClubHandicap} from 'app/models/mygolf.data';


    

export interface CourseRatings {
    courseRating ? : number;
    slopeRating? : number;
    totalPar ? : number;
}
@Component({
    selector: 'mygolf-handicap',
    templateUrl: './mygolf-handicap.component.html',
    styleUrls: ['./mygolf-handicap.component.scss'],
    providers: [MessageService],
    // encapsulation: ViewEncapsulation.None,
})

export class MygolfHandicapComponent implements OnInit {
    @Input() competitions: Competition[];
    @Input() totalCompetitions: number;
    @Input() emptyMessage: string = 'No competitions found.';
    @Input() initialPage: number = 1;
    @Input() pageSize: number;
    @Input() paginator: boolean;
    @Input() paginatorPosition: string;
    @Input() lazyLoad: boolean;
    @Input() singleLineDisplay: boolean;
    @Input() showCompetitionStatus: boolean = true;
    @Input() showClubInfo: boolean;
    @Input() actions: Action[] = [];
    // @Input() selectable: boolean = false;
    // @Input() multiSelect: boolean = false;

    @Output() onCompetitionAction: EventEmitter < any > = new EventEmitter();
    @Output() onPageRequest: EventEmitter < any > = new EventEmitter();

    @ViewChild('compList')
    compList: DataList;
    handicapList: Array < HandicapCalculation > = [];
    allHandicapList: Array < HandicapCalculation > = [];
    handicapRounds: Array < HandicapGameRound > = [];
    localRound: any = [];
    player: PlayerDataLite; // PlayerInfo;
    searchPlayerId: number;
    searchPlayer: string = '';
    clubDropdown: SelectItem[] = [];
    clubList: Array < Club > = [];
    selectedClub: any;
    courseList: Array < ClubCourse > = [];
    selectedCourse1: ClubCourse;
    selectedCourse2: ClubCourse;
    selectedCourseAll: Array<any> = [];
    blueHcp: number;
    blackHcp: number;
    redHcp: number;
    whiteHcp: number;
    goldHcp: number;
    blueMgHcp: number;
    blackMgHcp: number;
    redMgHcp: number;
    whiteMgHcp: number;
    goldMgHcp: number;
    hasPlayer: boolean = false;
    listMode: boolean = false;

    blackRatings: CourseRatings;
    blueRatings: CourseRatings;
    whiteRatings: CourseRatings;
    redRatings: CourseRatings;
    goldRatings: CourseRatings;

    displayPlayer: boolean = false;
    displayDetail: boolean = false;
    playerList: PlayerList;
    players: Array < Player > ;

    selectedPlayer: Player;
    messages: Message[] = [];
    msgs: Message[] = [];
    msgId: Message[] = [];
    errorMessage: boolean = false;
    countryList;
    countryDropdown: SelectItem[] = [];
    selectedCountry: any;

    hcpDetail: HandicapGameRound;

    overlayPanel: boolean = false;
    refreshedAttempt: boolean = false;
    refreshPlayerAttempt: boolean = false;

    clubHandicap: ClubHandicap;
    clubNhsHandicap: ClubHandicap;
    allClubHandicap: Array<ClubHandicap>;
    fullImageUrl: string;
    displayImage: boolean = false;

    screenWidth: any;
    screenHeight: any;
    teeBox: Array<any>;

    countrySuccess: boolean = true;
    clubSuccess: boolean = true;
    firstNineSuccess: boolean = true;
    secondNineSuccess: boolean = true;
    courseSuccess: boolean = true;

    handicapSystemList: Array<HandicapSystem>;
    handicapSystemDropdown: SelectItem[] = [];
    selectedHcpSystem: HandicapSystem; //HandicapSystem;
    selectedHcpCalc: HandicapSystem;
    playerDefaultHcpSystem: HandicapSystem;

    playerHcpIdx: number;
    latestPlayerHcpIdx: number;
    calcPlayerHcpIdx: number;
    latestEffectiveDate: Date;
    hcpHistoryDropdown: SelectItem[] = [];
    selectedHcpHistory: HandicapCalculation;

    viewIdxDateFlag: boolean = false;
    hcpCalcFlag: boolean = false;



    constructor(private handicapService: HandicapService,
        private clubService: ClubService,
        private playerService: PlayerService,
        private messageService: MessageService) {}

    ngOnInit() {

        // this.refreshCountryList();
        // this.getClubList();
        // this.refreshCompetition();
        // this.refreshHandicapSystem();
    }
    ngAfterViewInit() {
        this.refreshHandicapSystem();
        // if(this.initialPage) {
        //     this.compList.first = ((this.initialPage-1) * this.pageSize);
        // }
    }
    onLazyLoad(event) {
        // let pageNo = (event.first)/this.pageSize + 1;
        // console.debug("The page requested =" + pageNo);
        // this.onPageRequest.emit({
        //     page: pageNo,
        //     firstRowOffset: event.first,
        //     pageSize: event.rows,
        //     originalEvent: event
        // });
    }

    clearAllSelected() {
        this.refreshedAttempt = false;
        this.selectedClub = null;
        this.selectedCourse1 = null;
        this.selectedCourse2 = null;
        this.selectedCourseAll = null;
        this.selectedPlayer = null;
        this.msgs = [];
        this.msgId = [];
        this.hcpDetail = null;
        this.handicapRounds = null;
        this.selectedHcpSystem = null;
        this.selectedHcpCalc = null;
        this.viewIdxDateFlag = false;
        this.hcpCalcFlag = false;
    }

    onAction(event) {
        this.onCompetitionAction.emit(event);
    }


    showPlayerDialog() {
        this.displayPlayer = true;
        this.refreshCountryList();
    }

    showDetailDialog(event) {

        console.log(this.displayDetail);
        console.log('event ', event)
        if (event && event.data) {
            this.displayDetail = true;
            this.hcpDetail = event.data;
        } else this.displayDetail = false;
    }

    showDetailDialog_(data) {

        console.log(this.displayDetail);
        console.log('event ', data)
        // this.displayDetail = true;
        // this.hcpDetail = data;
        if (data) {
            this.displayDetail = true;
            this.hcpDetail = data;
        } else this.displayDetail = false;
    }

    // refreshCompetition() {
    //     this.handicapService.getPlayerHcpList(199).subscribe((handicapList: Array<HandicapCalculation>) => {
    //         console.log('Refresh handicap', handicapList)
    //         this.handicapList = handicapList;
    //         this.player = this.handicapList[0].player;
    //         this.handicapRounds = this.handicapList[0].gameRounds;
    //         // let roundDate
    //         // this.handicapRounds.forEach((hr: HandicapGameRound)=> {
    //         //     hr.roundDate = moment(hr.roundDate).format('yyyy mm dd')
    //         // })
    //         // this.compList = data;
    //     })
    // }

    getPlayer(playerId: number) { 
        this.clearAllSelected();
        this.hasPlayer = false;
        this.player = null;

        console.log('player id ', playerId)

                if(playerId < 0 || playerId === null || !playerId) {
                this.msgId.push({
                    severity: 'error',
                    summary: 'Please enter a value starting from 1',
                    // detail: 'PrimeNG rocks'
                });

                return;
                }
                this.msgId = [];
                if(!this.refreshedAttempt) this.msgId.push({
                    severity: 'info',
                    summary: 'Loading player handicap ...',
                    // detail: 'PrimeNG rocks'
                });
        this.handicapService.getPlayerDefaultHcpSystem(playerId)
        .subscribe((data: any)=>{
            // console.log("get player handicap system", data._body)
            let _defaultHandicapSystem = data._body;
            if(!_defaultHandicapSystem) {
                this.handicapSystemList.filter((hcpSystem: HandicapSystem)=>{
                    return hcpSystem.defaultSystem
                }).map((hcpSystem: HandicapSystem)=>{
                    _defaultHandicapSystem = hcpSystem.id
                })
            } 
            console.log("default handicap system : ", _defaultHandicapSystem)
            if(data.status === 200 && _defaultHandicapSystem) {
                this.handicapService.getPlayerHcpList(playerId).subscribe((handicapList: Array < HandicapCalculation > ) => {
                    console.log('Refresh handicap', handicapList)
                    if (handicapList.length > 0 && handicapList) {

                        this.allHandicapList = handicapList;
                        if(this.allHandicapList && this.allHandicapList.length > 0) {
                            this.listHandicapHistory();
                        }
                        this.handicapList = handicapList.filter((h: HandicapCalculation)=>{
                            return h.handicapSystem === _defaultHandicapSystem
                        });
                        if(this.handicapList.length === 0) {
                            this.handicapList = handicapList
                        }
                        this.handicapList = this.handicapList.sort((a,b)=>{
                            if(a.handicapIndexDate > b.handicapIndexDate) return -1
                            else if(a.handicapIndexDate < b.handicapIndexDate) return 1
                            else return 0
                        });
                        console.log("handicap list : ",this.handicapList);
                        this.player = this.handicapList[0].player;
                        this.handicapRounds = this.handicapList[0].gameRounds;
                        this.latestEffectiveDate = this.handicapList[0].handicapIndexDate;
                        this.playerHcpIdx = this.handicapList[0].handicapIndex;
                        this.calcPlayerHcpIdx = this.handicapList[0].handicapIndex
                        if(this.handicapSystemList) {
                            this.handicapSystemList.filter((hcpSys: HandicapSystem)=>{
                                if(hcpSys.id === _defaultHandicapSystem) {
                                    return true
                                }
                            }).map((handicapSystem: HandicapSystem)=>{
                                this.selectedHcpSystem = handicapSystem;
                                this.playerDefaultHcpSystem = handicapSystem;
                                this.selectedHcpCalc = handicapSystem;
                            })
                        }
                        //  else {
                        //     this.selectedHcpSystem = {id: _defaultHandicapSystem}
                        // }
                        this.handicapService.getPlayerHcpIdx(playerId, _defaultHandicapSystem)
                        .subscribe((data)=>{
                            console.log("player handicap idx : ", data)
                            this.latestPlayerHcpIdx = data;
                        });

                        // this.selectedCountry = {id: playerInfo.countryId};
                        console.log("Handicap rounds : ", this.handicapList, this.handicapRounds)
                        this.handicapRounds.sort((a, b) => {
                            let prevDateTime;
                            let postDateTime;
                            prevDateTime = moment(moment(a.roundDate,"YYYY-MM-DDTHH:mmZ").format("YYYY-MM-DD") + ' ' + a.startTime);
                            postDateTime = moment(moment(b.roundDate,"YYYY-MM-DDTHH:mmZ").format("YYYY-MM-DD") + ' ' + b.startTime);
                            let _prevDT = moment(prevDateTime).format("YYYY-MM-DD HH:mm");
                            let _postDT = moment(postDateTime).format("YYYY-MM-DD HH:mm")
        
                            // console.log("#start#")
                            // console.log("prevDateTime", prevDateTime, "date : ", a.roundDate, "time : ",a.startTime);
                            // console.log("isBefore", moment(prevDateTime).isBefore(postDateTime));
                            // console.log("postDateTime", postDateTime, "date : ", b.roundDate, "time : ",b.startTime);
                            // console.log("isAfter",moment(prevDateTime).isAfter(postDateTime))
                            // console.log(moment(prevDateTime).format("YYYY-MM-DD HH:mm"), moment(postDateTime).format("YYYY-MM-DD HH:mm"));
                            // console.log("#end#")
        
                            // if (_prevDT < _postDT)
                            //     return 1;
                            // else if (_prevDT > _postDT)
                            //     return -1;
                            // else return 0;
                            if (a.roundDate < b.roundDate)
                                return 1;
                            else if (a.roundDate > b.roundDate)
                                return -1;
                            else return 0;
                        });
                        this.hasPlayer = true;
                        this.playerService.getClubMembership(playerId).subscribe((clubMembership: any) =>{
                            console.log('get club membership',clubMembership)
                            this.handicapService.getClubHandicap(playerId)
                            .subscribe((clubHandicap: Array<ClubHandicap>) =>{
                                if(clubHandicap.length > 0) {
                                    clubHandicap.forEach((c: ClubHandicap) => {
                                        if(c.homeClub && c.handicapSystem.id === this.selectedHcpSystem.id)
                                            this.clubHandicap = c;
                                        if(c.homeClub && c.handicapSystem.id.toLowerCase().includes('nhs'))
                                            this.clubNhsHandicap = c;
                                    });
                                    this.allClubHandicap = clubHandicap;
                                }
                                    
                                console.log('club handicap', clubHandicap)
                                console.log('club handicap', this.clubHandicap)
                            })
                        })
                        this.msgId = [];
                    } else {
                        console.log('HandicapList else : ',handicapList)
                        this.handicapList = handicapList;
                        this.msgId = [];
                        this.msgId.push({
                            severity: 'error',
                            summary: 'There is no handicap information with this MG2U ID',
                            // detail: 'PrimeNG rocks'
                        });
                    }
                }, (error) => {
                    if (error) {
                        console.log('Get player Error', error)
                        this.hasPlayer = false;
                        this.msgId = [];
                        if(error.status !== 200 && !error.ok) {
                            this.msgId.push({
                                severity: 'error',
                                summary: 'Error retrieving from server. Please try again.',
                                // detail: 'PrimeNG rocks'
                            });  
                        } else  {
                            this.msgId.push({
                                severity: 'error',
                                summary: 'There is no Player with this MG2U ID',
                                // detail: 'PrimeNG rocks'
                            });
                        }
                        
                    }
        
                }, () => {
                    this.refreshedAttempt = true;
                    console.log('##complete##')
                    console.log('refreshedAttempt',this.refreshedAttempt)
                    console.log('handicap list',this.handicapList)
                    console.log(this.handicapList.length)
                    console.log(this.handicapRounds)
                    console.log('##complete##')
        
                    if (this.refreshedAttempt && this.handicapList.length > 0) {
                        this.msgId = [];
                        this.refreshCountryList();
                        this.getClubList();
                    }
                });
            }
        },(error)=>{

        },()=>{
            if(this.handicapRounds && this.handicapRounds.length > 0) this.msgId = [];
        })

        
    }

    // searchPlayers

    refreshPlayerList(searchPlayer ? : string) {
        this.errorMessage = false;
        this.refreshPlayerAttempt = false;
        this.msgs = [];
        if (this.searchPlayer === '' || this.searchPlayer === null) {
            // this.messages.push({
            //     severity: 'error',
            //     detail: 'Moved all data from source player record to target player record'
            // });

            this.msgs.push({
                severity: 'error',
                summary: 'Please enter a player name or email',
                // detail: 'PrimeNG rocks'
            });
            this.errorMessage = true;
            return false;
        } else if (this.searchPlayer.length < 3) {
            this.msgs.push({
                severity: 'error',
                summary: 'Please enter at least 3 characters',
                // detail: 'PrimeNG rocks'
            });
            this.errorMessage = true;
            return false;
        }
        this.playerService.searchPlayers(searchPlayer, true, 1, 1000)
            .subscribe((playerList: PlayerList) => {
                console.log('Player List', playerList)
                this.playerList = playerList;
                if (this.playerList.totalItems > 0)
                    this.players = this.playerList.players;
                this.refreshPlayerAttempt = true;
            }, (error)=> {
                if(error) this.msgs.push({
                    severity: 'error',
                    summary: 'Error retrieving from server. Please try again.',
                    // detail: 'PrimeNG rocks'
                });
            })
        // this.handicapService.getPlayerHcpList(playerId).subscribe((handicapList: Array<HandicapCalculation>) => {
        //     console.log('Refresh handicap', handicapList)
        //     this.handicapList = handicapList;
        //     this.player = this.handicapList[0].player;
        //     this.handicapRounds = this.handicapList[0].gameRounds;
        //     this.handicapRounds.sort((a, b) => {
        //         if(a.roundDate < b.roundDate)
        //             return 1;
        //         else if(a.roundDate > b.roundDate)
        //             return -1;
        //         else return 0;
        //     });
        //     this.hasPlayer = true;
        // })
    }

    refreshCountryList() {
        this.countrySuccess = true;
        this.playerService.getCountryList()
            .subscribe((countryList: any) => {
                this.countryList = countryList;
                console.log('country list ', countryList)
                this.countryDropdown.push({
                    label: 'All Countries',
                    value: {
                        id: null,
                        name: '',
                        sportCode: '',
                        flag: ''
                    }
                })
                this.countryList.forEach((c: any) => {
                    // clubItem = {
                    //     label: c.clubName, value: {clubId: c.clubId, clubName: c.clubName}
                    // }

                    this.countryDropdown.push({
                        label: c.name,
                        value: {
                            id: c.id,
                            name: c.name,
                            sportCode: c.sportCode,
                            flag: c.flagUrl
                        }
                    })
                    // this.clubDropdown.push(clubItem);
                })

            }, (error) => {
                if(error) this.countrySuccess = false;
            })
    }

    getTeeBox() {
        this.playerService.getTeeBox().subscribe((tbox: Array<any>)=>{
            if(tbox.length > 0)
                this.teeBox = tbox;
            console.log("teebox list", this.teeBox, tbox)
        })
    }

    onSelectPlayer(event) {
        console.log('Event player', event)
        let playerId: number;
        if (event && event.data) {
            playerId = event.data.playerId;
            this.getPlayer(playerId);
            this.searchPlayerId = playerId;
            this.closePlayerDialog();
        }

        // this.getPlayer()
    }

    clearPlayerList() {
        this.playerList = null;
        this.searchPlayer = '';
    }

    clearDetail() {
        this.displayDetail = false;

    }

    closePlayerDialog() {
        this.displayPlayer = false;
        // this.clearPlayerList();
    }

    closeDetailDialog() {
        this.displayDetail = false;
        // this.clearPlayerList();
    }

    getDate(date ? : any) {
        let parsedDate: string;
        parsedDate = moment(date, 'YYYY-MM-DDTHH:mm:ssZ').format('Do MMM YYYY');
        // 2020-03-04T22:16:05+08:00[Asia/Kuala_Lumpur]
        // 2017-05-25T00:00:00+08:00[Asia/Kuala_Lumpur]
        if(parsedDate.toLowerCase().includes('invalid'))
            return false;
        else return parsedDate
    }

    getTime(time? : any) {
        if(time) {
            let parsedTime: string;
            parsedTime = moment(time, 'HH:mm:ss').format('HH:mm');
            // 2020-03-04T22:16:05+08:00[Asia/Kuala_Lumpur]
            // 2017-05-25T00:00:00+08:00[Asia/Kuala_Lumpur]
            return parsedTime;
        } else {
            return 'Invalid Tee Off Time'
        }
        
    }


    getClubList() {
        console.log("after country selected : ", this.selectedCountry)
        // this.selectedCourse1 = null;
        // this.selectedCourse2 = null;
        // this.clubList = [];
        this.blackHcp = null;
        this.blueHcp = null;
        this.goldHcp = null;
        this.whiteHcp = null;
        this.redHcp = null;
        this.blueMgHcp = null;
        this.blackMgHcp = null;
        this.redMgHcp = null;
        this.whiteMgHcp = null;
        this.goldMgHcp = null;

        this.clubDropdown = [];
        this.selectedClub = [];
        let _searchText = ''
        let clubItem;
        this.courseList = [];
        this.clubSuccess = true;
        this.clubService.searchClubs()
            .subscribe((c: ClubList) => {
                console.log('[Club List] c : ', c)
                // this.clubDropdown = {label:'',value:{}}
                if (c.totalItems > 0)
                    this.clubList = c.clubs;
                let i = 0;

                this.clubList.forEach((c: Club) => {
                    // clubItem = {
                    //     label: c.clubName, value: {clubId: c.clubId, clubName: c.clubName}
                    // }
                    let countryText = '';
                    if(c.countryId === null) countryText = '';
                    else countryText = ' (' + c.countryId + ')';

                    if(this.selectedCountry && (this.selectedCountry.id !== null && this.selectedCountry.id !== '')) {
                        if(c.countryId === this.selectedCountry.id && !c.virtualClub) {
                            this.clubDropdown.push({
                                label: c.clubName + countryText,
                                value: {
                                    clubId: c.clubId,
                                    clubName: c.clubName,
                                    countryId: c.countryId,
                                    countryName: c.countryName
                                }
                            })  
                        }
                    } else {
                        if(!c.virtualClub) {
                            this.clubDropdown.push({
                                label: c.clubName + countryText,
                                value: {
                                    clubId: c.clubId,
                                    clubName: c.clubName,
                                    countryId: c.countryId,
                                    countryName: c.countryName
                                }
                            })
                        }


                        
                    }
                    
                    // this.clubDropdown.push(clubItem);
                    i++;
                })

                // if(this.selectedCountry !== null || this.selectedCountry)
                //     this.clubDropdown.filter((cd: Club) => {
                //         return cd.value.countryId == this.selectedCountry.id
                //     })
                    
                console.log('[Club List] this.clubList : ', this.clubList)
                console.log('[Club List] this.clubDropdown : ', this.clubDropdown)
            }, (error) => {
                if(error) this.clubSuccess = false;
            })
    }

    refreshCourses(club: Club) {
        this.courseList = [];
        // this.selectedCourse1 = null;
        // this.selectedCourse2 = null;
        this.blueHcp = null;
        this.blackHcp = null;
        this.redHcp = null;
        this.whiteHcp = null;
        this.goldHcp = null;
        this.blueMgHcp = null;
        this.blackMgHcp = null;
        this.redMgHcp = null;
        this.whiteMgHcp = null;
        this.goldMgHcp = null;
        this.clubService.getCourses(club.clubId)
            .subscribe((course: Array < ClubCourse > ) => {
                this.courseSuccess = true;
                this.courseList = course;
            }, (error) => {
                if(error) this.courseSuccess = false;
            })
    }

    getCourseHandicap(whichCourse: number, handicapIndex?: number) {
        console.log("sel course 1", this.selectedCourse1);
        console.log("sel course 2", this.selectedCourse2);
        console.log("sel course All", this.selectedCourseAll);

        // if(!this.selectedCourse1) 
        // this.selectedCourseAll.push(this.selectedCourse1);
        // // if(!this.selectedCourse2) 
        // this.selectedCourseAll.push(this.selectedCourse2);
        // if(this.selectedCourseAll.length > 1) {
        //     let courses: Array<ClubCourse> = this.selectedCourseAll;
        //     let selCourse: ClubCourse;
        //     selCourse = courses.reduce((a: ClubCourse,b: ClubCourse): ClubCourse => {
        //         if(a.teeBoxes.length < b.teeBoxes.length)
        //             return a
        //             else return b
        //     })
        //     console.log("selected course tee box:", selCourse)
        // }
        console.debug("player course handicap : ", whichCourse)
        console.debug("player course handicap : ",this.selectedCourse1)
        console.debug("player course handicap : ", handicapIndex)
        console.debug("player course handicap : ", this.player)
        console.debug("player course handicap : ",  this.clubNhsHandicap)
        console.debug("player course handicap : ",  this.selectedHcpCalc)
        
        this.getTeeBox();
        this.blueHcp = null;
        this.blackHcp = null;
        this.redHcp = null;
        this.whiteHcp = null;
        this.goldHcp = null;
        this.blueMgHcp = null;
        this.blackMgHcp = null;
        this.redMgHcp = null;
        this.whiteMgHcp = null;
        this.goldMgHcp = null;

        let selCourseId1: number;
        let selCourseId2: number;

        if(this.selectedCourse1 && this.selectedCourse1.courseId)
            selCourseId1 = this.selectedCourse1.courseId
        else selCourseId1 = null;

        if(this.selectedCourse2 && this.selectedCourse2.courseId)
            selCourseId2 = this.selectedCourse2.courseId
        else selCourseId2 = null;

        // if (!this.selectedCourse1 || !this.selectedCourse2) return false;
        let hcpIdx: number = null;
        let mgHcpIdx: number = null;


        if(handicapIndex) {
            mgHcpIdx = handicapIndex
        } else {
            if(this.player && this.player.mygolfHandicapIndex) mgHcpIdx = this.calcPlayerHcpIdx; // this.playerHcpIdx;// this.player.mygolfHandicapIndex;
        }
        if(this.player && this.player.handicapIndex) hcpIdx = this.clubNhsHandicap.handicapIndex; //this.player.handicapIndex;
        
        let loop: Array<number> = [hcpIdx,mgHcpIdx];

        let counter = 0;
        if(whichCourse === 1) {
            this.firstNineSuccess = true;
            // counter = 0;
            for (let i = 0; i < loop.length; i++) {
                this.selectedCourse1.teeBoxes.forEach((tb: TeeBoxInfo) => {
                    this.clubService.getCourseHandicap(this.player.playerId, tb.name, 
                    selCourseId1, selCourseId2, this.calcPlayerHcpIdx, this.selectedHcpCalc.id)
                                            .subscribe((ch: number) => {
                                                console.log("TB : ", tb.name)
                                                console.log("x : ", loop[i])
                                                console.log("ch", ch)
                                                console.log("country : ",i)
                                                if(tb.name=== 'Black') {
                                                    if(i === 0) this.blackHcp = ch
                                                    else this.blackMgHcp = ch;
                                                    }
                                                else if(tb.name === 'Blue') {
                                                    if(i === 0) this.blueHcp = ch
                                                    else this.blueMgHcp = ch;
                                                }
                                                else if(tb.name === 'Red') {
                                                    if(i === 0) this.redHcp = ch
                                                    else this.redMgHcp = ch;
                                                }
                                                else if(tb.name === 'White') {
                                                    if(i === 0) this.whiteHcp = ch;
                                                    else this.whiteMgHcp = ch;
                                                }
                                                else if(tb.name === 'Gold') {
                                                    if(i === 0) this.goldHcp = ch;
                                                    else this.goldMgHcp = ch;
                                                }
                                                this.clubService.getPlayerCourseHandicapDetails(this.player.playerId, tb.name, 
                                                    selCourseId1, selCourseId2, this.calcPlayerHcpIdx, this.selectedHcpCalc.id)
                                                    .subscribe((data: any)=>{
                                                        if (data) {
                                                            console.debug("get player course handicap details : ", i, tb.name, " - ", data)
                                                            if(tb.name=== 'Black') {
                                                                if(i === 0) this.blackRatings = data.rating
                                                                else this.blackRatings = data.rating
                                                                }
                                                            else if(tb.name === 'Blue') {
                                                                if(i === 0) this.blueRatings = data.rating
                                                                else this.blueRatings = data.rating
                                                            }
                                                            else if(tb.name === 'Red') {
                                                                if(i === 0) this.redRatings = data.rating
                                                                else this.redRatings = data.rating
                                                            }
                                                            else if(tb.name === 'White') {
                                                                if(i === 0) this.whiteRatings = data.rating
                                                                else this.whiteRatings = data.rating
                                                            }
                                                            else if(tb.name === 'Gold') {
                                                                if(i === 0) this.goldRatings = data.rating
                                                                else this.goldRatings = data.rating
                                                            }

                                                        }
                                                    })
                                            }, (error) => {
                                                if(error) this.firstNineSuccess = false;
                                            })
                });
                // counter += 1;
            }
            console.log("black hcp", this.blackHcp, this.blackMgHcp)
            
            // if(hcpIdx) {

            // }
        }
         else if(whichCourse === 2) {
             this.secondNineSuccess = true;
            //  counter = 0;
             for (let i = 0; i < loop.length; i++) {
                this.selectedCourse2.teeBoxes.forEach((tb: TeeBoxInfo) => {
                    this.clubService.getCourseHandicap(this.player.playerId, tb.name, 
                        selCourseId1, selCourseId2, this.calcPlayerHcpIdx,this.selectedHcpCalc.id)
                                            .subscribe((ch: number) => {
                                                if(tb.name=== 'Black') {
                                                    if(i === 0) this.blackHcp = ch
                                                    else this.blackMgHcp = ch;
                                                    }
                                                else if(tb.name === 'Blue') {
                                                    if(i === 0) this.blueHcp = ch
                                                    else this.blueMgHcp = ch;
                                                }
                                                else if(tb.name === 'Red') {
                                                    if(i === 0) this.redHcp = ch
                                                    else this.redMgHcp = ch;
                                                }
                                                else if(tb.name === 'White') {
                                                    if(i === 0) this.whiteHcp = ch;
                                                    else this.whiteMgHcp = ch;
                                                }
                                                else if(tb.name === 'Gold') {
                                                    if(i === 0) this.goldHcp = ch;
                                                    else this.goldMgHcp = ch;
                                                }
                                                this.clubService.getPlayerCourseHandicapDetails(this.player.playerId, tb.name, 
                                                    selCourseId1, selCourseId2, this.calcPlayerHcpIdx, this.selectedHcpCalc.id)
                                                    .subscribe((data: any)=>{
                                                        if (data) {
                                                            console.debug("get player course handicap details : ", i, tb.name, " - ", data)
                                                            if(tb.name=== 'Black') {
                                                                if(i === 0) this.blackRatings = data.rating
                                                                else this.blackRatings = data.rating
                                                                }
                                                            else if(tb.name === 'Blue') {
                                                                if(i === 0) this.blueRatings = data.rating
                                                                else this.blueRatings = data.rating
                                                            }
                                                            else if(tb.name === 'Red') {
                                                                if(i === 0) this.redRatings = data.rating
                                                                else this.redRatings = data.rating
                                                            }
                                                            else if(tb.name === 'White') {
                                                                if(i === 0) this.whiteRatings = data.rating
                                                                else this.whiteRatings = data.rating
                                                            }
                                                            else if(tb.name === 'Gold') {
                                                                if(i === 0) this.goldRatings = data.rating
                                                                else this.goldRatings = data.rating
                                                            }

                                                        }
                                                    })
                                            }, (error)=> {
                                                if(error) this.secondNineSuccess = false;
                                            })
                })
                // counter += 1;
            }
            
         }




        // this.clubService.getCourseHandicap(this.player.playerId, 'Blue', this.selectedCourse1.courseId, this.selectedCourse2.courseId)
        //     .subscribe((ch: number) => {
        //         this.blueHcp = ch;
        //         this.clubService.getCourseHandicap(this.player.playerId, 'Black', this.selectedCourse1.courseId, this.selectedCourse2.courseId)
        //             .subscribe((ch: number) => {
        //                 this.blackHcp = ch;
        //                 this.clubService.getCourseHandicap(this.player.playerId, 'Red', this.selectedCourse1.courseId, this.selectedCourse2.courseId)
        //                     .subscribe((ch: number) => {
        //                         this.redHcp = ch;
        //                         this.clubService.getCourseHandicap(this.player.playerId, 'White', this.selectedCourse1.courseId, this.selectedCourse2.courseId)
        //                             .subscribe((ch: number) => {
        //                                 this.whiteHcp = ch;
        //                                 this.clubService.getCourseHandicap(this.player.playerId, 'Gold', this.selectedCourse1.courseId, this.selectedCourse2.courseId)
        //                             .subscribe((ch: number) => {
        //                                 this.goldHcp = ch;
        //                             })
        //                             })
        //                     })
        //             })
        //     })
    }

    toggleList() {
        this.listMode = !this.listMode;
    }

    getTotalCoursePar(h: HandicapGameRound,whichNine?: number) {
        let scores: Array < HandicapScore > = [];
        let cNo = null;
        if(whichNine > 0)  cNo = whichNine;
        scores = h.scores;
        console.log('before : ',whichNine,cNo,scores)
        // if(whichNine > 0) {
        //     scores = scores.filter(s => {
        //         if(cNo === 1)
        //             if(s.holeNo <= 9)
        //                 return s.holeNo <= 9
        //         else if(cNo === 2)
        //             if (s.holeNo > 9)
        //                 return s.holeNo > 9
        //     })
        // }
        let total;
        if(cNo) {
            total = scores
            .filter(s => {
                if(cNo === 1)
                    return s.holeNo <= 9
                else if(cNo === 2)
                    return s.holeNo > 9
                else return false
            })
            .map((s: HandicapScore) => {
                    return s.holePar
                })
                .reduce((a: number, b: number) => a + b);
        } else {
            total = scores
            .map((s: HandicapScore) => {
                    return s.holePar
                })
                .reduce((a: number, b: number) => a + b);
        }
        
            console.log('after', whichNine,cNo,scores,total)
        // console.log("total course",total)
        return total;

    }

    getSubTotalGross(round: HandicapGameRound,adjusted: boolean = false, whichNine: number) {
        let first: number = 0;
        let second: number = 0;
        round.scores.forEach(a => {
            if(a.holeNo<=9) {
                if(!adjusted) first += a.grossScore
                    else first += a.adjustedScore
            } 
            else if(a.holeNo>9) {
                if(!adjusted) second += a.grossScore
                    else second += a.adjustedScore
            }
        });
        if(whichNine === 1) return first
        else if(whichNine === 2) return second
        // round.scores.reduce((a,b) => )
    }

    getFrontBack(round: HandicapGameRound,adjusted: boolean = false) {
        let first: number = 0;
        let second: number = 0;
        round.scores.forEach(a => {
            if(a.holeNo<=9) {
                if(!adjusted) first += a.grossScore
                    else first += a.adjustedScore
            } 
            else if(a.holeNo>9) {
                if(!adjusted) second += a.grossScore
                    else second += a.adjustedScore
            }
        });

        return first + "|" + second
        // round.scores.reduce((a,b) => )
    }

    deriveScoreClass(s: HandicapScore, box?: boolean) {
        if ((s.holePar - s.grossScore) == 0) {
            if(box) return 'par-score-box'
            else return 'par-score';
        } else if ((s.holePar - s.grossScore) == 1) {
            if(box) return 'birdie-score-box'
            else return 'birdie-score';
        } else if ((s.holePar - s.grossScore) == 2) {
            if(box) return 'eagle-score-box';
            else return 'eagle-score';
        }
    }

    deriveAdjScoreClass(s: HandicapScore, box?: boolean) {
        if ((s.holePar - s.adjustedScore) == 0) {
            if(box) return 'par-score-box'
            else return 'par-score';
        } else if ((s.holePar - s.adjustedScore) == 1) {
            if(box) return 'birdie-score-box'
            else return 'birdie-score';
        } else if ((s.holePar - s.adjustedScore) == 2) {
            if(box) return 'eagle-score-box';
            else return 'eagle-score';
        }
    }

    deriveParClass(pr) {
        if ((pr - 36) < 0) {
            return 'under-par';
        } else if ((pr - 36) > 0) {
            return 'above-par';
        } else if ((pr - 36) == 0) {
            return 'on-par';
        }
    }

    deriveTotalClass(pr) {
        if ((pr - 72) < 0) {
            return 'under-par';
        } else if ((pr - 72) > 0) {
            return 'above-par';
        } else if ((pr - 72) == 0) {
            return 'on-par';
        }
    }

    onEnter(value?: string) { 
        this.getPlayer(this.searchPlayerId) 
    }

    // expandImage(event,p: Player, overlaypanel: OverlayPanel) {
        expandImage() {
        // this.selectedCar = car;
        this.displayImage = true;
        // this.fullImageUrl = p.playerPhoto;
        // overlaypanel.toggle(event);
    }

    getTBoxColor(hr: HandicapGameRound) {
        let styleText = 'color:';
        let classText = 'tbox-';
        if(hr.teeBoxName === 'Red') classText += 'red'
        else if(hr.teeBoxName === 'Black') classText += 'black'
        else if(hr.teeBoxName === 'White') classText += 'white'
        else if(hr.teeBoxName === 'Gold') classText += 'gold'
        else classText += 'blue';

        return classText;
    }

    getPlayerHcpSystem(hcpSystem: HandicapSystem, type?: string) {
        let _hcpSystem;
        if(hcpSystem) _hcpSystem = hcpSystem;
        if(!this.playerDefaultHcpSystem) return;
        switch(type) {
            case 'name':
                if(_hcpSystem) return _hcpSystem.name
                else return this.playerDefaultHcpSystem.name;
            case 'shortCode':
                if(_hcpSystem) return _hcpSystem.shortCode
                else return this.playerDefaultHcpSystem.shortCode;
            case 'id':
                if(_hcpSystem) return _hcpSystem.id
                else return this.playerDefaultHcpSystem.id;
        }
        // if(this.handicapSystemList)

    }

    refreshHandicapSystem() {
        this.handicapSystemList = [];
        this.handicapSystemDropdown = [];
        this.handicapService.getHandicapSystemList()
        .subscribe((hcpSysList: Array<HandicapSystem>)=>{
            if(hcpSysList && hcpSysList.length > 0) {
                this.handicapSystemList = hcpSysList;
                this.handicapSystemList.forEach((h: HandicapSystem) => {
                    if(h.derivedByMygolf)
                    this.handicapSystemDropdown.push({
                        label: h.name +" ("+h.shortCode+")",
                        
                        value: {
                            id: h.id,
                            name: h.name,
                            shortCode: h.shortCode,
                            description: h.description,
                            derivedByMygolf: h.derivedByMygolf
                        }
                    })
                });
            }
        });
    }

    onChangeHandicapSystem() {
        console.log("selected hcp system [1] : ", this.selectedHcpSystem);
        console.log("selected hcp system [2] : ", this.allHandicapList);
        console.log("selected hcp system [3] : ", this.handicapRounds);
        this.selectedHcpHistory = null;
        let _handicapList: Array<HandicapCalculation>;
        _handicapList = this.allHandicapList.filter((h: HandicapCalculation)=>{
            return h.handicapSystem = this.selectedHcpSystem.id;
        });
        if(_handicapList && _handicapList.length > 0) {
            this.handicapRounds = _handicapList[0].gameRounds;
            this.latestEffectiveDate = _handicapList[0].handicapIndexDate;
            this.playerHcpIdx = _handicapList[0].handicapIndex;
            // this.calcPlayerHcpIdx = _handicapList[0].handicapIndex;
            this.handicapService.getPlayerHcpIdx(this.player.playerId, this.selectedHcpSystem.id)
                        .subscribe((data)=>{
                            console.log("player handicap idx : ", data)
                            // this.playerHcpIdx = data;
                            
                            this.latestPlayerHcpIdx = data;
                        });
        }

        let _clubHandicapList: Array<ClubHandicap>;
        _clubHandicapList = this.allClubHandicap.filter((ch: ClubHandicap)=>{
            return ch.homeClub && ch.handicapSystem.id === this.selectedHcpSystem.id
        })
        if(_clubHandicapList && _clubHandicapList.length > 0) {
            this.clubHandicap = _clubHandicapList[0];
        }

        // if(this.selectedCourse1 || this.selectedCourse2) {
        //     if(this.selectedCourse1) this.getCourseHandicap(1);
        //     if(this.selectedCourse2) this.getCourseHandicap(2);
        // }
        this.listHandicapHistory();
    }

    getPlayerNhsDetails(attribute?: string) {
        if(attribute && !this.clubNhsHandicap) return;
        if(!this.clubNhsHandicap) return;
        if(!attribute) return;
        switch(attribute) {
            case 'hcpOnly':
                return this.clubNhsHandicap.handicap
            case 'hcpIdx':
                return this.clubNhsHandicap.handicapIndex
            default:
                return;
        }
    }

    getActualDiff(round: HandicapGameRound) {
        if(!round) return;
        return (round.scoreDifferential + round.cumulativeESR);
    }

    listHandicapHistory() {
        this.hcpHistoryDropdown = [];
        let _allHcpList: Array<HandicapCalculation> = JSON.parse(JSON.stringify(this.allHandicapList))
        let _listHcpHistory: Array<HandicapCalculation>;
        console.log("handicap history : ", _allHcpList)
        console.log("handicap history : ", this.allHandicapList)
        
        _listHcpHistory = _allHcpList.filter((hcp: HandicapCalculation)=>{
            if(this.selectedHcpSystem) return hcp.handicapSystem === this.selectedHcpSystem.id
            else if(this.playerDefaultHcpSystem) return hcp.handicapSystem = this.playerDefaultHcpSystem.id
            else {
                let _hasHandicap = 
                this.handicapSystemList.filter((hcpSystem: HandicapSystem)=>{
                    if(hcpSystem.defaultSystem && hcpSystem.derivedByMygolf) {
                        return true
                    }
                })
                if(_hasHandicap && _hasHandicap.length > 0) {
                    return hcp.handicapSystem === _hasHandicap[0].id
                }
            }
        })
        
        _listHcpHistory = _listHcpHistory.sort((a,b)=>{
            if(a.handicapIndexDate > b.handicapIndexDate) return -1
            else if(a.handicapIndexDate < b.handicapIndexDate) return 1
            else return 0
        });

        

        console.log("handicap history : ", _listHcpHistory)
        if(_listHcpHistory && _listHcpHistory.length > 0) {

            _listHcpHistory.forEach((hcp: HandicapCalculation, idx: number)=>{
                if(idx < 5) {
                    // moment(hcp.handicapIndexDate).format("YYYY-MM-DD")
                    this.hcpHistoryDropdown.push({
                        label: this.getDate(hcp.handicapIndexDate) + " (HI : " + hcp.handicapIndex+")" ,
                        // + " " + hcp.handicapSystem
                        value: {
                            id: hcp.id,
                            hcpIdxDate: hcp.handicapIndexDate,
                            hcpIdx: hcp.handicapIndex
                            // name: hcp.name,
                            // shortCode: hcp.shortCode,
                            // flag: c.flagUrl
                        }
                    })
                }
                
            })
        }
    }

    onChangeHandicapHistory() {
        let _handicapHistory;
        this.viewIdxDateFlag = true;
        _handicapHistory = this.allHandicapList.filter((hcpCalculation: HandicapCalculation)=>{
            if(hcpCalculation.id === this.selectedHcpHistory.id) {
                return true
            }
        })
        if(_handicapHistory && _handicapHistory.length > 0) {
            this.handicapRounds = _handicapHistory[0].gameRounds;
            // this.latestEffectiveDate = this.handicapList[0].handicapIndexDate;
            this.playerHcpIdx = _handicapHistory[0].handicapIndex;
        }
        let _clubHandicapList: Array<ClubHandicap>;
        _clubHandicapList = this.allClubHandicap.filter((ch: ClubHandicap)=>{
            return ch.homeClub && ch.handicapSystem.id === this.selectedHcpSystem.id
        })
        if(_clubHandicapList && _clubHandicapList.length > 0) {
            this.clubHandicap = _clubHandicapList[0];
        }

        if(this.selectedCourse1 || this.selectedCourse2) {
            if(this.selectedCourse1) this.getCourseHandicap(1);
            if(this.selectedCourse2) this.getCourseHandicap(2);
        }
    }

    onChangeHandicapCalculator() {
        let _handicapList: Array<HandicapCalculation>;
        this.hcpCalcFlag = true;
        console.log("Change Hcp Calc : ", this.selectedHcpCalc)
        _handicapList = this.allHandicapList.filter((h: HandicapCalculation)=>{
            return h.handicapSystem = this.selectedHcpCalc.id;
        });
        if(_handicapList && _handicapList.length > 0) {
            this.handicapRounds = _handicapList[0].gameRounds;
            this.latestEffectiveDate = _handicapList[0].handicapIndexDate;
            // this.playerHcpIdx = _handicapList[0].handicapIndex;
            this.calcPlayerHcpIdx = _handicapList[0].handicapIndex;
            this.handicapService.getPlayerHcpIdx(this.player.playerId, this.selectedHcpCalc.id)
                        .subscribe((data)=>{
                            console.log("player handicap idx : ", data)
                            // this.playerHcpIdx = data;
                            
                            // this.latestPlayerHcpIdx = data;
                            this.calcPlayerHcpIdx = data;
                            
                            if(this.selectedCourse1 || this.selectedCourse2) {
                                if(this.selectedCourse1) this.getCourseHandicap(1, data);
                                if(this.selectedCourse2) this.getCourseHandicap(2, data);
                            }
                        });
        }
    }
}