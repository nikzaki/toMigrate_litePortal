import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {Competition, CompetitionDetails} from '../../../../models/mygolf/competition';
// import {routerTransition} from '../../../router.animations';
import {CompetitionService} from '../../../../services/competition.service';
import {ClubService} from '../../../../services/club.service';
import {Club} from '../../../../models/mygolf/club';
import {Flight} from '../../../../models/mygolf/competition/competition-flight';

@Component({
    selector   : 'app-tournament-details',
    templateUrl: './tournament-details.component.html',
    styleUrls  : ['./tournament-details.component.scss'],
    // animations : [routerTransition()]
})
export class TournamentDetailsComponent implements OnInit, AfterViewInit, OnDestroy {
    private paramSubscription: Subscription;
    private competitionId: number;
            competition: Competition;
            details: CompetitionDetails;
            club: Club;
            flights: Array<Flight> = new Array<Flight>();


    constructor(private activeRoute: ActivatedRoute,
        private competitionService: CompetitionService,
        private clubService: ClubService) {
    }

    ngOnInit() {
        this.paramSubscription = this.activeRoute.params.subscribe(params => {
            if (params['competitionId']) {
                this.competitionId = +params['competitionId'];
                this.refreshCompetition();
                console.log("TDetails-",this.competitionId)
            }
        });
    }

    ngAfterViewInit(): void {
    }

    ngOnDestroy(): void {
        if (this.paramSubscription) {
            this.paramSubscription.unsubscribe();
            this.paramSubscription = null;
        }
    }

    private refreshCompetition() {
        this.competition = null;
        if (this.competitionId) {
            this.competitionService.getCompetitionInfo(this.competitionId)
                .subscribe(comp => {
                    this.competition = comp;
                    this.refreshCompetitionDetails();
                    this.getClubDetails(comp.clubId);
                      this.competitionService.getCompetitionFlights(this.competition.competitionId, 1)
                        .subscribe((flights: Array<Flight>) => {
                          this.flights = flights;

                        });

                });
        }
    }

    private refreshCompetitionDetails() {
        this.competitionService.getCompetitionDetails(this.competitionId)
            .subscribe(details => {
                this.details = details;
            });
    }
    private getClubDetails(clubId: number) {
        this.clubService.getClubInfo(clubId)
            .subscribe(club => {
                this.club = club;
            });
    }

    getLeaderboardURL():string {
        if (this.competition.teamEvent) {
            return "/teamleaderboard/" + this.competitionId;
        } else {
            return "/leaderboard/" + this.competitionId;
        }
    }
}
