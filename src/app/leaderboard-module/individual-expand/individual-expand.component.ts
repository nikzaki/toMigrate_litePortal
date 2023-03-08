import {Component, Input, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {CompetitionGameRound, LeaderBoardPlayer} from '../../models/mygolf/competition';
import {CompetitionService} from '../../services/competition.service';
import {ObservableMedia} from '@angular/flex-layout';
import {Subscription} from 'rxjs/Subscription';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector     : 'app-individual-expand',
    templateUrl  : './individual-expand.component.html',
    styleUrls    : ['./individual-expand.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class IndividualExpandComponent implements OnInit, OnDestroy {
    // @Input() playerId: number;
    @Input() competitionId: number;
    @Input() player: LeaderBoardPlayer;
    @Input() playerName: string;
    @Input() test: string;
    @Input() enableToyota: boolean = false;
    compRounds: CompetitionGameRound[] = [];
             playerExpanded: boolean            = false;
             whichNine: number = 1;
    watcher: Subscription;
    mobileScreen: boolean;
    mqAlias: string;
    oldStyle: boolean;

    subscriptions: Subscription[] = [];

    holes: number[] = [1,2,3,4,5,6,7,8,9];
    constructor(private competitionService: CompetitionService, private media: ObservableMedia,
        private activeRoute: ActivatedRoute) {
        this.watcher = media.subscribe(change => {
            this.mqAlias = change?change.mqAlias:'';
            if(this.mqAlias === 'sm' || this.mqAlias === 'xs') {
                this.mobileScreen = true;
            } else {
                this.mobileScreen = false;
            }
        });
    }

    ngOnInit() {
        // this.playerScores(this.playerId);
        // console.log("Expand player",this.player)
        // console.log("Expand playerName", this.playerName)
        // console.log("Expand test", this.test)
        console.debug("enable toyota scorecard expand", this.enableToyota)
        if(!this.player.rounds) {
            let sub = this.competitionService.getAllScoresForPlayer(this.competitionId, this.player.playerId)
                .subscribe((compRounds: CompetitionGameRound[]) => {
                    this.player.rounds = compRounds;
                });
                this.subscriptions.push(sub);
        }
        // this.activeRoute.queryParams
        // .subscribe(params => {
        //     if(params['enableToyota'] && params['enableToyota'] === 'true') {
        //         this.enableToyota = true;
        //     }
        // });
            
    }

    ngOnDestroy(): void {
        if(this.watcher) {
            this.watcher.unsubscribe();
            this.watcher = null;
        }
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }
    isMobile() {
        return this.media.isActive('xs') || this.media.isActive('sm');
    }
    playerScores(id) {
        if(!this.player.rounds) {
            let sub = this.competitionService.getAllScoresForPlayer(this.competitionId, this.player.playerId)
            .subscribe((compRounds: CompetitionGameRound[]) => {
                this.player.rounds = compRounds;
            });
            this.subscriptions.push(sub);
        }
           
    }

    deriveScoreClass(s) {
        if ((s.parScore - s.grossScore) == 0) {
            if(this.enableToyota) return '';
            else return "par-score";
        } else if ((s.parScore - s.grossScore) == 1) {
            return "birdie-score";
        } else if ((s.parScore - s.grossScore) == 2) {
            return "eagle-score";
        } else if ((s.parScore - s.grossScore) == -1) {
            return "bogey-score";
        } else if ((s.parScore - s.grossScore) < -1) {
            if(this.enableToyota) return "par-score";
            else return '';
        } 
    }

    deriveParClass(pr,playerRoundNine) {
        let _totalParScore = this.totalParScore(playerRoundNine.scores)
        if ((pr - _totalParScore) < 0) {
            return "under-par";
        } else if ((pr - _totalParScore) > 0) {
            return "above-par";
        } else if ((pr - _totalParScore) == 0) {
            return "on-par";
        }
    }

    deriveTotalClass(pr) {
        if ((pr - 72) < 0) {
            return "under-par";
        } else if ((pr - 72) > 0) {
            return "above-par";
        } else if ((pr - 72) == 0) {
            return "on-par";
        }
    }

    totalParScore(firstNine,secondNine?) {
        let totalFirst9 = 0;
        let totalSecond9 = 0 ;

        totalFirst9 = firstNine.reduce(function (a, firstNine) {
            return a + firstNine.parScore;
          }, 0);
          if(secondNine) {
            totalSecond9 = secondNine.reduce(function (a, secondNine) {
                return a + secondNine.parScore;
              }, 0);
          }

          const totalPars = totalFirst9 + totalSecond9;

          return totalPars;
    }

    getCoursePar(round,whichNine?) {
        if(!round) return;
        let _coursePar = 0;
        // let _whichNine = whichNine;
        console.debug("get course par", round, whichNine);
        if(whichNine > 0) {

            let _nines = round.nines[whichNine-1] 
            console.debug("get course par", _nines);
            _coursePar = _nines.scores.map((s)=>{
                return s.parScore;
            })
            .reduce((a,b)=>{
                return a  + b
            },0)
        } else {
            let _nines = [...round.nines]
            _nines.forEach((nine)=>{
                _coursePar = nine.map((s)=>{
                    return s.parScore;
                })
                .reduce((a,b)=>{
                    return a  + b
                },0)
            })
        }
        return _coursePar;
        
    }
}
