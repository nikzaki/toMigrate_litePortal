import {Component, OnInit, ViewEncapsulation, ViewChild} from '@angular/core';
import {RestUrl} from "../../models/config/rest-api-url";
import {ConfigurationService} from "../../services/configuration.service";

import {PlayerService} from "../../services/player.service";
import {ClubService} from "../../services/club.service";
import {Util} from "../../util";
import {Player} from '../../models/mygolf/player/player';
import {ClubList} from '../../models/mygolf/club/club-list';
import {Club} from '../../models/mygolf/club/club';

import {Http, ResponseContentType} from '@angular/http';
import 'rxjs/Rx';
import {DropdownModule} from 'primeng/primeng';
import {SelectItem} from 'primeng/primeng';

import {ConfirmationService, OverlayPanel} from 'primeng/primeng';
import { OutgoingHttpHeaders } from 'http';
import {Session} from '../../models/session/session';
import {SessionService} from '../../redux/session/session.service';
import { HttpService } from 'app/services/http.service';
import { AuthenticationService } from 'app/services/authentication.service';


@Component({
    selector   : 'app-import-players',
    templateUrl: './import-players.component.html',
    styleUrls  : ['./import-players.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ImportPlayersComponent implements OnInit {

    url: string;
    fileToImport: string;
    playersToImport: any[] = [];
    filteredPlayers: any[] = [];
    creating: string;
    public excludeHeader: boolean = false;
    clubList: Array<Club>; //[] = [];
    selectedClub: string;
    selectedClubId: number;
    filter: boolean = true; 
    globalPassword: string; // = '123456';
    hasMembership: boolean = false;
    @ViewChild('club') clubOverlay: OverlayPanel;
    // clubList: SelectItem[] = [];

    httpHeaders: OutgoingHttpHeaders;
    authToken: string;

    clubApproveAll: boolean = false;
    constructor(private configService: ConfigurationService,
        private playerService: PlayerService,
        private http: Http,
        private clubService: ClubService,
        private sessionService: SessionService,
        private authService: AuthenticationService) {

            this.sessionService.getSession()
            .subscribe((session: Session)=>{
                console.log("get session : ", session);
                if(session) this.authToken = session.authToken;
            })

        //     this.sessionService.getSession()
        //            .first()
        //            .mergeMap((session: Session) => {
        //                console.log("import player - get session : ", session)
        //     this.httpHeaders['X-AUTH-TOKEN'] = session.authToken;
        //    });
    }

    ngOnInit() {
        this.url = this.configService.getRestApiUrl(RestUrl.playerService.importPlayersAnalyze);
        this.getClubList();
    }

    onBeforeSend(event) {
        event.xhr.setRequestHeader("X-AUTH-TOKEN", this.authToken);
        // event.formData.append('DocumentID', 'A123');
    }

    onUploadComplete(event){
        if(event.xhr && event.xhr.responseText){
            let result = JSON.parse(event.xhr.responseText);
            if(result.success){
                this.playersToImport = [];
                this.filteredPlayers = [];
                let players = [];
                result.players.forEach(player=>{
                    players.push(Object.assign({}, player, {
                        created: false,
                        error:'',
                        country: player.countryId,
                        nationality: player.nationalityId,
                    }));
                    if(player.membership && player.membership === 'Membership_Number') this.hasMembership = true;
                });
                this.playersToImport = players;
                this.filteredPlayers = players;
            }

        }
    }

    registerPlayers(){
        let players = this.playersToImport.filter(player=>{
            return !player.created;
        });
        this.registerPlayer(players, 1, players.length);
    }
    registerPlayer(players: any[], count: number, total: number){
        if(!players || !players.length){
            this.creating = '';
            return;
        }
        let player = players.shift();
        let _admin = false;
        this.sessionService.getUser()
        .subscribe((data)=>{
            console.log("get user : ", data)
            if(data && data.userType.toLowerCase() === 'britesoft') {
                _admin = true;
            }
        });
        if(player.email) player.email = player.email.trim(); 
        this.creating = "Registering " + (player.firstName + ' ' + player.lastName);
        this.playerService.isEmailUsed(player.email)
            .subscribe((used: boolean)=>{
                let _teebox: string = 'Blue'
                if(player.gender === 'F')
                    _teebox = 'Red'
                    else _teebox = 'Blue'
                if(used){
                    player.created  = false;
                    player.error = "Email is already registered."
                    if(player.membership) {
                        this.playerService.getPlayerByEmail(player.email)
                        .subscribe((playerInfo: any)=>{
                            if(playerInfo  && playerInfo.length > 0)
                                if(playerInfo[0]) {
                                    playerInfo[0].membership = player.membership
                                    this.playerService.updateClubMembership(playerInfo[0],this.selectedClubId)
                                    .subscribe((data: any) => {
                                        console.log("[update club member] existing data ", data)
                                        console.log("[update club member] existing player", player, playerInfo)
                                        if(data && this.clubApproveAll) {
                                            this.clubService.updateClubMemberStatus(this.selectedClubId, playerInfo[0].playerId, 'approve', data.membershipNumber)
                                            .subscribe((data)=>{
                                                console.log("update club member status : ", data)
                                            })
                                        }
                                    },(error)=>{

                                    },()=>{
                                        this.registerPlayer(players, count+1, total);
                                    })
                                }
                        })
                    }
                                
                }
                else{
                    let playerInfo = Object.assign({},player, {
                        password: this.globalPassword,
                        token: 'portal',
                        teeoff: _teebox,
                        nationality: player.nationalityId,
                        country: player.countryId
                    });
                    this.playerService.registerPlayer(playerInfo, true, _admin)
                        .subscribe((p: Player)=>{
                            console.log("Player registering : ", player)
                            console.log("Player registering [2] : ", p)
                            console.log("Player registering [3] : ", playerInfo)
                            player.created = true;
                            player.error = '';
                            p.handicapIndex = player.handicapIndex;
                            if(p.membership) console.log("Player : ", p.membership, p)
                            if(!p.membership) p.membership = player.membership;
                            if(player.membership)
                                this.playerService.updateClubMembership(p,this.selectedClubId)
                                    .subscribe((data: any) => {
                                        
                                    console.log("[update club member] new data", data)
                                    console.log("[update club member] new player", player, p)
                                    if(data && this.clubApproveAll) {
                                        this.clubService.updateClubMemberStatus(this.selectedClubId, p.playerId, 'approve', data.membershipNumber)
                                        .subscribe((data)=>{
                                            console.log("update club member status : ", data)
                                        })
                                    }
                                    })
                            if(player.handicapIndex)
                                this.playerService.updatePlayerProfile(p)
                                    .subscribe((p:any)=>{
                                        console.log("done updating player info ", p)
                                    })
                            this.registerPlayer(players, count+1, total);

                        },(error)=>{
                            console.log("register error : ", error)
                            player.created = false;
                            player.error = Util.getErrorMessage(error, 'Error registering the player');
                            this.registerPlayer(players, count+1, total);
                        });
                }
            });
    }
    reset(){
        this.playersToImport = [];
        this.hasMembership = false;
        this.selectedClub = '';
        this.selectedClubId = null;
    }

    downloadFile() {
        const _serverRoot = this.configService.getServerRoot();
        window.open(_serverRoot + '/document/import_player.csv', '_blank');
        // window.open('http://dev.mygolf2u.com/document/import_player.csv','_blank');
        // window.open('/document/import_player.csv','_blank');

    }

    downloadTemplate() {
        return this.http
            .get('http://dev.mygolf2u.com/document/import_player.csv', {
                responseType: ResponseContentType.Blob,
                // search:
            }

                // headers: new HttpHeaders().append('Content-Type',contentType), 
                // responseType: 'blob', 
                // observe: 'body'
                // }

            )
            .map(res => {
                return {
                    filename: 'import_player.csv',
                    data: res.blob()
                };
            })
            .subscribe(res => {
                console.log('start download:',res);
                const url = window.URL.createObjectURL(res.data);
                const a = document.createElement('a');
                document.body.appendChild(a);
                a.setAttribute('style', 'display: none');
                a.href = url;
                a.download = res.filename;
                a.click();
                window.URL.revokeObjectURL(url);
                a.remove(); // remove the element
              }, error => {
                console.log('download error:', JSON.stringify(error));
              }, () => {
                console.log('Completed file download.')
              });
    }

    needClub() {
        if(this.hasMembership && !this.selectedClubId)
            return true
            else return false
    }

    toggleHeader() {
        console.log('[Header] : ',this.excludeHeader);
        console.log('[Header] Filtered Players : ', this.filteredPlayers)
        console.log('[Header] Players To Import : ', this.playersToImport)


        let playersList: any[] = [];

        playersList = [...this.filteredPlayers];
        console.log('[Header] Players To Import : ', playersList)
        if(this.excludeHeader) {
            this.playersToImport = [...playersList.splice(1)];
            
        }
        else {
            this.playersToImport = playersList;
        }
        console.log('[Header] After Filtered Players : ', this.filteredPlayers)
        console.log('[Header] After Players To Import : ', this.playersToImport)
        console.log('[Header] After Players List : ',playersList)



    }

    getClubList() {
        let _searchText = ''
        this.clubService.searchClubs()
        .subscribe((c: ClubList) => {
            console.log("[Club List] c : ", c)
            if(c.totalItems > 0)
                this.clubList = c.clubs;
                console.log("[Club List] this.clubList : ", this.clubList)
        })
    }

    showClubListDialog($event) {
            // this.availableDevices = this._deriveAvailableDevices();
            // this.currentScorer = scorer;
            this.clubOverlay.show($event);
    }

    onSelectClub(event) {
        console.log("on select club ", event)
        if (this.clubList && event.data) {
            this.selectedClub = event.data.clubName;
            this.selectedClubId = event.data.clubId;
        }
        this.clubOverlay.hide();
    }

    onMembershipEdit(event) {
        console.log('on edit membership', event);
        if(event.column.field === 'membership' && event.data.membership)
            this.hasMembership = true;
            else this.hasMembership = false;
            console.log('hasMembership', this.hasMembership, event.column.field, event.data.membership)
    }
}
