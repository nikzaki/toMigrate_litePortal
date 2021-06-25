import {Component, OnInit, ViewEncapsulation, Input, OnChanges, SimpleChanges} from '@angular/core';
import {TeamScores} from '../../models/mygolf/competition/team-scores';
import {Competition, CompetitionDetails} from '../../models/mygolf/competition';
import {GameRound} from '../../models/mygolf/gameround';
import {TeamRoundScores} from '../../models/mygolf/competition/team-round-scores';
import {TeamPlayerScores} from '../../models/mygolf/competition/team-player-scores';
import {LegendItem} from '../legend-display/legend-item';

@Component({
    selector   : 'team-score-details',
    templateUrl: './team-score-details.component.html',
    styleUrls  : ['./team-score-details.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class TeamScoreDetailsComponent implements OnInit, OnChanges {
    @Input() competition: Competition;
    @Input() competitionDetails: CompetitionDetails
    @Input() teamScores: TeamScores;
    @Input() colorSet: string = 'amateur';
    view: string = 'round';
    rounds: GameRound [] = [];
    roundScores: TeamRoundScores [] = [];
    coachView: any[] =[];
    selectedRound:  number;
    firstNineCols: any[] = [];
    secondNineCols: any[] = [];
    scoreLegends: LegendItem[]     = [];
    private amateurLegends : LegendItem [] = [{label: 'Eagle', styleClass: 'eagle-score-icon'},
                                              {label: 'Birdie', styleClass: 'birdie-score-icon'},
                                              {label: 'Par', styleClass: 'par-score-icon'},
                                              {label: 'Bogey+', styleClass: 'bogey-score-icon'}];
    private professionalLegends: LegendItem[]     = [{label: 'Eagle', styleClass: 'eagle-score-icon'},
                                                     {label: 'Birdie', styleClass: 'birdie-score-icon'},
                                                     {label: 'Par', styleClass: 'par-score-icon'},
                                                     {label: 'Bogey', styleClass: 'bogey-score-icon'},
                                                     {label: 'Double Bogey', styleClass: 'double-bogey-score-icon'},
                                                     {label: 'Triple Bogey+', styleClass: 'triple-bogey-score-icon'}];
    constructor() {
        this.scoreLegends = this.amateurLegends;
        this.firstNineCols  = [
            {header: '1', field: '1'},
            {header: '2', field: '2'},
            {header: '3', field: '3'},
            {header: '4', field: '4'},
            {header: '5', field: '5'},
            {header: '6', field: '6'},
            {header: '7', field: '7'},
            {header: '8', field: '8'},
            {header: '9', field: '9'}
        ];
        this.secondNineCols = [
            {header: '10', field: '10'},
            {header: '11', field: '11'},
            {header: '12', field: '12'},
            {header: '13', field: '13'},
            {header: '14', field: '14'},
            {header: '15', field: '15'},
            {header: '16', field: '16'},
            {header: '17', field: '17'},
            {header: '18', field: '18'}
        ];
    }

    ngOnInit() {
        if(this.competitionDetails) this._onDetailsChange();
        if(this.teamScores)
            this._filterRoundScores();
    }
    ngOnChanges(changes: SimpleChanges): void {
        if(changes.competitionDetails){
            this._onDetailsChange();
        }
        if(changes.colorSet) {
            if(this.colorSet === 'amateur'){
                this.scoreLegends = this.amateurLegends;
            } else {
                this.scoreLegends = this.professionalLegends;
            }
        }
        if(changes.teamScores) {
            this._filterRoundScores();
        }
    }

    playerScoreDisplay(playerScores: TeamPlayerScores[]) {
        let display: any [] = [];
        let count = 1;
        playerScores.forEach(ps=>{
            if(!display.length) {
                let index: any = {}
                index.rowType = 'index';
                index.image = null;
                index.playerName = 'Index';
                index.qualified = true;
                ps.scores.forEach(s=>{
                    index[''+s.holeNo] = s.index;
                });
                // display.push(index);
                let par: any = {};
                par.sequence = 0;
                par.image = null;
                par.rowType = 'Par'
                par.playerName = '';
                par.qualified = true;
                par.out = ps.scores.filter(s=>s.whichNine===1)
                                 .map(s=>s.parScore)
                                 .reduce((a,b)=>{
                                     return a+b;
                                 },0);
                par.in = ps.scores.filter(s=>s.whichNine===2)
                                .map(s=>s.parScore)
                                .reduce((a,b)=>{
                                    return a+b;
                                },0);
                par.tot = par.in + par.out;
                ps.scores.forEach(s=>{
                    par[''+s.holeNo] = s.parScore;
                });
                display.push(par);
            }
            let rowClasses = [];
            let grossRow: any = {};
            grossRow.sequence = count;
            grossRow.rowType = 'Gross';
            grossRow.image = ps.thumbnail?ps.thumbnail:ps.playerImage;
            grossRow.playerName = ps.playerName;
            grossRow.qualified = ps.qualified;
            grossRow.out = ps.outTotalGross;
            grossRow.in = ps.inTotalGross;
            grossRow.tot = ps.totalGross;
            ps.scores.forEach(score=>{
                grossRow[''+score.holeNo] = score.grossScore;
                grossRow['t'+score.holeNo] = score.toPar;
            });

            let toParRow: any = {};
            toParRow.rowType = '(+/-)';
            toParRow.sequence = count;
            toParRow.image = null;
            toParRow.playerName = ps.playerName;
            toParRow.qualified = ps.qualified;
            toParRow.out = ps.scores.filter(s=>s.whichNine===1 && !isNaN(s.toPar))
                             .map(s=>s.toPar)
                             .reduce((a,b)=>{
                                    return a+b;
                             },0);
            toParRow.in = ps.scores.filter(s=>s.whichNine===2&& !isNaN(s.toPar))
                             .map(s=>s.toPar)
                             .reduce((a,b)=>{
                                 return a+b;
                             },0);
            toParRow.tot = toParRow.in + toParRow.out;

            if(toParRow.out < 0 ) rowClasses.push('out-under');
            else if(toParRow.out>0) rowClasses.push('out-over');
            else rowClasses.push('out-on');

            if(toParRow.in < 0 ) rowClasses.push('in-under');
            else if(toParRow.in > 0) rowClasses.push('in-over');
            else rowClasses.push('in-on');

            if(toParRow.tot < 0 ) rowClasses.push('tot-under');
            else if(toParRow.tot > 0) rowClasses.push('tot-over');
            else rowClasses.push('tot-on');
            let rowClassStr = rowClasses.join(' ');
            ps.scores.forEach(score=>{
                toParRow[''+score.holeNo] = score.toPar;
                toParRow['t'+score.holeNo] = score.toPar;
            });
            grossRow.rowClasses = rowClassStr;
            toParRow.rowClasses = rowClassStr;
            display.push(grossRow);
            display.push(toParRow);

            // display.push(gapRow);
            count++;
        });
        return display;
    }
    deriveRowClass(row: any) {
        let rowType = row['rowType'];
        if (rowType === 'Par') {
            return 'par-row';
        } else if (rowType === 'index') {
            return 'index-row';
        } else if(rowType === '(+/-)'){
            return 'to-par ' + (row.rowClasses||'');
        } else if (rowType === 'Gross') {
            return 'gross-row ' + (row.rowClasses||'');
        }
        else {
            return '';
        }
    }
    getScoreClass(row: any, hdr: string) {
        let rowType = row['rowType'];
        if(rowType !== 'Gross') return '';
        let $toPar = row['t'+hdr];
        if ($toPar <= -2) {
            return 'eagle-score';
        } else if ($toPar == -1) {
            return 'birdie-score';
        } else if ($toPar === 0) {
            return 'par-score';
        } else if ($toPar === 1) {
            return 'bogey-score';
        } else if ($toPar === 2) {
            return 'double-bogey-score';
        } else if ($toPar >= 3) {
            return 'triple-bogey-score';
        } else {
            return '';
        }
    }
    getCoachViewRowClass(row: any) {
        if(row.toParTotal < 0)
            return 'under-par';
        else if(row.toParTotal > 0)
            return 'over-par';
        else return 'on-par';
    }
    private _onDetailsChange() {
        this.rounds = this.competitionDetails.gameRounds.filter(r=>{
            return r.status !== 'Pending';
        });
        this.selectedRound = this.competitionDetails.roundInProgress || this.rounds[this.rounds.length-1].roundNo;
    }
    private _filterRoundScores() {
        this.roundScores = this.teamScores.roundScores.filter(rs=>rs.status !== 'Pending');
        this._deriveCoachView();
    }
    private _deriveCoachView() {
        let display : any [] = [];
        let topNTotal: any = {
            playerName: 'Top ' + this.competition.considerTopN + ' Total',
            toParTotal: 0,
            toParNetTotal: 0,
            grossTotal: 0,
            netTotal: 0,
            totals: true
        };
        let total: any = {
            playerName: 'Total',
            toParTotal: 0,
            toParNetTotal: 0,
            grossTotal: 0,
            netTotal: 0,
            totals: true
        };
        this.roundScores.forEach(rs=>{
            let counter = 1;
            rs.playerScores.forEach(ps=>{
                let qualified = (counter <= this.competition.considerTopN);
                let player: any = display.filter(d=>{
                    return d.playerId === ps.playerId;
                }).pop();
                let nt = 'nt' + rs.roundNumber;
                let gt = 'gt' + rs.roundNumber;

                if(!player){
                    player = {
                        playerId: ps.playerId,
                        playerName: ps.playerName,
                        image: ps.thumbnail||ps.playerImage,
                        toParTotal: 0,
                        toParNetTotal: 0,
                        grossTotal: 0,
                        netTotal: 0
                    };
                    display.push(player);
                }
                player['q'+rs.roundNumber] = qualified;
                player[gt] = ps.totalGross||0;
                player[nt] = ps.totalNet||0;

                player['g'+rs.roundNumber] = ps.toPar||0;
                player['n'+rs.roundNumber] = ps.toParNet||0
                player['toParTotal'] += (ps.toPar||0);
                player['toParNetTotal'] += (ps.toParNet||0);
                player['grossTotal'] += (ps.totalGross||0);
                player['netTotal'] += (ps.totalNet || 0);
                counter++;
                if (!total['g' + rs.roundNumber]) {
                    total['g' + rs.roundNumber] = ps.toPar;
                } else {
                    total['g' + rs.roundNumber] += ps.toPar;
                }

                if(!total[gt]) {
                    total[gt] = ps.totalGross;
                }
                else {
                    total[gt] += ps.totalGross
                }

                if(!total[nt]) {
                    total[nt] = ps.totalNet;
                }
                else {
                    total[nt] += ps.totalNet
                }

                if (!total['n' + rs.roundNumber]) {
                    total['n' + rs.roundNumber] = ps.toParNet;
                } else {
                    total['n' + rs.roundNumber] += ps.toParNet;
                }
                total['toParTotal'] += ps.toPar;
                total['toParNetTotal'] += ps.toParNet;
                total['grossTotal'] += ps.totalGross;
                total['netTotal'] += ps.totalNet;
                if (qualified) {
                    if (!topNTotal['g' + rs.roundNumber]) {
                        topNTotal['g' + rs.roundNumber] = ps.toPar;
                    } else {
                        topNTotal['g' + rs.roundNumber] += ps.toPar;
                    }

                    if (!topNTotal['n' + rs.roundNumber]) {
                        topNTotal['n' + rs.roundNumber] = ps.toParNet;
                    } else {
                        topNTotal['n' + rs.roundNumber] += ps.toParNet;
                    }
                    if(!topNTotal[gt]) {
                        topNTotal[gt] = ps.totalGross;
                    }
                    else {
                        topNTotal[gt] += ps.totalGross
                    }

                    if(!topNTotal[nt]) {
                        topNTotal[nt] = ps.totalNet;
                    }
                    else {
                        topNTotal[nt] += ps.totalNet
                    }
                    topNTotal['toParTotal'] += ps.toPar;
                    topNTotal['toParNetTotal'] += ps.toParNet;
                    topNTotal['grossTotal'] += ps.totalGross;
                    topNTotal['netTotal'] += ps.totalNet;
                }
            });
        });
        display.sort((a, b)=>{
            if(a.playerName > b.playerName)
                return 1;
            else if(a.playerName < b.playerName)
                return -1;
            else return 0;
        });
        display.push(total);
        display.push(topNTotal);
        this.coachView = display;
    }

}
