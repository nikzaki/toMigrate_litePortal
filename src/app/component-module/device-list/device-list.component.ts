import {
    Component,
    OnInit,
    Input,
    Output,
    EventEmitter,
    OnChanges,
    ViewEncapsulation,
    ViewChild,
    ElementRef,
    ChangeDetectorRef
} from '@angular/core';

import {Inplace, DataGrid} from 'primeng/primeng';
import {DeviceService} from '../../services/device.service';
import {Device} from '../../models/mygolf/device/device';
import {ServerResult} from '../../models/server-result';


@Component({
    selector     : 'device-list',
    templateUrl  : './device-list.component.html',
    styleUrls    : ['./device-list.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class DeviceListComponent implements OnInit, OnChanges {
    @Input() deviceList: Device[];
    @Input() displayMode: string = 'grid'; //Other option 'compact'
    @Input() showing: string     = 'devices'; //Other option is 'favorites';
    @Input() allowEdit: boolean;
    @Input() selectable: boolean;
    @Input() showPaginator: boolean;
    @Input() rowsPerPage: number = 20;
    @Input() totalItems: number  = 0;
    @Input() favoriteDevices: string [];
    @Input() paginatorPosition: string = 'top';
    @Output() onPage: EventEmitter<number>;
    @Output() onDeviceUpdate: EventEmitter<any>;
    @Output() onSelectionChange: EventEmitter<any>;
    @Output() onAddToFavorite: EventEmitter<string>;
    @Output() onRemoveFromFavorite: EventEmitter<string>;
    @ViewChild('nameditor')
             nameEditor: Inplace;
    @ViewChild('tageditor')
             tagEditor: Inplace;
    @ViewChild('nametext')
             nameText: ElementRef;
    @ViewChild('tagtest')
             tagText: ElementRef;
    @ViewChild('devicelist') deviceGrid: DataGrid
    currentFirstRow: number = 0;
    currentRows: number     = 0;

    constructor(private deviceService: DeviceService,
        private cd: ChangeDetectorRef) {
        this.onPage               = new EventEmitter();
        this.onDeviceUpdate       = new EventEmitter();
        this.onSelectionChange    = new EventEmitter();
        this.onAddToFavorite      = new EventEmitter();
        this.onRemoveFromFavorite = new EventEmitter();
    }

    ngOnInit() {
    }

    ngOnChanges() {
    }

    isBrowser(device: Device) {
        return (device.platform === 'Mozilla' && device.model === 'Netscape');
    }

    browserName(device: Device) {
        if (device.manufacturer && device.manufacturer.indexOf('Apple') >= 0) {
            return 'Safari';
        } else if (device.manufacturer && device.manufacturer.indexOf('Google') >= 0) {
            return 'Google Chrome';
        } else {
            return device.model;
        }
    }

    onNameChange(device: Device, index: number) {
        // device.dirty = true;
        this.nameEditor.deactivate(null);
        this.saveDevice(device, index);
    }

    onUserTagChange(device: Device, index: number) {
        this.tagEditor.deactivate(null);
        this.saveDevice(device, index);
    }

    onNameContentActivate() {
        // this.nameText.nativeElement.focus();
        // this.nameText.nativeElement.select();
    }

    onUserTagContentActivate() {
        // this.tagText.nativeElement.focus();
        // this.tagText.nativeElement.select();
    }

    saveDevice(device: Device, index: number) {
        this.deviceService.updateDevice(device)
            .subscribe((updated: Device) => {
                this.onDeviceUpdate.emit({
                    index : index,
                    device: updated
                });
            }, (error) => {
                console.log("Error updating device info");
            })
    }

    revertChanges(deviceId: string, index: number) {
        this.deviceService.getDeviceInfo(deviceId)
            .subscribe((device: Device) => {
                if (device != null) {
                    this.onDeviceUpdate.emit({
                        index : index,
                        device: device
                    });
                }
            })
    }

    selectAll() {
        console.log(JSON.stringify(this.deviceGrid.dataToRender));
        let devices: Device [] = [];
        let deviceToConsider : Device[]      =  this.deviceGrid.dataToRender;
            //     (this.showing === 'devices')
            // ? this.deviceList
            // : (this.currentRows)
            //                              ? this.deviceList.slice(this.currentFirstRow, (this.currentFirstRow + this.currentRows))
            //                              : this.deviceList;
        deviceToConsider.forEach((device, index) => {
            if (!device.selected) {
                device.selected = true;
                devices.push(device);
            }
        });
        if (devices.length) {
            this.onSelectionChange.emit({
                type   : 'selected',
                devices: devices
            });
        }
    }

    clearSelection() {
        let devices: Device [] = [];
        let deviceToConsider: Device[]      =  this.deviceGrid.dataToRender;
            //     (this.showing === 'devices')
            // ? this.deviceList : this.deviceList.slice(this.currentFirstRow, (this.currentFirstRow + this.currentRows));
        deviceToConsider.forEach(device => {

            if (device.selected) {
                device.selected = false;
                devices.push(device);
            }

        });
        if (devices.length) {
            this.onSelectionChange.emit({
                type   : 'unselected',
                devices: devices
            });
        }
    }

    totalSelected(): number {

        if (this.deviceList ) {
            return this.deviceList.filter(d => d.selected).length;
        } else {
            return 0;
        }
    }
    totalSelectedInPage(): number {
        let deviceToConsider: Device[]      =  this.deviceGrid.dataToRender;
        return deviceToConsider.filter(d => d.selected).length;

    }
    onPageEvent(event) {
        let firstRowOffset   = event.first;
        let numberOfRows     = event.rows;
        this.currentFirstRow = firstRowOffset;
        this.currentRows     = numberOfRows;
    }

    onLazyLoad(event) {
        let firstRowOffset   = event.first;
        let numberOfRows     = event.rows;
        this.currentFirstRow = firstRowOffset;
        this.currentRows     = numberOfRows;
        //Derive the page
        let pageNo           = (event.first) / this.rowsPerPage + 1;
        this.onPage.emit(pageNo);
    }

    toggleSelection(device: Device, index: number) {
        if (this.selectable) {
            let selected    = !device.selected;
            device.selected = selected;
            this.onSelectionChange.emit({
                type   : (selected) ? 'selected' : 'unselected',
                devices: [device]
            });
        }
    }

    identifyDevice(device: Device) {
        this.deviceService.identifyDevice(device.deviceId)
            .subscribe((result: ServerResult) => {
                console.log("Identified the device");
            })
    }

    isFavoriteDevice(device: Device) {
        if (this.showing === 'devices' && this.favoriteDevices) {
            return this.favoriteDevices.filter(id => id === device.deviceId).length;
        }
        else {
            return 0;
        }
    }

    onAddToFavoriteClick() {
        let selected = this.deviceGrid.dataToRender.filter(d => d.selected)
                           .map(d => d.deviceId)
                           .join(',');
        this.onAddToFavorite.emit(selected);
        this.clearSelection();
    }

    onRemoveFromFavoriteClick() {
        let selected = this.deviceGrid.dataToRender.filter(d => d.selected)
                           .map(d => d.deviceId)
                           .join(',');
        this.onRemoveFromFavorite.emit(selected);
    }
}
