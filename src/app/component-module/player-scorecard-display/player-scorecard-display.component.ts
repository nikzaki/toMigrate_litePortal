import {Component, OnInit, Input, OnChanges, SimpleChanges, ViewEncapsulation} from '@angular/core';
import {CompetitionGameRound} from '../../models/mygolf/competition/competition-game-round';
import {PlayerService} from '../../services/player.service';
import {Player} from '../../models/mygolf/player/player';
import {LegendItem} from '../legend-display/legend-item';

@Component({
    selector     : 'player-scorecard-display',
    templateUrl  : './player-scorecard-display.component.html',
    styleUrls    : ['./player-scorecard-display.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class PlayerScorecardDisplayComponent implements OnInit, OnChanges {
    @Input() colorSet: string = 'amateur';
    @Input() rounds: CompetitionGameRound[] = [];
    @Input() hideNetRow: boolean;
    @Input() playerId: number;
    @Input() competitionId: number;
             scores: any[]                  = [];
             firstNineCols: any []          = [];
             secondNineCols: any[]          = [];
             multiSortMeta                  = [{field: 'round', order: 1},
                                               {field: 'sequence', order: 1}];

             scoreLegends: LegendItem[]     = [];
             player: Player;
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
    constructor(private playerService: PlayerService) {
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
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.rounds) {
            this.prepareScorecardDisplay();
        }
        else if(changes.hideNetRow) {
            this.prepareScorecardDisplay();
        }
        if(changes.colorSet) {
            if(this.colorSet === 'amateur'){
                this.scoreLegends = this.amateurLegends;
            } else {
                this.scoreLegends = this.professionalLegends;
            }
        }
        if (changes.playerId) {
            this.playerService.getPlayerInfo(this.playerId)
                .subscribe(player => {
                    this.player = player;
                });
        }
    }

    deriveRowClass(row: any) {
        let rowType = row['rowType'];
        if (rowType === 'Par') {
            return 'par-row';
        } else if (rowType === 'Index') {
            return 'index-row';
        }
        // else if(rowType === 'Gross' || rowType === 'Net'){
        //     return this.colorSet;
        // }
        else {
            return '';
        }
    }

    getScoreClass($toPar: number, $score: number) {
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

    private prepareScorecardDisplay() {
        let rows: any [] = [];
        if (this.rounds) {
            this.rounds.forEach(round => {
                let parRow: any       = {};
                parRow['round']       = "R" + round.roundNo;
                parRow['rowType']     = 'Par';
                parRow['sequence']    = 2;
                parRow['courseNames'] = round.courseNames;
                parRow['outTotal']    = null;
                parRow['inTotal']     = null;
                round.nines.forEach(nine => {
                    nine.scores.forEach(score => {
                        parRow["s" + score.holeNo] = score.parScore;
                    });
                });
                parRow['sortField']   = "R" + round.roundNo + "_1";
                let idxRow: any       = {};
                idxRow['round']       = "R" + round.roundNo;
                idxRow['rowType']     = 'Index';
                idxRow['sequence']    = 1;
                idxRow['courseNames'] = round.courseNames;
                idxRow['outTotal']    = null;
                idxRow['inTotal']     = null;
                round.nines.forEach(nine => {
                    nine.scores.forEach(score => {
                        idxRow["s" + score.holeNo] = score.index;
                    });
                });
                idxRow['sortField']     = "R" + round.roundNo + "_2";
                let scoreRow: any       = {};
                scoreRow['round']       = "R" + round.roundNo;
                scoreRow['rowType']     = 'Gross';
                scoreRow['sequence']    = 3;
                scoreRow['courseNames'] = round.courseNames;
                scoreRow['outTotal']    = round.outTotal;
                scoreRow['inTotal']     = round.inTotal;
                round.nines.forEach(nine => {
                    nine.scores.forEach(score => {
                        scoreRow["s" + score.holeNo]     = score.grossScore;
                        scoreRow['toPar' + score.holeNo] = score.toPar;
                    });
                });

                scoreRow['sortField'] = "R" + round.roundNo + "_3";
                let netRow: any       = {};
                netRow['round']       = "R" + round.roundNo;
                netRow['rowType']     = 'Net';
                netRow['sequence']    = 4;
                netRow['courseNames'] = round.courseNames;
                netRow['outTotal']    = round.outTotalNet;
                netRow['inTotal']     = round.inTotalNet;
                round.nines.forEach(nine => {
                    nine.scores.forEach(score => {
                        netRow["s" + score.holeNo]     = score.netScore;
                        netRow['toPar' + score.holeNo] = score.toParNet;
                    });
                });
                netRow['sortField'] = "R" + round.roundNo + "_4";
                rows.push(parRow);
                rows.push(idxRow);
                rows.push(scoreRow);
                if(!this.hideNetRow){
                    rows.push(netRow);
                }

            });
        }
        this.scores = rows;
    }
}
