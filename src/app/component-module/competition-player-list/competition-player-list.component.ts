import {Component, OnInit, Input, OnChanges, SimpleChanges, ViewEncapsulation, ViewChild} from '@angular/core';
import {CompetitionPlayer} from '../../models/mygolf/competition/competition-player';
import {Util} from '../../util';
import {OverlayPanel} from 'primeng/primeng';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs/Observable';
import {Competition} from '../../models/mygolf/competition/competition';
import {Team} from '../../models/mygolf/competition/team';
@Component({
    selector   : 'competition-player-list',
    templateUrl: './competition-player-list.component.html',
    styleUrls  : ['./competition-player-list.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class CompetitionPlayerListComponent implements OnInit, OnChanges {
    @Input() competition: Competition;
    @Input() competitionPlayers: CompetitionPlayer[] = [];
    /**
     * Specifies whether to group players by category
     */
    @Input() grouped: boolean;
    @Input() teams: Team[]                           = [];
             groupedPlayers: any;
             groups: string [] ;
             teamsMap: any                              = {};
             stillRegistered: CompetitionPlayer[]    = [];
             currentPlayer: CompetitionPlayer;
             playerDatabase: PlayerDatabase          = new PlayerDatabase();
             displayedColumns                        = ['player','handicap', 'status'];
    @ViewChild('playerInfo')
             infoPanel: OverlayPanel;
    constructor() {
    }

    ngOnInit() {
    }

    ngOnChanges(changes: SimpleChanges): void {
        if((changes.competitionPlayers || changes.grouped || changes.competition || changes.teams)) {
            this._group();
        }
    }
    private _group() {
        if(this.competition && this.competition.teamEvent && this.teams){
            this._groupTeams();
        }
        else if(this.competition && this.competitionPlayers){
            this._groupPlayers();
        }

    }
    private _groupTeams() {
        this.playerDatabase.datasources = this.playerDatabase.datasources.splice(0,
            this.playerDatabase.datasources.length);
        this.groups = [];
        if(this.teams){
            this.teams.forEach(team=>{
                this.groups.push(team.teamName);
                this.teamsMap[team.teamName] = team;
                let dataSource            = new PlayerDataSource();
                let players               = team.teamPlayers.map(tp=>{
                    let compPlayer = this.competitionPlayers.filter(cp=>{
                        return cp.playerId === tp.teamPlayerId
                    }).pop();
                    return compPlayer;
                }).filter(cp=>cp!=null);
                dataSource.players        = players;
                this.playerDatabase.addDataSource(team.teamName, dataSource);
            });
        }

    }
    private _groupPlayers() {
        this.competitionPlayers.forEach(player=>{
            if(!player.category) player.category = 'No Category';
        });
        this.stillRegistered = this.competitionPlayers.filter(p=>{
            return p.playerStatus === 'Registered';
        });
        this.playerDatabase.datasources = this.playerDatabase.datasources.splice(0,
            this.playerDatabase.datasources.length);
        if(this.grouped){
            this.groupedPlayers = Util.groupBy(this.competitionPlayers, 'category');

            for(let group in this.groupedPlayers){
                let datasource = new PlayerDataSource();
                datasource.players = this.groupedPlayers[group]
                this.playerDatabase.addDataSource(group, datasource);
            }
            this.groups = [];
            for(let group in this.groupedPlayers){
                this.groups.push(group);
            }
            if(this.groups.length == 0 ||
                this.groups.length===1 )
                this.grouped = false;
        }
        else {
            let datasource = new PlayerDataSource();
            datasource.players = this.competitionPlayers;
            this.playerDatabase.addDataSource("No Category", datasource);
            this.groupedPlayers = null;
            this.groups = null;
        }
    }

    onPlayerClick($event, player: CompetitionPlayer) {
        this.currentPlayer = player;
        this.infoPanel.show($event);
    }
    onHide() {
        this.currentPlayer = null;
    }
}
type CategoryDataSource = {
    category: string;
    dataSource: PlayerDataSource;
}
class PlayerDatabase {
    datasources: CategoryDataSource[] = [];

    addDataSource(category: string, dataSource: PlayerDataSource){
        this.datasources.push({
            category: category,
            dataSource: dataSource
        });
    }
    getDataSource(category: string): PlayerDataSource {
        let result = this.datasources.filter(x=>x.category===category)
            .pop();
        if(result) return result.dataSource;
        else return null;
    }
}
class PlayerDataSource extends DataSource<CompetitionPlayer> {
    players: CompetitionPlayer[] = [];
    connect(): Observable<CompetitionPlayer[]> {
        return Observable.of(this.players);
    }
    disconnect(): void {
    }
}
