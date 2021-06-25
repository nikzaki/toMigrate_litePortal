import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {ObservableMedia} from '@angular/flex-layout';
import {Competition, CompetitionDetails, HoleScore} from '../../models/mygolf/competition';
import {TeamPlayerScores} from '../../models/mygolf/competition/team-player-scores';
import {TeamScores} from '../../models/mygolf/competition/team-scores';

@Component({
    selector     : 'app-team-expand',
    templateUrl  : './team-expand.component.html',
    styleUrls    : ['./team-expand.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class TeamExpandComponent implements OnInit {
    @Input() competition: Competition;
    @Input() competitionDetails: CompetitionDetails
    @Input() teamScores: TeamScores;
             view: string                    = 'round';
             // rounds: GameRound []            = [];
             // roundScores: TeamRoundScores [] = [];
             // coachView: any[]                = [];
             selectedRound: number = 1;
             firstNineCols: any[]            = [];
             secondNineCols: any[]           = [];
             _18Holes: any[];
             whichNine: number = 1;

    constructor(private media: ObservableMedia) {
        // this.scoreLegends = this.amateurLegends;
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
        this._18Holes       = [...this.firstNineCols, ...this.secondNineCols];
    }

    ngOnInit() {
    }

    isMobile() {
        return this.media.isActive('xs') || this.media.isActive('sm') || this.media.isActive('md');
    }

    getCols(): any[] {
        if (this.isMobile()) {
            if (this.whichNine === 1) {
                return this.firstNineCols;
            } else {
                return this.secondNineCols;
            }
        } else {
            return this._18Holes;
        }
    }

    getParScores() {
        //Get the selected round
        const roundScores = this.teamScores.roundScores[this.selectedRound - 1];
        let scores        = roundScores.playerScores[0].scores;
        let parScores     = [];
        if (this.isMobile()) {
            scores = (this.whichNine === 1)
                ? roundScores.playerScores[0].scores.slice(0, 9)
                : roundScores.playerScores[0].scores.slice(9);
        }
        scores.forEach(score => {
            parScores.push(score.parScore);
        });
        return parScores;
    }

    getPlayerScores(pr: TeamPlayerScores) {
        let holeScores: HoleScore[] = pr.scores;
        if (this.isMobile()) {
            holeScores = (this.whichNine === 1)
                ? pr.scores.slice(0, 9)
                : pr.scores.slice(9);
        }
        return holeScores;
    }

    deriveScoreClass(s) {
        if ((s.parScore - s.grossScore) == 0) {
            return "par-score";
        } else if ((s.parScore - s.grossScore) == 1) {
            return "birdie-score";
        } else if ((s.parScore - s.grossScore) == 2) {
            return "eagle-score";
        }
    }

    deriveParClass(pr) {
        if ((pr.toPar) < 0) {
            return "under-par";
        } else if ((pr.toPar) > 0) {
            return "above-par";
        } else if ((pr.toPar) == 0) {
            return "on-par";
        }
    }

    selectRound(r) {
        this.selectedRound = r;
    }
}
