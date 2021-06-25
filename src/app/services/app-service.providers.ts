import {AuthenticationService} from './authentication.service';
import {ConfigurationService} from './configuration.service';
import {PlayerService} from './player.service';
import {ClubService} from './club.service';
import {OrganizerService} from './organizer.service';
import {HttpService} from './http.service';
import {CompetitionService} from './competition.service';
import {ScorecardService} from './scorecard.service';
import {DeviceService} from './device.service';
import {AdvertisementService} from './advertisement.service';
import {UserPreferenceService} from './user-preference.service';
import {FeedService} from './FeedService';
import {HandicapService} from './handicap.service';
/**
 * Created by ashok on 03/05/17.
 */

export const AppServiceProviders = [
    ConfigurationService,
    AuthenticationService, HttpService,
    PlayerService, ClubService, OrganizerService, CompetitionService,
    ScorecardService, DeviceService, AdvertisementService,
    UserPreferenceService, FeedService, HandicapService
];