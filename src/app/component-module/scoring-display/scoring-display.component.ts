import {
    Component, OnInit, Input, OnChanges, SimpleChanges, ViewChild, AfterViewInit, OnDestroy,
    ViewEncapsulation
} from '@angular/core';
import {CompetitionFlightStatus} from '../../models/mygolf/competition/competition-flight-status';
import {OverlayPanel} from 'primeng/primeng';
import {Subject} from 'rxjs/Subject';
import {Subscription} from 'rxjs/Subscription';
@Component({
    selector   : 'scoring-display',
    templateUrl: './scoring-display.component.html',
    styleUrls  : ['./scoring-display.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ScoringDisplayComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {
    // flights: CompetitionFlightStatus[] = [];
    // competitionLocks: Array<any> = [];
    @Input() data: any = {};
    @Input() displayMode: string = 'grid';
    groupedFlights: Array<any> = [];
    byFlight: Array<any> = [];

    @ViewChild('playerScoreOverlay')
    playerScoresOverlay: OverlayPanel;

    blinkOn: boolean = false;
    playerScores: any[] = [];

    dataRefreshed: Subject<boolean> = new Subject<boolean>();

    private dataRefreshSubscription: Subscription;

    constructor() {
    }

    ngOnInit() {
    }

    ngOnChanges(changes: SimpleChanges): void {
        // if(changes.flights || changes.competitionLocks){
        //     this.groupFlightStatus();
        //     this.groupByFlight();
        // }
        if(changes.data ){
            if(this.data.competitionLocks && this.data.flights){
                this.groupFlightStatus();
                this.groupByFlight();
                this.dataRefreshed.next(true);
            }

        }
    }
    ngAfterViewInit(){
        this.dataRefreshSubscription = this.dataRefreshed.subscribe(()=>{
            this.blinkOn = true;
            setTimeout(()=>{
                this.blinkOn = false;
            }, 600);
        });
    }

    ngOnDestroy(): void {
        if(this.dataRefreshSubscription)
            this.dataRefreshSubscription.unsubscribe();
    }

    private groupFlightStatus(){
        let grouped = [];
        let groupCount = 0;
        let lastGroup = ''
        this.data.flights.forEach(flight=>{
            let curGroup = flight.flightNumber+" / " + flight.scorerName;
            if(lastGroup !== curGroup){
                groupCount++;
                lastGroup = curGroup
            }
            let obj = Object.assign({sortField: curGroup, groupCount: groupCount}, flight);
            let lock = this.data.competitionLocks.filter(l=>{
                return l.scorerId === flight.scorerId;
            }).pop();
            if(lock) {
                obj = Object.assign({}, obj, {
                    deviceName: lock.deviceName,
                    deviceId: lock.deviceId,
                    batteryLevel: lock.batteryLevel
                });
                lock.scorerName = flight.scorerName;
            }
            grouped.push(obj);
        });
        this.groupedFlights = grouped;
    }
    private groupByFlight() {
        let byFlight: Array<any> = new Array();
        this.data.flights.forEach(flight=> {
            let curRec: any = byFlight.filter(c=>c['flight'] === flight.flightNumber)
                                      .pop();
            if(!curRec) {
                curRec = Object.assign({}, {
                    flight: flight.flightNumber,
                    startingHole: flight.startingHole,
                    players: []
                });
                byFlight.push(curRec);
            }
            let player = Object.assign({}, {
                playerId: flight.playerId,
                playerName: flight.playerName,
                buggy: flight.buggyNumber,
                playerRoundId: flight.playerRoundId,
                holesPlayed: flight.holesPlayed,
                grossScore: flight.grossScore,
                netScore: flight.netScore,
                scorerId: flight.scorerId,
                scorerName: flight.scorerName,
                lastHoleScored: flight.lastHoleScored,
                submitted: flight.submitted,
                withdrawn: flight.withdrawn,
                scores: flight.scores
            });
            let lock = this.data.competitionLocks.filter(l=>{
                return l.scorerId === flight.scorerId;
            }).pop();
            if(lock) {
                player = Object.assign(player, {
                    deviceName: lock.deviceName,
                    deviceId: lock.deviceId,
                    batteryLevel: lock.batteryLevel
                });
            }
            curRec.players.push(player);
        });
        this.byFlight = byFlight;
    }

    showPlayerScores(event, player) {
        let holes = Object.keys(player.scores);
        let curRow: any = {
            nine: 1
        };
        let rows = [];
        holes.forEach(h=>{
            let holeNo = parseInt(h);
            let nine = (holeNo <= 9)?1
                :(holeNo <= 18)?2
                           :(holeNo <= 27)?3
                     :4;
            let nineHole = holeNo - ((nine-1) * 9)
            if(nine !== curRow.nine){
                rows.push(curRow);
                curRow = Object.assign({}, {nine: nine});
            }
            curRow[nineHole+''] = player.scores[h+''];
        });
        rows.push(curRow);
        console.log("Total Holes " + holes.length);
        this.playerScores = rows;
        // this.playerScores = player.scores;
        this.playerScoresOverlay.show(event);

    }
}
