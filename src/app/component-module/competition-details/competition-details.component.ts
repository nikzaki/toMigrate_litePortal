import { FlightInfo } from './../../models/mygolf.data';
import {Component, OnInit, ViewEncapsulation, ViewChild, Input} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CompetitionService} from '../../services/competition.service';
import {Competition, CompetitionTeams, CompetitionDetails} from '../../models/mygolf/competition';
import {Util} from '../../util';
import {SystemMessageActions} from '../../redux/messages/system-message-actions';
import {TreeNode, TreeTable} from 'primeng/primeng';
import {Observable} from 'rxjs/Observable';
import "rxjs/add/operator/finally";
import {GameRound} from '../../models/mygolf/gameround';
import {DataSource, CollectionViewer} from '@angular/cdk/collections';
import {Subscription} from 'rxjs/Subscription';

@Component({
    selector   : 'competition-details',
    templateUrl: './competition-details.component.html',
    styleUrls  : ['./competition-details.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class CompetitionDetailsComponent implements OnInit {
    @Input() displayMode: string = 'grid';
    competitionId: number;
    competition: Competition;
    teams: CompetitionTeams;
    details: CompetitionDetails;
    peopleNodes: TreeNode[];
    @ViewChild('people')
    peopleTree: TreeTable;
    roundDataSource: GameRoundDataSource  =new GameRoundDataSource();
    displayedColumns = ['roundNo', 'courseNames', 'roundDate', 'status'];
    dataSource = new GameRoundDataSource();
    busy: Subscription;
    flightList: Array<FlightInfo>;
    constructor(private activeRoute: ActivatedRoute,
        private messageActions: SystemMessageActions,
        private competitionService: CompetitionService) {

    }

    ngOnInit() {
        this.activeRoute.params.subscribe(params => {
            this.competitionId = +params['competitionId'];
            this.refreshCompetition();
        });
    }
    ngAfterViewInit(){

    }
    refreshCompetition() {
        this.busy = this.competitionService.getCompetitionInfo(this.competitionId)
            .finally(()=>{
                console.log("Success");

            })
            .subscribe((comp: Competition) => {
                this.competition = comp;

                if (this.competition) {
                    this.refreshCompetitionDetails()
                        .subscribe(()=>{});
                    if(this.competition.teamEvent){
                        this.refreshTeams().subscribe(()=>{});
                    }
                    this.refreshFlightList()
                        .subscribe(()=>{});
                }
            }, (error) => {
                let errorMsg = Util.getErrorMessage(error, 'Error getting competition info');
                this.messageActions.error(errorMsg);
            },()=>{

            });
    }

    refreshCompetitionDetails(): Observable<boolean> {
        return this.competitionService.getCompetitionDetails(this.competitionId)
            .map((details: CompetitionDetails) => {
                if(details && details.prizes){
                    details.prizes.forEach(p=>{
                        if(p.scoreType === 'G') p.scoreType = 'Gross';
                        else if(p.scoreType === 'N') p.scoreType = 'Net';
                    })
                }
                this.details = details;
                this.roundDataSource.gameRounds.splice(0, this.roundDataSource.gameRounds.length);
                this.roundDataSource.gameRounds.push(...details.gameRounds);
                return true;
            });
    }
    refreshTeams(): Observable<boolean>{
        return this.competitionService.getCompetitionTeams(this.competitionId)
            .map((teams: CompetitionTeams)=>{
                this.teams = teams;
                return true;
            });
    }
    courses(courseNames: string[]) {
        return courseNames.reduce((prev, curr)=>{
            if(!prev)
                return curr;
            else
                return prev+', '+curr;
        },'');
    }

    compFlightDetails: any;
    roundNo: number = 1;
    refreshFlightList(): Observable<boolean>{
        return this.competitionService.getFlightList(this.competitionId, this.roundNo)
            .map((flightList: Array<FlightInfo>)=>{
                this.flightList = flightList; 
                this.compFlightDetails = {
                    listMode: 'viewFlights',
                    flights: this.flightList
                }
                return true;
            });
    }

    onSelectedRound(event,roundData,round) {
        console.debug("on selected round : ", event);
        console.debug("round data", roundData, round);
        if(!round) return;
        if(this.roundNo === round.roundNo) return;
        if(round) {
            this.selectedRound = round;
            this.roundNo = this.selectedRound.roundNo
            this.compFlightDetails = null;
            this.refreshFlightList()
            .subscribe(()=>{})
        }
    }

    selectedRound: any;
}
export class GameRoundDataSource extends DataSource<GameRound> {
    gameRounds: GameRound[] = [];

    connect(collectionViewer: CollectionViewer): Observable<GameRound[]> {
        return Observable.of(this.gameRounds);
    }

    disconnect(collectionViewer: CollectionViewer): void {
    }
}
