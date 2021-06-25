import {Component, OnInit} from '@angular/core';
import {SelectItem, Message} from 'primeng/primeng';
import * as moment from 'moment';

import {Map, fromJS} from 'immutable';
import {Util} from '../../util';
import {DeviceList} from '../../models/mygolf/device/device-list';
import {Device} from '../../models/mygolf/device/device';
import {DeviceService} from '../../services/device.service';
import {ServerResult} from '../../models/server-result';
@Component({
    selector   : 'app-device-management',
    templateUrl: './device-management.component.html',
    styleUrls  : ['./device-management.component.scss']
})
export class DeviceManagementComponent implements OnInit {
    platformOptions: SelectItem [];
    showingOptions: SelectItem[];
    platform: string[]   = ['device'];
    searchText: string = '';
    activeOnOrAfter: Date;
    currentPage: number = 1;
    pageSize: number = 30;
    showing: string = 'devices';
    deviceList: DeviceList;

    favoriteFilter: string = '';
    favoriteDeviceIds: string [] = [];
    favoriteDevices: Device[] = [];
    filteredFavorites: Device[] = [];
    messages: Message[] =[];
    constructor(private deviceService: DeviceService) {
        this.platformOptions = [
            {label: 'Devices', value: 'device'}, {label: 'Browsers', value: 'browser'}
            // , {label: 'Both', value: 'both'}
        ];
        this.showingOptions = [
            {label:'All', value:'devices'}, {label:'Favourites', value:'favorites'}
        ];
        this.activeOnOrAfter = moment().subtract(1, 'month')
                                       .toDate();
        this.deviceList = {};
    }

    ngOnInit() {
        // this.onRefreshClick();
        this.refreshFavoriteDevices();
    }

    onRefreshClick() {
        if(this.showing === 'devices'){
            let pf = (this.platform.length == 2)? 'both': this.platform[0];
            this.deviceService.searchDevices(this.searchText, pf,
                this.activeOnOrAfter, this.currentPage, this.pageSize)
                .subscribe((deviceList:DeviceList)=>{
                    this.deviceList = deviceList;
                });
        }
        else {
            this.refreshFavoriteDevices();
        }

    }
    onDeviceUpdated(event: any) {
       this.deviceList = fromJS(this.deviceList)
           .setIn(['deviceList', ''+event.index], event.device).toJS();

    }

    onPage(pageNo: number) {
        this.currentPage = pageNo;
        this.onRefreshClick();
    }
    onPageSize(){
        this.onRefreshClick();
    }
    totalSelected(): number {
        if(this.deviceList && this.deviceList.deviceList)
            return this.deviceList.deviceList.filter(device=>device.selected)
                .length;
        else return 0;
    }
    refreshFavoriteDevices() {
        this.deviceService.listFavorites()
            .subscribe((favorites: Device[])=>{
                this.favoriteDevices = favorites;
                this.favoriteDeviceIds = this.favoriteDevices.map(d=>d.deviceId);
                this.filterFavorites();
            });
    }
    filterFavorites(){
        if(this.favoriteDevices){
            if(this.favoriteFilter)
                this.filteredFavorites = this.favoriteDevices.filter(d=>{
                    return (d.platform && d.platform.indexOf(this.favoriteFilter) >= 0 )
                        || (d.userTags && d.userTags.indexOf(this.favoriteFilter) >= 0)
                    || (d.deviceName && d.deviceName.indexOf(this.favoriteFilter) >=0)
                    || (d.platformVersion && d.platformVersion.indexOf(this.favoriteFilter) >=0)
                    || (d.model && d.model.indexOf(this.favoriteFilter) >=0)
                    || (d.serial && d.serial.indexOf(this.favoriteFilter) >=0)
                    || (d.manufacturer && d.manufacturer.indexOf(this.favoriteFilter) >=0)
                });
            else this.filteredFavorites = [...this.favoriteDevices];
        }
        else this.filteredFavorites = [];

    }
    addToFavorites(selectedDevices) {
        this.deviceService.addToFavorites(selectedDevices)
            .subscribe((result: ServerResult)=>{
                if(result.success) {
                    this.messages.push({
                        severity: 'info',
                        detail: 'Added selected devices as favorites'
                    })
                    this.refreshFavoriteDevices();
                }
                else {
                    this.messages.push({
                        severity: 'error',
                        detail: "Error occured while updating favorite devices." + (result.message?result.message:'')
                    });
                }
            },(error)=>{
                let msg = Util.getErrorMessage(error,"Error occured while updating favorite devices.");
                this.messages.push({
                    severity: 'error',
                    detail: msg
                });
            });
    }
    removeFromFavorites(selectedDevices) {
        this.deviceService.removeFromFavorites(selectedDevices)
            .subscribe((result: ServerResult)=>{
                if(result.success) {
                    this.messages.push({
                        severity: 'info',
                        detail: 'Removed selected devices from favorites'
                    })
                    this.refreshFavoriteDevices();
                }
                else {
                    this.messages.push({
                        severity: 'error',
                        detail: "Error occured while updating favorite devices." + (result.message?result.message:'')
                    });

                }
            },(error)=>{
                let msg = Util.getErrorMessage(error,"Error occured while updating favorite devices.");
                this.messages.push({
                    severity: 'error',
                    detail: msg
                });
            });
    }
}
