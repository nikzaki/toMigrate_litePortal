import {Component, OnInit, ViewChild, ViewEncapsulation, OnDestroy} from '@angular/core';
import {SelectItem, Message, OverlayPanel} from 'primeng/primeng';
import {Competition} from '../../models/mygolf/competition/competition';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/timer';
import {Subscription} from 'rxjs/Subscription';
import {MobileDevice} from '../../models/mygolf/mobile-device';
import {Router, ActivatedRoute} from '@angular/router';
import {CompetitionService} from '../../services/competition.service';
import {SystemMessageActions} from '../../redux/messages/system-message-actions';
import {Util} from '../../util';
import {CompetitionDetails} from '../../models/mygolf/competition/competition-details';
import {CompetitionFlightStatus} from '../../models/mygolf/competition/competition-flight-status';
import {DeviceService} from '../../services/device.service';
import {Flight} from '../../models/mygolf/competition/competition-flight';
import {NotificationService} from '../../redux/notifications/notification-service';
import {ScoringNotification} from '../../models/session/user-notifications';
@Component({
    selector   : 'monitor-scoring',
    templateUrl: './monitor-scoring.component.html',
    styleUrls  : ['./monitor-scoring.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class MonitorScoringComponent implements OnInit, OnDestroy {
    competitionId: number;
    monitoring: Competition;
    compDetails: CompetitionDetails;
    roundNo: number;

    autoRefresh: boolean         = true;
    autoRefreshFrequency: number = 5;
    refreshTimer: Observable<number>;
    refreshSubscription: Subscription;

    displayMode: string          = 'grid';
    currentView: string         = 'monitor';
    filterText: string           = '';
    showSubmitted: boolean       = true;
    showPending: boolean         = true;
    showWithdrawn: boolean       = false;
    flightStatus: CompetitionFlightStatus[] = [];
    // competitionScorers: any[]               = [];
    competitionFlights: Flight [] = [];
    // competitionLocks: any[]                 = [];
    data: any = {};
    deviceAssignments: any [] = [];

    favoriteDevices: MobileDevice[]         = [];
    scoringNotifications: Observable<ScoringNotification[]>;
    userEmail: string                       = '';
    password: string                        = '';
    // @ViewChild(CompetitionFlightStatusComponent) flightStatus: CompetitionFlightStatusComponent;
    @ViewChild('deviceoverlay') deviceOverlay: OverlayPanel;

    constructor(private router: Router,
        private route: ActivatedRoute,
        private messageActions: SystemMessageActions,
        private competitionService: CompetitionService,
        private notfService: NotificationService,
        private deviceService: DeviceService) {
        this.scoringNotifications = this.notfService.scoringNotifications()
                                        .map( (notfs: ScoringNotification[])=>{
                                            if(this.competitionId)
                                                return notfs.filter(notf=>notf['competitionId']===this.competitionId);
                                            else
                                                return notfs;
                                        });
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.competitionId = +params['competitionId'];
            // this.roundNo       = +params['roundNo'];
            this.listFavoriteDevices()
                .subscribe((totalFavorites)=>{
                    this.refreshCompetition();
                    this._setupAutoRefresh();
                },(error)=>{
                    let msg = Util.getErrorMessage(error, 'Error getting favorite device list');
                    this.messageActions.errorGrowl(msg);
                });

        });

    }

    ngOnDestroy(): void {
        this._stopRefresh();
    }

    refreshScores() {
        if (this.monitoring && this.roundNo) {
            this.competitionService.getFlightStatus(this.competitionId, this.roundNo)
                .subscribe((flightStatus: CompetitionFlightStatus[]) => {
                    this.flightStatus = flightStatus;
                    this.deviceService.getCompetitionLocks(this.competitionId, this.roundNo)
                        .subscribe((compLocks: any[])=>{
                            // this.competitionLocks = compLocks;
                            // this._applyLocks();
                            this.data = {
                                competitionLocks: compLocks,
                                flights: this.filter()
                            };
                        });
                }, (error) => {
                    let msg = Util.getErrorMessage(error, "Error getting flight scoring status");
                    this.messageActions.error(msg);
                });
        }
    }
    handleFrequencyChange(event) {
        this._setupAutoRefresh();
    }
    filterChanged(filterText){
        this.filterText = filterText;
    }
    showDeviceStatus($event) {
        this.deviceOverlay.show($event);
    }
    private refreshCompetition() {
        this.competitionService.getCompetitionInfo(this.competitionId)
            .subscribe((compInfo: Competition) => {
                this.monitoring = compInfo;
                if (!this.roundNo) {
                    this.competitionService.getCompetitionDetails(this.competitionId)
                        .subscribe((details: CompetitionDetails) => {
                            this.compDetails = details;
                            this.roundNo     = details.roundInProgress;
                            this._refreshFlights();
                        },(error)=>{
                            let msg = Util.getErrorMessage(error, "Error getting competition details");
                            this.messageActions.errorGrowl(msg);
                        });
                } else {
                    this._refreshFlights();
                }
            }, (error) => {
                let msg = Util.getErrorMessage(error,
                    "Error getting competition information for id " + this.competitionId);
                this.messageActions.error(msg);
            });
    }

    private _refreshFlights() {
        this.competitionService.getCompetitionFlights(this.competitionId, this.roundNo)
            .subscribe((flights: Flight []) => {
                this.competitionFlights = flights;
                //get the current assignments
                this.deviceService.getDeviceAssignments(this.competitionId, this.roundNo)
                    .subscribe((assignments: any[])=>{
                        this.deviceAssignments = assignments;
                    })
            },(error)=>{
                let msg = Util.getErrorMessage(error, 'Error getting competition flights');
                this.messageActions.errorGrowl(msg);
            });
    }
    private listFavoriteDevices(): Observable<number> {
        return this.deviceService.listFavorites()
            .map((favorites: MobileDevice[])=>{
                this.favoriteDevices = favorites;
                return this.favoriteDevices.length;
            });
    }
    private deriveFlightsByScorer(flights: Flight[]): any [] {
        let scorerByFlight: any[] = [];
        flights.forEach(flight => {
            //For each member
            flight.flightMembers
                  .filter(fm => fm.scorer)
                  .forEach(fm => {
                      let scorer: any = {
                          flight    : flight.flightNumber,
                          playerId  : fm.playerId,
                          playerName: fm.playerName,
                          device    : null,
                          loggedIn  : false
                      };
                      scorerByFlight.push(scorer);
                  });
        });
        return scorerByFlight;

    }


    private _setupAutoRefresh(){
        this._stopRefresh();

        this.refreshTimer = Observable.timer(2000,
            this.autoRefreshFrequency * 1000);
        this.refreshSubscription = this.refreshTimer.subscribe((val:number)=>{
            // console.log("Refreshing " + val);
            if(this.monitoring && this.roundNo && this.autoRefresh){
                this.refreshScores();
            }

        });
    }
    private _stopRefresh(){
        if(this.refreshSubscription && !this.refreshSubscription.closed){
            this.refreshSubscription.unsubscribe();
        }
    }

    public filter(){
        let filteredFlights = this.flightStatus.filter((flight: CompetitionFlightStatus)=>{

            if(!this.showSubmitted && flight.submitted) return false;
            if(!this.showPending && !flight.submitted) return false;
            if(!this.showWithdrawn && flight.withdrawn) return false;
            //Now check the filter text
            if(this.filterText) {
                return flight.flightNumber.indexOf(this.filterText) >= 0
                    || flight.playerName.indexOf(this.filterText) >= 0
                    || flight.scorerName.indexOf(this.filterText) >= 0
                    || (flight.buggyNumber && flight.buggyNumber.indexOf(this.filterText) >= 0);
            }
            else return true;
        });
        return filteredFlights;
    }
}
