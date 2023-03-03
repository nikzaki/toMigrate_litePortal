import {Component, OnInit, ViewEncapsulation, ViewChild, ElementRef,
HostListener} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Competition} from '../../models/mygolf/competition/competition';
import {CompetitionDetails} from '../../models/mygolf/competition/competition-details';
import {Flight} from '../../models/mygolf/competition/competition-flight';
import {FlightMember} from '../../models/mygolf/competition/flight-member';
import {DataTable, ConfirmDialog, Message, Panel, ConfirmationService} from 'primeng/primeng';
import {SessionService} from '../../redux/session';
import {CompetitionService} from '../../services/competition.service';
import {ScorecardService} from '../../services/scorecard.service';
import {PlainScorecard} from '../../models/mygolf/scorecard';
import {Router, ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {ServerResult} from '../../models/server-result';
import {SystemMessageActions} from '../../redux/messages/system-message-actions';
import {Util} from '../../util';
import {getLeanScorecard, zipScorecard} from '../../redux/scorecard-functions/scorecard-functions';

@Component({
    selector   : 'manual-scoring',
    templateUrl: './manual-scoring.component.html',
    styleUrls  : ['./manual-scoring.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ManualScoringComponent implements OnInit {
    searchString: string                 = '';
    searchStringChanged: Subject<string> = new Subject<string>();
    competitionId: number;
    compInfo: Competition;
    compDetails: CompetitionDetails;
    scoringRound: number;
    flights: Flight[]                = [];
    filteredFlights: Flight[]        = [];

    selectedPlayer: FlightMember;
    playerScorecard: PlainScorecard;
    playerScores: CourseScore[];
    @ViewChild('flights')
    flightsPanel: Panel;
    @ViewChild('scoretable')
    scoreTable: DataTable;
    @ViewChild('confirm')
    confirm: ConfirmDialog;
    messages: Message [] = [];
    dataChanged: boolean = false;
    blocked: boolean = false;
    constructor(private competitionService: CompetitionService,
        private scorecardService: ScorecardService,
        private messageActions: SystemMessageActions,
        private sessionService: SessionService,
        private router: Router,
        private confirmService: ConfirmationService,
        private elementRef: ElementRef,
        private activeRoute: ActivatedRoute) {

    }

    
    innerWidth: any;

    @HostListener('window:resize', ['$event'])
    onResize(event) {
    this.innerWidth = window.innerWidth;
    }

    ngOnInit() {
        this.innerWidth = window.innerWidth;
        this.activeRoute.params
            .subscribe(params => {
                this.competitionId = +params['competitionId'];
                if (!this.compInfo)
                    this.competitionService.getCompetitionInfo(this.competitionId)
                        .subscribe((comp: Competition) => {
                            //Check whether the competition is valid
                            this.sessionService.getUser()
                                .subscribe(usr=>{
                                    console.debug("manual scoring : comp ", comp);
                                    console.debug("manual scoring : usr ", usr);
                                    if(usr.userType === 'Admin' || usr.userType === 'Britesoft') {
                                        this.compInfo = comp;
                                        this.refresh();
                                    }
                                   else if((usr.userType === 'Organizer' || usr.userType === 'Club') && usr.organizerId && comp.organizerId === usr.organizerId){
                                       this.compInfo = comp;
                                       this.refresh();
                                   } else if(usr.userType === 'Club' && usr.clubId && comp.clubId === usr.clubId){
                                        this.compInfo = comp;
                                        this.refresh();
                                    } else {
                                       this.messageActions.errorGrowl('You cannot score for this competition.', 'Access denied');
                                    }
                                });

                        });
                else
                    this.refresh();
            });
        this.searchStringChanged.debounceTime(300)
            .distinctUntilChanged()
            .subscribe((searchStr => {
                this.searchString = searchStr;
                this._filter();
            }));
    }

    refresh() {
        this.refreshCompDetails()
            .subscribe(() => {
                this.refreshFlights()
                    .subscribe(() => {
                        console.log("Refreshed");
                    });

            });
    }

    private refreshCompDetails(): Observable<boolean> {
        return this.competitionService.getCompetitionDetails(this.competitionId)
                   .map((compDetails: CompetitionDetails) => {
                       this.compDetails  = compDetails;
                       //noinspection TypeScriptValidateTypes
                       if(compDetails.nextRound)
                           this.scoringRound = compDetails.nextRound;
                       else {
                           this.scoringRound = compDetails.gameRounds[compDetails.gameRounds.length-1].roundNo;
                       }
                       return true;
                   })
    }

    private getScoringRound(): Observable<boolean> {
        return this.competitionService.getScoringRound(this.competitionId)
                   .map((round: number) => {
                       this.scoringRound = round;
                       return true;
                   })
    }

    private refreshFlights(): Observable<boolean> {
        //noinspection TypeScriptValidateTypes
        return this.competitionService.getCompetitionFlights(this.competitionId,
            this.scoringRound)
                   .map((flights: Flight []) => {
                       this.flights = flights;
                       this._filter();
                       return true;
                   })
    }

    selectPlayer(flightMember: FlightMember) {
        //get the scorecard for the player
        this.blocked = true;
        this.scorecardService.getPlayerScorecard(this.competitionId, this.scoringRound, flightMember.playerId)
            .subscribe((scorecard: PlainScorecard) => {
                this.playerScorecard = scorecard;
                this._deriveCourseScores();
                this.selectedPlayer = flightMember;
                this.blocked = false;
                if (this.flightsPanel)
                    this.flightsPanel.collapse(null);
                this.dataChanged = false;
                setTimeout(() => {
                    this.focusFirstElement();
                }, 300);
            },(error)=>{
                let msg = Util.getErrorMessage(error, "Error getting scorecard for the selected player");
                this.messageActions.errorGrowl(msg, "Saving manual score error");
                this.blocked = false;
            })
    }

    private _deriveCourseScores() {
        let courseScores: Array<CourseScore> = [];
        this.playerScorecard.courses.forEach(course => {
            let courseScore = {
                whichNine : course.whichNine,
                courseName: course.courseName
            };
            course.holes.forEach(ch => {
                courseScore['hole' + ch.courseHoleNumber]     = null;
                courseScore['holeInfo' + ch.courseHoleNumber] = ch;

            });
            let prs = this.playerScorecard.playerRoundScores[0];
            prs.scores.filter(score => score.whichNine === course.whichNine)
               .forEach(score => {
                   let holeNo                         = score.holeNumber;
                   let courseHoleNo                   = holeNo - ((score.whichNine - 1) * 9);
                   courseScore['hole' + courseHoleNo] = score.actualScore;
                   courseScore['holeInfo' + courseHoleNo].holeIndex = score.holeIndex;
               });
            courseScores.push(courseScore);
        });
        this.playerScores = courseScores;
        this._calculateTotals();
    }

    onSearch(text: string) {
        this.searchStringChanged.next(text);
    }

    onFocus(event, colIndex: number, whichNine: number) {
        if (event && event.currentTarget) {
            event.currentTarget.select();
        }
    }

    onKeyUp(event, colIndex: number, whichNine: number) {
        if (event && event.currentTarget && (event.keyCode && 
            ((event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 96 && event.keyCode <= 105)))) {
            let val = event.currentTarget.value;
            this.dataChanged = true;
            if (val > 1) {
                this.focusNextElement();
            }
            this._calculateTotals();
        }
    }

    onSaveClick() {
        //first transfer the score to scorecard.
        let prs = this.playerScorecard.playerRoundScores[0];
        let empty = 0;
        this.playerScores.forEach(cs=>{
            for(let i=1; i<=9;i++){
                if(!cs['hole'+i]) empty++;
            }
        });
        // if(empty > 0){
        if(empty === 18) {
            this.messages.push({
                severity: 'error',
                detail  : 'Enter all scores before saving.'
            });
            return;
        }
        prs.scores.forEach(score => {
            let courseScore   = this.playerScores[score.whichNine - 1];
            let courseHoleNo  = score.holeNumber - ((score.whichNine - 1) * 9);
            score.actualScore = courseScore['hole' + courseHoleNo];
        });
        //The scores are transfered. Now save it
        // this.scorecardService.saveManualScoring(this.competitionId,
        //     this.scoringRound, this.selectedPlayer.playerId,
        //     this.playerScorecard)
        //     .subscribe((result: ServerResult) => {
        //         if (result.success) {
        //             this.flights.forEach(flight=>{
        //                 flight.flightMembers.forEach(fm=>{
        //                     if(fm.playerId === this.selectedPlayer.playerId)
        //                         fm.status = 'Completed';
        //                 });
        //             })
        //             this.messages.push({
        //                 severity: 'info',
        //                 detail  : 'Saved the scores for ' + this.selectedPlayer.playerName + " successfully"
        //             });
        //             this.cancelScoring();
        //         }
        //     });

        
        let leanScorecard = getLeanScorecard(this.playerScorecard, this.selectedPlayer.playerId);
        let zipped: any = zipScorecard(leanScorecard);
        this.scorecardService.saveScorecard(this.competitionId,
            this.scoringRound, this.selectedPlayer.scoringPlayerId,
            zipped)
            .subscribe((result: ServerResult) => {
                if (result.success) {
                    this.flights.forEach(flight=>{
                        flight.flightMembers.forEach(fm=>{
                            if(fm.playerId === this.selectedPlayer.playerId)
                                fm.status = 'Completed';
                        });
                    })
                    this.messages.push({
                        severity: 'info',
                        detail  : 'Saved the scores for ' + this.selectedPlayer.playerName + " successfully"
                    });
                    this.cancelScoring();
                }
            });
    }


    onCancelClick() {
        if(this.dataChanged)
            this.confirmService.confirm({
                message: "You will loose all unsaved scores. Do you want to continue?"
            });
        else this.cancelScoring();

    }

    cancelScoring() {
        //Cancel the scoring aspect
        this.selectedPlayer  = null;
        this.playerScorecard = null;
        this.playerScores    = [];
        this.flightsPanel.expand(null);

        this.confirm.hide();
    }

    doNotCancelScoring() {
        this.confirm.hide();
    }

    private _filter() {
        console.debug("flights : ", this.flights)
        this.filteredFlights = this.flights.filter(flight => {
            if (flight.flightNumber.toLowerCase().indexOf(this.searchString.toLocaleLowerCase()) >= 0)
                return true;
            //Check the flight members
            let flightMembers = flight.flightMembers.filter(fm => {
                return fm.playerName.toLowerCase().indexOf(this.searchString.toLowerCase()) >= 0;
            })
            return flightMembers && flightMembers.length;
        });
    }

    private _calculateTotals() {
        this.playerScores.forEach(nine => {
            nine.total = 0;
            for (let i = 1; i <= 9; i++) {
                let score = nine['hole' + i];
                if (score) nine.total += score;
            }
        });
    }

    focusNextElement() {
        //add all elements we want to include in our selection
        let focussableElements = 'a:not([disabled]), button:not([disabled]), input[type=number]:not([disabled]), [tabindex]:not([disabled]):not([tabindex="-1"])';
        if (document.activeElement && document.activeElement['form']) {
            let focussable = Array.prototype.filter.call(document.activeElement['form'].querySelectorAll(focussableElements),
                function (element) {
                    //check for visibility while always include the current activeElement
                    return element.offsetWidth > 0 || element.offsetHeight > 0 || element === document.activeElement
                });
            let index      = focussable.indexOf(document.activeElement);
            if (focussable[index + 1])
                focussable[index + 1].focus();
            else
                focussable[0].focus();
        }
    }

    focusFirstElement() {
        let scoreForm          = this.elementRef.nativeElement.querySelector('form');
        let focussableElements = 'a:not([disabled]), button:not([disabled]), input[type=number]:not([disabled]), [tabindex]:not([disabled]):not([tabindex="-1"])';
        let focussable         = Array.prototype.filter.call(scoreForm.querySelectorAll(focussableElements),
            function (element) {
                //check for visibility while always include the current activeElement
                return element.offsetWidth > 0 || element.offsetHeight > 0 || element === document.activeElement
            });
        if (focussable && focussable.length) focussable[0].focus();
    }
}
interface HoleInfo {
    courseHoleNo: number;
    gameHoleNo: number;
    score: number;
    holeIndex: number;
    holePar: number;
}
interface CourseScore {
    whichNine: number;
    courseName: string;
    hole1?: number;
    hole2?: number;
    hole3?: number;
    hole4?: number;
    hole5?: number;
    hole6?: number;
    hole7?: number;
    hole8?: number;
    hole9?: number;
    total?: number;
    holeInfo1?: HoleInfo;
    holeInfo2?: HoleInfo;
    holeInfo3?: HoleInfo;
    holeInfo4?: HoleInfo;
    holeInfo5?: HoleInfo;
    holeInfo6?: HoleInfo;
    holeInfo7?: HoleInfo;
    holeInfo8?: HoleInfo;
    holeInfo9?: HoleInfo;

}
