import {
    Component,
    OnInit,
    Input,
    ViewEncapsulation,
    OnChanges,
    SimpleChanges,
    OnDestroy,
    Output,
    EventEmitter
} from '@angular/core';
import {Competition} from '../../models/mygolf/competition/competition';
import {CompetitionDetails} from '../../models/mygolf/competition/competition-details';
import {LeaderboardSettings, DefaultLeaderboardSettings} from './leaderboard-settings';
import {GameRound} from '../../models/mygolf/gameround';
import {CompetitionCategory} from '../../models/mygolf/competition/competition-category';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector     : 'leaderboard-settings',
    templateUrl  : './leaderboard-settings.component.html',
    styleUrls    : ['./leaderboard-settings.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class LeaderboardSettingsComponent implements OnInit, OnChanges, OnDestroy {
    @Input() teamLeaderBoard: boolean           = false;
    @Input() competition: Competition;
    @Input() details: CompetitionDetails;
    @Input() totalPlayers: number               = 0;
    @Input() scrollPaused: boolean              = false;
    @Input() hideColorSet: boolean
    @Input() styleClass: string;
    @Output() onRefresh: EventEmitter<LeaderboardRefreshParams>;
    @Output() onNextPage: EventEmitter<any>;
    @Output() settingsChange: EventEmitter<LeaderboardSettings>;
             validRounds: GameRound[]           = [];
             validCategories: CompetitionCategory [];
             settingsValue: LeaderboardSettings = Object.assign({}, DefaultLeaderboardSettings);
    private currentPage: number                 = 1;
    private totalPages: number                  = 0;
    private scrollTimer: Observable<number>;
    private scrollTimerSubscription: Subscription;
    private scrollConfig: ScrollConfig;

    constructor(
        private activeRoute: ActivatedRoute,

    ) {
        this.onNextPage     = new EventEmitter();
        this.onRefresh      = new EventEmitter();
        this.settingsChange = new EventEmitter();
    }
    @Input()
    get settings() {
        return this.settingsValue;
    }

    set settings(val: LeaderboardSettings) {
        if(val)
            this.settingsValue = val;
    }

    ngOnInit() {
        this._deriveRounds();
        this._deriveCategories();
    }
    ngOnDestroy(): void {
        this.scrollTimerSubscription.unsubscribe();
    }

    public init() {
        this.settingsChanged();
    }



    ngOnChanges(changes: SimpleChanges): void {
        if (changes.details) {
            this._deriveRounds();
            this._deriveCategories();
            this.settingsChanged();
        }
    }

    dataRefreshed(totalPlayers: number) {
        this.totalPlayers = totalPlayers;
        this.stopSubscription();
        if(!this.settings) return;
        if (this.settings.autoScroll && this.settings.scrollSize > 0) {
            this.totalPages = Math.ceil(this.totalPlayers / this.settings.scrollSize);
        }
        else if (this.totalPlayers > 0) {
            this.totalPages = 1;
            
            this.activeRoute.queryParams
            .subscribe(params => {
                console.log("get params - settings " ,params, this.totalPlayers);
                if(params.rowSize && params.rowSize > 0)
                this.settings.scrollSize = params.rowSize
            if((params.allRows || params.allRows === 'true') && this.totalPlayers > 0)
                this.settings.scrollSize = this.totalPlayers;
            })
        } else {
            this.totalPages = 0;
        }
        if(this.totalPages) {
            this.currentPage = 1;
        }
        this.setupAutoScroll();
        
    }

    onScrollCategoryChange() {
        if (this.settings.autoScroll && this.settings.scrollCategories) {
            this.settings.byCategory = false;
        }
    }

    settingsChanged() {
        if (this.settings.autoScroll && this.settings.scrollCategories) {
            this.settings.byCategory = false;
        }
        if (this.settings.autoScroll && this.settings.scrollScoreTypes) {
            this.settings.hideGrossColumns = true;
            this.settings.hideNetColumns   = true;
        }
        let config = createScrollConfig();
        if (this.settings.autoScroll && this.settings.scrollRounds) {
            this.validRounds.forEach(r => config.rounds.push(r));
        }
        else if (this.validRounds && this.validRounds.length) {
            config.rounds.push(this.validRounds.filter(r => r.roundNo === this.settings.selectedRound).pop());
        }
        else {
            config.rounds.push({roundNo: 0});
        }
        if (this.settings.autoScroll && this.settings.scrollCategories) {
            this.validCategories.forEach(c => config.categories.push(c));
        }
        else if (this.validCategories && this.validCategories.length) {
            config.categories.push(this.validCategories.filter(c => c.categoryId === this.settings.selectedCategory).pop());
        }
        else {
            config.categories.push({
                categoryId  : -1,
                categoryName: 'All'
            });
        }
        if (this.settings.autoScroll && this.settings.scrollScoreTypes) {
            config.scoreTypes = ['gross', 'net'];
        }
        else {
            config.scoreTypes.push(this.settings.scoreType);
        }
        let values: LeaderboardRefreshParams[] = [];
        config.rounds.forEach(round => {
            config.categories.forEach(catg => {
                config.scoreTypes.forEach(st => {
                    let value = {
                        round    : round,
                        category : catg,
                        scoreType: st
                    };
                    values.push(value);
                })
            });
        });
        config.values     = values;
        this.scrollConfig = config;
        this.settingsChange.emit(this.settings);
        this.triggerRefresh();
    }

    private _deriveRounds() {
        if (this.details && this.details.gameRounds) {
            let validRounds = this.details.gameRounds.filter(r => r.status === 'InProgress' || r.status === 'Completed');
            let round       = {
                roundNo: 0
            };
            if (validRounds.length > 1) {
                this.validRounds            = [round, ...validRounds]
                this.settings.selectedRound = 0;
            } else if (validRounds.length === 1) {
                this.settings.selectedRound = validRounds[0].roundNo;
                this.validRounds            = validRounds;
            } else {
                this.validRounds            = [round];
                this.settings.selectedRound = 0;
            }
        }
    }

    private _deriveCategories() {
        if (this.details && this.details.categories) {
            let categories = this.details.categories
                                 .filter(c => c.forGrouping);
            let allCatg    = {
                forGrouping : true,
                sequence    : 0,
                categoryId  : -1,
                categoryName: 'All',
            };
            if (categories.length > 1) {
                this.validCategories           = [allCatg, ...categories];
                this.settings.selectedCategory = -1;
            } else if (categories.length === 1) {
                this.validCategories           = categories;
                this.settings.selectedCategory = this.validCategories[0].categoryId;
            }
            else {
                this.validCategories           = [allCatg];
                this.settings.selectedCategory = -1;
            }
        }
    }

    private setupAutoScroll() {
        if (this.totalPages > 0) {
            this.currentPage = 1;
            this.triggerNextPage();
        }
        if (this.settings.autoScroll) {
            this.scrollTimer             = Observable.timer(this.settings.scrollFrequency * 1000,
                this.settings.scrollFrequency * 1000);
            this.scrollTimerSubscription = this.scrollTimer.subscribe(() => {
                if (!this.scrollPaused) {
                    if (this.currentPage < this.totalPages) {
                        this.currentPage++;
                        this.triggerNextPage();
                    }
                    else {
                        this.triggerRefresh();
                    }
                }
            });
        }
    }

    private triggerRefresh() {
        this.stopSubscription();
        if (this.scrollConfig.currentIndex >= this.scrollConfig.values.length) {
            this.scrollConfig.currentIndex = 0;
        }
        let value = this.scrollConfig.values[this.scrollConfig.currentIndex];
        this.scrollConfig.currentIndex++;
        this.onRefresh.emit(value);
    }

    private triggerNextPage() {
        let startIdx = (this.currentPage - 1) * this.settings.scrollSize;
        let endIdx   = (this.settings.autoScroll)
            ? (this.currentPage) * this.settings.scrollSize
            : this.totalPlayers;
        this.onNextPage.emit({
            startIndex : startIdx,
            endIndex   : endIdx,
            currentPage: this.currentPage,
            pageSize   : this.settings.scrollSize,
            totalPages : this.totalPages
        });
    }

    private stopSubscription() {
        if (this.scrollTimerSubscription) this.scrollTimerSubscription.unsubscribe();
    }
}

export type LeaderboardRefreshParams = {
    round: GameRound,
    category: CompetitionCategory,
    scoreType: string;
}
type ScrollConfig = {
    rounds: GameRound[];
    categories: CompetitionCategory[];
    scoreTypes: string [];
    currentIndex: number;
    values: LeaderboardRefreshParams[]
}

function createScrollConfig(): ScrollConfig {
    return {
        rounds      : [],
        categories  : [],
        scoreTypes  : [],
        currentIndex: 0,
        values      : []
    }
}
