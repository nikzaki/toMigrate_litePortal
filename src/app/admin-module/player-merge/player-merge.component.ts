import {Component, OnInit, ViewEncapsulation, ViewChild} from '@angular/core';
import {Player} from '../../models/mygolf/player/player';
import {PlayerList} from '../../models/mygolf/player/player-list';
import {Subject} from 'rxjs/Subject';
import {ConfirmDialog, Message, ConfirmationService} from 'primeng/primeng';
import {PlayerService} from '../../services/player.service';
import {ConfigurationService} from '../../services/configuration.service';
import {ServerResult} from '../../models/server-result';
import {Util} from '../../util';
import { SessionService } from 'app/redux/session';
import {Session} from '../../models/session/session';

@Component({
    selector     : 'player-merge',
    templateUrl  : './player-merge.component.html',
    styleUrls    : ['./player-merge.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class PlayerMergeComponent
// implements OnInit
{
    playerList: PlayerList;
    sourcePlayer: Player;
    targetPlayer: Player;
    deleteSourcePlayer: boolean = false;
    sendEmail: boolean = false;
    searchString: string                 = '';
    searchStringChanged: Subject<string> = new Subject<string>();
    activePlayersOnly: boolean           = true;
    pageSize: number                     = 10;
    pageSizeOptions: number[] = [10, 20, 30, 50, 100];

    @ViewChild('confirm')
    confirmDialog: ConfirmDialog;

    messages : Message[] = [];

    authToken: string;
    constructor(private playerService: PlayerService,
        private confirmService: ConfirmationService,
        private configService: ConfigurationService,
        private sessionService: SessionService) {
        //
        // this.playerList = createPlayerList();
        this.sessionService.getSession()
        .subscribe((session: Session)=>{
            console.log("get session : ", session);
            if(session) this.authToken = session.authToken;
        })
    }

    ngOnInit() {
        this.searchStringChanged
            .debounceTime(300)
            .distinctUntilChanged()
            .subscribe((searchString: string) => {
                this.searchString = searchString;
                this.refreshPlayers();
            });
        this.refreshPlayers();
    }

    refreshPlayers() {
        this._refreshPage(1);
    }

    onLazyLoad(event) {
        this.pageSize = event.rows;
        let pageNo = (event.first) / this.pageSize + 1;
        console.debug("The page requested =" + pageNo);
        this._refreshPage(pageNo);
    }
    onSearch(text: string) {
        this.playerList = {
            currentPage: 1,
            errorMessage: null,
            players: [],
            success: true,
            totalInPage: 1,
            totalItems: 1,
            totalPages: 1
        }
        this.searchStringChanged.next(text);
    }
    setSourcePlayer(player: Player){
        if(this.targetPlayer && this.targetPlayer.playerId === player.playerId){
            this.messages.push({
                severity: 'error',
                // detail: 'Source and Target player record cannot be same'
                detail: 'Move From and Move To player record cannot be the same'
            });
            return;
        }
        this.sourcePlayer = player;
    }
    setTargetPlayer(player: Player){
        if(this.sourcePlayer && this.sourcePlayer.playerId === player.playerId){
            this.messages.push({
                severity: 'error',
                detail: 'Move From and Move To player record cannot be the same'
            });
            return;
        }
        this.targetPlayer = player;
    }
    onCancelClick(){
        this.sourcePlayer = null;
        this.targetPlayer = null;
        this.deleteSourcePlayer = false;
    }
    onContinueClick(){
        this.confirmService.confirm({
            header: "Move Player Data",
            message: 'Do you want to continue merging player data ?'
        });
    }
    cancelDialog(){
        this.confirmDialog.hide();
    }
    mergePlayerRecords(){
        this.playerService.movePlayerData(this.sourcePlayer.playerId,
            this.targetPlayer.playerId, this.deleteSourcePlayer, this.sendEmail, this.authToken)
            .subscribe((result: ServerResult)=>{
                if(result.success){
                    this.messages.push({
                        severity: 'info',
                        detail: 'Moved all data from source player record to target player record'
                    });
                    this.onCancelClick();
                    this.refreshPlayers();
                }
                else {
                    this.messages.push({
                        severity: 'error',
                        detail: (result.message)?result.message:'Error occured while moving player data'
                    });
                }
            },(error)=>{
                let _error = error.json();
                let msg = Util.getErrorMessage(error, 'Error occured while moving player data');
                // console.log("error : ", error, error.message)
                this.messages.push({
                    severity: 'error',
                    detail: _error.message?_error.message: 'Error occured while moving player data'
                });
            },()=>{
                this.confirmDialog.hide();
            })
    }
    private _refreshPage(pageNo: number) {
        let _letters = /[0-9]/
        //  /^[a-zA-Z]+$/;
        //console.log("search by id : ", _search, _letters, _search.match(_letters))
                if (0 && this.searchString.match(_letters) && pageNo === 1) {
                    this.playerService.getPlayerById(Number(this.searchString))
                    .subscribe((player:any)=>{
                        if(player && this.playerList) {
                            if(player.id) player.playerId = player.id;
                            if(player.profile) player.thumbnail = player.profile;
                            if(player.image) player.photoUrl = player.image;
                            this.playerList.players.unshift(player);
                        }
                    })
                } else {
                    this.playerService.searchPlayers(this.searchString,
                        this.activePlayersOnly,
                        pageNo, this.pageSize)
                        .subscribe((playerList: PlayerList) => {
                            this.playerList = playerList;
                            if (this.searchString.match(_letters) && pageNo === 1) {
                                this.playerService.getPlayerById(Number(this.searchString))
                                .subscribe((player:any)=>{
                                    if(player && this.playerList) {
                                        if(player.id) player.playerId = player.id;
                                        if(player.profile) player.thumbnail = player.profile;
                                        if(player.image) player.photoUrl = player.image;
                                        this.playerList.players.unshift(player);
                                    }
                                })
                                console.debug("player list : ", this.searchString, _letters, this.searchString.match(_letters), this.playerList)
                            }
                        },(error)=>{
            
                        },()=>{
                        })

                }
    }

}
