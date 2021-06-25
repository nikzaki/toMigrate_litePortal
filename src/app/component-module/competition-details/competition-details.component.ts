import {Component, OnInit, ViewEncapsulation, ViewChild} from '@angular/core';
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
}
export class GameRoundDataSource extends DataSource<GameRound> {
    gameRounds: GameRound[] = [];

    connect(collectionViewer: CollectionViewer): Observable<GameRound[]> {
        return Observable.of(this.gameRounds);
    }

    disconnect(collectionViewer: CollectionViewer): void {
    }
}
