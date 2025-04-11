import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { CompetitionGameRound, LeaderBoardPlayer } from '../../models/mygolf/competition';
import { CompetitionService } from '../../services/competition.service';
import { ObservableMedia } from '@angular/flex-layout';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute } from '@angular/router';
import {
  DefaultLeaderboardSettings,
  LeaderboardSettings,
} from 'app/component-module/leaderboard-settings/leaderboard-settings';
import { CompetitionData, CompetitionDataLite } from 'app/models/mygolf.data';

@Component({
  selector: 'app-individual-expand',
  templateUrl: './individual-expand.component.html',
  styleUrls: ['./individual-expand.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class IndividualExpandComponent implements OnInit, OnDestroy {
  // @Input() playerId: number;
  @Input() competitionId: number;
  @Input() player: LeaderBoardPlayer & any;
  @Input() playerName: string;
  @Input() test: string;
  @Input() enableToyota: boolean = false;
  @Input() maxRounds: number = 1;
  compRounds: CompetitionGameRound[] = [];
  playerExpanded: boolean = false;
  whichNine: number = 1;
  watcher: Subscription;
  mobileScreen: boolean;
  mqAlias: string;
  oldStyle: boolean;

  subscriptions: Subscription[] = [];

  holes: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  @Input() settings: LeaderboardSettings = DefaultLeaderboardSettings;
  @Input() compData: CompetitionDataLite;
  @Input() scoreType: string;
  @Output() leaderboardSettingsChange: EventEmitter<LeaderboardSettings> = new EventEmitter();
  constructor(
    private competitionService: CompetitionService,
    private media: ObservableMedia,
    private activeRoute: ActivatedRoute
  ) {
    this.watcher = media.subscribe(change => {
      this.mqAlias = change ? change.mqAlias : '';
      if (this.mqAlias === 'sm' || this.mqAlias === 'xs') {
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
    console.debug(
      'enable toyota scorecard expand',
      this.enableToyota,
      this.settings,
      this.scoreType,
      this.player
    );
    if (!this.player.rounds) {
      let sub = this.competitionService
        .getAllScoresForPlayer(this.competitionId, this.player.playerId)
        .subscribe((compRounds: CompetitionGameRound[]) => {
          this.compRounds = compRounds;
          this.player.rounds = compRounds;
        });
      this.subscriptions.push(sub);

      // if(this.compRounds && this.compRounds.length > 1 && this.maxRounds === 1) {
      //     this.maxRounds = this.compRounds.length;
      // }
    }
    // this.activeRoute.queryParams
    // .subscribe(params => {
    //     if(params['enableToyota'] && params['enableToyota'] === 'true') {
    //         this.enableToyota = true;
    //     }
    // });
    this.getMarkingNonPlayedHoles();
  }

  ngOnDestroy(): void {
    if (this.watcher) {
      this.watcher.unsubscribe();
      this.watcher = null;
    }
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
  isMobile() {
    return this.media.isActive('xs') || this.media.isActive('sm');
  }
  playerScores(id) {
    if (!this.player.rounds) {
      let sub = this.competitionService
        .getAllScoresForPlayer(this.competitionId, this.player.playerId)
        .subscribe((compRounds: CompetitionGameRound[]) => {
          this.player.rounds = compRounds;
        });
      this.subscriptions.push(sub);
    }
  }

  deriveScoreClass(s, scoreType?: string) {
    if (scoreType === 'net') {
      if (s.parScore - s.grossScore == 0) {
        if (this.enableToyota) return '';
        else return 'par-score';
      } else if (s.parScore - s.netScore == 1) {
        return 'birdie-score';
      } else if (s.parScore - s.netScore == 2) {
        return 'eagle-score';
      } else if (s.parScore - s.netScore == -1) {
        return 'bogey-score';
      } else if (s.parScore - s.netScore < -1) {
        if (this.enableToyota) return 'par-score';
        else return '';
      }
    } else {
      if (s.parScore - s.grossScore == 0) {
        if (this.enableToyota) return '';
        else return 'par-score';
      } else if (s.parScore - s.grossScore == 1) {
        return 'birdie-score';
      } else if (s.parScore - s.grossScore == 2) {
        return 'eagle-score';
      } else if (s.parScore - s.grossScore == -1) {
        return 'bogey-score';
      } else if (s.parScore - s.grossScore < -1) {
        if (this.enableToyota) return 'par-score';
        else return '';
      }
    }
  }

  deriveParClass(pr, playerRoundNine) {
    let _totalParScore = this.totalParScore(playerRoundNine.scores);
    if (pr - _totalParScore < 0) {
      return 'under-par';
    } else if (pr - _totalParScore > 0) {
      return 'above-par';
    } else if (pr - _totalParScore == 0) {
      return 'on-par';
    }
  }

  deriveTotalClass(pr) {
    if (pr - 72 < 0) {
      return 'under-par';
    } else if (pr - 72 > 0) {
      return 'above-par';
    } else if (pr - 72 == 0) {
      return 'on-par';
    }
  }

  totalParScore(firstNine, secondNine?) {
    let totalFirst9 = 0;
    let totalSecond9 = 0;

    totalFirst9 = firstNine.reduce(function (a, firstNine) {
      return a + firstNine.parScore;
    }, 0);
    if (secondNine) {
      totalSecond9 = secondNine.reduce(function (a, secondNine) {
        return a + secondNine.parScore;
      }, 0);
    }

    const totalPars = totalFirst9 + totalSecond9;

    return totalPars;
  }

  getCoursePar(round, whichNine?) {
    if (!round) return;
    let _coursePar = 0;
    // let _whichNine = whichNine;
    console.debug('get course par', round, whichNine);
    if (whichNine > 0) {
      let _nines = round.nines[whichNine - 1];
      console.debug('get course par', _nines);
      _coursePar = _nines.scores
        .map(s => {
          return s.parScore;
        })
        .reduce((a, b) => {
          return a + b;
        }, 0);
    } else {
      let _nines = [...round.nines];
      _nines.forEach(nine => {
        _coursePar = nine
          .map(s => {
            return s.parScore;
          })
          .reduce((a, b) => {
            return a + b;
          }, 0);
      });
    }
    return _coursePar;
  }

  getScoreTitle(type?: string, roundNo?: number) {
    // console.debug("score title", type, roundNo, this.maxRounds)
    if (type === 'Net') return 'Net';
    else if (this.enableToyota) {
      if (roundNo > 1 && roundNo === this.maxRounds) return 'FR';
      else return 'R' + roundNo;
      // else return 'Score';
    } else if (type === 'Points') return 'Points';
    else return 'Gross';
  }

  isNetHidden() {
    if (!this.settings) return;
    if (this.settings.scoreType === 'net') return false;
    if (this.settings.hideNetColumns) return true;
  }
  isPointsHidden() {
    if (!this.settings) return;
    if (!this.compData.pointBased) return true;
    if (this.settings.scoreType === 'points') return false;
    if (this.settings.hidePointColumns) return true;
  }

  isMobileScreen() {
    return this.media.isActive('xs');
    // || this.media.isActive('sm')
  }

  markNonPlayedHoles: Array<any>;

  @Input() compNonPlayedHoles: Array<any> = [];
  getMarkingNonPlayedHoles() {
    console.debug(
      'get marking non played holes ',
      this.compNonPlayedHoles,
      this.markNonPlayedHoles
    );
    if (this.compNonPlayedHoles) {
      this.markNonPlayedHoles = this.compNonPlayedHoles;
    } else {
      this.compNonPlayedHoles = [
        {
          compId: 2845,
          categories: [
            {
              categoryId: null,
              categoryName: 'BOYS',
              rounds: [
                {
                  roundNo: 2,
                  holes: [1, 2, 3, 4, 5, 6, 7, 8, 9],
                  hideTotal: ['OUT'],
                },
              ],
            },
            {
              categoryId: null,
              categoryName: 'GIRLS',
              rounds: [
                {
                  roundNo: 2,
                  holes: [10, 11, 12, 13, 14, 15, 16, 17, 18],
                  hideTotal: ['IN'],
                },
              ],
            },
          ],
        },
      ];
    }
  }

  isMarkingNonPlayed(categoryName: string, roundNo: number, holeNo: number) {
    console.debug(
      'is marking non played - expand [0] ',
      this.markNonPlayedHoles,
      this.compNonPlayedHoles,
      categoryName,
      roundNo,
      holeNo,
      this.compData
    );
    if (!this.compNonPlayedHoles) return false;
    if (this.compNonPlayedHoles === undefined) return false;
    if (this.compNonPlayedHoles.length === 0) return false;
    const isComp = this.compNonPlayedHoles.find(nph => nph.compId === this.compData.id);
    if (!isComp || isComp === undefined) return false;
    const category = isComp.categories.find(cat => cat.categoryName === categoryName);
    // console.debug('is marking non played - expand [category] ', category);
    if (!category) return false;
    const round = category.rounds.find(round => round.roundNo === roundNo);
    // console.debug('is marking non played - expand [round] ', round);
    if (!round) return false;
    const markNonPlayed = round.holes.find(hole => hole === holeNo);
    // console.debug('is marking non played - expand [1] ', categoryName, roundNo, holeNo);
    // console.debug(
    //   'is marking non played [2] - expand ',
    //   this.compData,
    //   isComp,
    //   category,
    //   round,
    //   markNonPlayed
    // );
    return markNonPlayed;
  }

  hideNonPlayedTotal(categoryName: string, roundNo: number, whichTotal: string) {
    console.debug(
      'is marking non played - expand [0] ',
      this.markNonPlayedHoles,
      this.compNonPlayedHoles,
      categoryName,
      roundNo,
      whichTotal,
      this.compData
    );
    if (!this.compNonPlayedHoles) return false;
    if (this.compNonPlayedHoles === undefined) return false;
    if (this.compNonPlayedHoles.length === 0) return false;
    const isComp = this.compNonPlayedHoles.find(nph => nph.compId === this.compData.id);
    if (!isComp || isComp === undefined) return false;
    const category = isComp.categories.find(cat => cat.categoryName === categoryName);
    // console.debug('is marking non played - expand [category] ', category);
    if (!category) return false;
    const round = category.rounds.find(round => round.roundNo === roundNo);
    // console.debug('is marking non played - expand [round] ', round);
    if (!round) return false;
    const markNonPlayed = round.hideTotal.find(hideTotal => hideTotal === whichTotal);
    return markNonPlayed;
  }

  onLeaderboardSettingsChange(settings: LeaderboardSettings) {
    console.log('This.settings :', this.settings);
    console.log('Settings : ', settings);
    // console.log('Embedded? : ', this.embedded)
    // this.settings = settings;
    // if (this.embedded) {
    //   this.leaderboardSettingsChange.emit(this.settings);
    // } else if (settings) {
    //   this.leaderboardSettingsChange.emit(settings);
    // //   this.savePreferences();
    // } else {
    // //   this.savePreferences();
    // }
  }
}
