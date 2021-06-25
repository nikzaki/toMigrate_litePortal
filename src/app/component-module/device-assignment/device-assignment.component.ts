import {Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, ViewChild} from '@angular/core';
import {MobileDevice} from '../../models/mygolf/mobile-device';
import {ConfirmationService, OverlayPanel} from 'primeng/primeng';
import {Flight} from '../../models/mygolf/competition/competition-flight';
import {DeviceService} from '../../services/device.service';
import {Router, ActivatedRoute} from '@angular/router';
import {CompetitionService} from '../../services/competition.service';
import {Competition} from '../../models/mygolf/competition/competition';
import {CompetitionDetails} from '../../models/mygolf/competition/competition-details';
import {SystemMessageActions} from '../../redux/messages/system-message-actions';
import {Util} from '../../util';
import {Observable} from 'rxjs/Observable';
import {ServerResult} from '../../models/server-result';

@Component({
    selector   : 'device-assignment',
    templateUrl: './device-assignment.component.html',
    styleUrls  : ['./device-assignment.component.scss']
})
export class DeviceAssignmentComponent implements OnInit, OnChanges {
    @Input() competitionId: number;
    @Input() competitionLocks: any [];
    @Input() flights: Flight[] = [];


    favoriteDevices: MobileDevice[] = [];
    currentAssignments: any [] = [];
    roundNumber: number;
    competition: Competition;
    competitionDetails: CompetitionDetails

    competitionScorers: any[] = [];
    availableDevices: MobileDevice[] = [];

    @Output() onSaveAssignments: EventEmitter<any> = new EventEmitter();
    @Output() onRemoveAssignment: EventEmitter<number> = new EventEmitter();
    @Output() onLogoffDevice: EventEmitter<any> = new EventEmitter();

    @ViewChild('assignable') assignmentOverlay: OverlayPanel;
    @ViewChild('startdevices') startDeviceOverlay: OverlayPanel;
    userEmail: string = '';
    password: string = '';
    currentScorer: any;
    constructor(private confirmService: ConfirmationService,
        private competitionService: CompetitionService,
        private deviceService: DeviceService,
        private messageActions: SystemMessageActions,
        private router: Router,
        private activatedRoute: ActivatedRoute) {
    }

    ngOnInit() {
        if(!this.competitionId) {
            this.activatedRoute.params.subscribe(params=>{
                if(params['competitionId']){
                    this.competitionId = +params['competitionId'];
                    this.refreshCompetition();
                }
            });
        }
        else {
            this.refreshCompetition();
        }
        this.listFavoriteDevices();

    }
    refreshCompetition(){
        if(this.competitionId){
            this.competitionService.getCompetitionInfo(this.competitionId)
                .subscribe(comp=>{
                    this.competition = comp;
                    this.competitionService.getCompetitionDetails(this.competitionId)
                        .subscribe(details=>{
                            this.competitionDetails = details;
                            this.roundNumber = this.competitionDetails.roundInProgress;
                            if(!this.roundNumber)
                                this.roundNumber = this.competitionDetails.nextRound;
                            this.deviceService.getDeviceAssignments(this.competitionId, this.roundNumber)
                                .subscribe(assignments=>{
                                    this.currentAssignments = assignments;
                                    this.applyAssignmentsAndLocks();
                                })
                        });
                },(error)=>{
                    Util.getErrorMessage(error, "Error getting competition information");
                })
        }
    }
    ngOnChanges(changes: SimpleChanges): void {
        if(changes.flights  || changes.competitionLocks) {
            this.applyAssignmentsAndLocks();
            // let compScorers = this._deriveFlightsByScorer(this.flights);
            // compScorers = this._applyCurrentAssignments(compScorers, this.currentAssignments);
            // this.competitionScorers = this._applyLocks(compScorers, this.competitionLocks);
            this._deriveAvailableDevices();
        }
        // if(changes.favoriteDevices || changes.competitionScorers)
        //     this._deriveAvailableDevices();
    }

    showDeviceAssignmentDialog($event, scorer: any) {
        this.availableDevices = this._deriveAvailableDevices();
        this.currentScorer = scorer;
        this.assignmentOverlay.show($event);
    }

    _beforeAssignmentDialog(event) {

    }

    _onSelectDevice(event) {
        if(this.currentScorer && event.data) {
            let selectedDevice: MobileDevice = event.data;
            this.currentScorer.device = selectedDevice;
            let assignments = [];
            assignments.push({
                scorer: this.currentScorer.playerId,
                device: selectedDevice.deviceId
            });
            this.saveAssignments(assignments);
            this.assignmentOverlay.hide();
        }
    }
    showStartDevice($event) {
        this.startDeviceOverlay.show($event);
    }
    _startDevices(){
        let toStart = [];
        this.competitionScorers
            .filter(scorer=>scorer.device)
            .forEach(scorer=>{
                toStart.push({
                    deviceId: scorer.device.deviceId,
                    flight: scorer.flight,
                    scorer: scorer.playerId
                });
            });
        //TODO gene
        this.deviceService.startDevices(this.competitionId,
            this.roundNumber, toStart,
            this.userEmail, this.password)
            .subscribe((result: ServerResult)=>{
                this.messageActions.infoGrowl('Sent notifications to devices for auto selecting scorers.');
                this._cancelStart();
            })

    }
    _cancelStart() {
        this.startDeviceOverlay.hide();
    }
    _afterAssignmentHide($event){
        this.currentScorer = null;
    }
    autoAssignDevices() {
        let flightCounter: any = {};
        let assignments: any[] = [];
        this.competitionScorers
            .filter(scorer=>!scorer.device)
            .forEach(scorer=>{
                let counter = flightCounter[scorer.flight];
                if(!counter) {
                    flightCounter[scorer.flight] = 2;
                    counter = 1;
                }
                else {
                    flightCounter[scorer.flight] = counter+1;
                }
                if(!scorer.device) {
                    let availableDevices = this._deriveAvailableDevices();
                    let key = scorer.flight + '-' + counter;
                    let deviceFound = availableDevices.filter(device=>{
                        return device.userTags && device.userTags.indexOf(key) >= 0;
                    }).pop();
                    if(deviceFound){
                        assignments.push({
                            scorer: scorer.playerId,
                            device: deviceFound.deviceId
                        });
                        scorer.device  = deviceFound;
                    }
                }
            });
        if(assignments.length)
            this.saveAssignments(assignments);
    }
    saveAssignments(assignments?: any[]){
        if(!assignments || !assignments.length){
            assignments = [];
            this.competitionScorers.forEach(scorer=>{
                if(scorer.device){
                    assignments.push({
                        scorer: scorer.playerId,
                        device: scorer.device.deviceId
                    });
                }
            });
        }


        this.deviceService.assignDevices(this.competitionId, this.roundNumber, assignments)
            .subscribe((assignments: any[])=>{
                this.currentAssignments = assignments;
                // this._applyCurrentAssignments(this.competitionScorers, assignments);
                this.applyAssignmentsAndLocks();
            })
    }
    removeAssignments($event, scorer: any) {
        this.confirmService.confirm({
            message: 'Are you sure that you want to remove this device assignment?',
            accept: () => {
                this.deviceService.removeAssignment(this.competitionId, this.roundNumber, scorer.playerId)
                    .subscribe((assignments: any[])=>{
                        scorer.device = null;
                        this.currentAssignments = assignments;
                        this.applyAssignmentsAndLocks();
                    });
            }
        });
    }

    /**
     * Fire an event to log off the device
     * @param $event
     * @param scorer
     */
    logoffDevice($event, scorer: any) {
        this.confirmService.confirm({
            message: 'Are you sure that you want to log off this device?',
            header: 'Logging Off Device',
            accept: ()=> {
                this.onLogoffDevice.emit({
                    playerId: scorer.playerId,
                    deviceId: scorer.device.deviceId
                });
                this.deviceService.logoutDevice(this.competitionId, this.roundNumber,
                    scorer.playerId, scorer.device.deviceId)
                    .subscribe(()=>{

                    })
            }
        });
    }
    private _deriveAvailableDevices(): MobileDevice[] {
        return this.favoriteDevices.filter(device=>{
            //Check whether it is assigned to any scorer
            let scorer = this.competitionScorers.filter(s=>{
                return s.device && s.device.deviceId === device.deviceId;
            }).pop();
            return !scorer
        });
    }
    private _deriveFlightsByScorer(flights: Flight[]): any [] {
        let scorerByFlight: any[] = [];
        flights.forEach(flight => {
            //For each member
            flight.flightMembers
                  .filter(fm => fm.scorer && fm.status !== 'Withdrawn')
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
    private _applyCurrentAssignments(compScorers: any[], currAssignments: any[]): any[] {
        let newCompScorers = [];
        compScorers.forEach(scorer=>{
            //Find the corresponding assignments
            let curAssgn = currAssignments.filter(assgn=>{
                return assgn.scorerId === scorer.playerId
            }).pop();
            if(curAssgn) {
                let curDevice = this.favoriteDevices.filter(fd=>fd.deviceId === curAssgn.deviceId).pop();
                scorer.device = curDevice;
            }
            newCompScorers.push(scorer);
        });
        return newCompScorers;
    }
    private _applyLocks(compScorers: any[], compLocks: any){
        if(compScorers &&  compLocks){
            let newScorers = [];
            compScorers.forEach(scorer=>{
                let lock = compLocks.filter(l=>{
                    return l.scorerId === scorer.playerId;
                }).pop();
                newScorers.push(Object.assign({}, scorer, {
                    loggedIn: (lock)?true: false
                }));

            });
            return newScorers;
        }
        else return compScorers;
    }
    private listFavoriteDevices() {
        return this.deviceService.listFavorites()
                   .subscribe((favorites: MobileDevice[])=>{
                       this.favoriteDevices = favorites;
                       this._deriveAvailableDevices();
                   });
    }
    private applyAssignmentsAndLocks(){
        let compScorers = this._deriveFlightsByScorer(this.flights);
        compScorers = this._applyCurrentAssignments(compScorers, this.currentAssignments);
        compScorers = this._applyLocks(compScorers, this.competitionLocks);
        this.competitionScorers = compScorers;
    }

}
