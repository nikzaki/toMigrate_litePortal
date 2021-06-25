import {Component, Input, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {CompetitionGameRound, LeaderBoardPlayer} from '../../models/mygolf/competition';
import {CompetitionService} from '../../services/competition.service';
import {ObservableMedia} from '@angular/flex-layout';
import {Subscription} from 'rxjs/Subscription';

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
    compRounds: CompetitionGameRound[] = [];
             playerExpanded: boolean            = false;
             whichNine: number = 1;
    watcher: Subscription;
    mobileScreen: boolean;
    mqAlias: string;
    oldStyle: boolean;

    subscriptions: Subscription[] = [];

    holes: number[] = [1,2,3,4,5,6,7,8,9];
    constructor(private competitionService: CompetitionService, private media: ObservableMedia) {
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
        if(!this.player.rounds) {
            let sub = this.competitionService.getAllScoresForPlayer(this.competitionId, this.player.playerId)
                .subscribe((compRounds: CompetitionGameRound[]) => {
                    this.player.rounds = compRounds;
                });
                this.subscriptions.push(sub);
        }
            
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
            return "par-score";
        } else if ((s.parScore - s.grossScore) == 1) {
            return "birdie-score";
        } else if ((s.parScore - s.grossScore) == 2) {
            return "eagle-score";
        }
    }

    deriveParClass(pr) {
        if ((pr - 36) < 0) {
            return "under-par";
        } else if ((pr - 36) > 0) {
            return "above-par";
        } else if ((pr - 36) == 0) {
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
}
