import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {ConfirmationService, Dialog, SelectItem} from 'primeng/primeng';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import {Subject} from 'rxjs/Subject';
import {Action} from '../../models/action';
import {Advertisement, AdvertisementList} from '../../models/mygolf/advertisement';
import {ServerResult} from '../../models/server-result';
import {AdvertisementService} from '../../services/advertisement.service';
import {Util} from '../../util';
import {AdvertisementFormComponent} from '../advertisement-form/advertisement-form.component';

@Component({
    selector   : 'advertise-management',
    templateUrl: './advertise-management.component.html',
    styleUrls  : ['./advertise-management.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AdvertiseManagementComponent implements OnInit {
    searchString: string = '';
    searchStringSubject: Subject<string> = new Subject();
    activeType: string = 'both';
    activeTypes: SelectItem[];
    includeExpired: boolean = true;
    currentPage: number = 1;
    pageSize: number = 30;
    advertisementList: AdvertisementList;

    itemActions: Action[] = [];
    actions: Action[] = [];
    displayAdInfo: Advertisement = null;

    editMode: string = 'none';
    editingAdvertisement: Advertisement;

    @ViewChild('adInfoDialog')
    adInfoDialog: Dialog;
    @ViewChild('addEditDialog')
    adEditDialog: Dialog;
    @ViewChild('adForm')
    adForm: AdvertisementFormComponent;
    constructor(private advertisementService: AdvertisementService,
            private confirmService: ConfirmationService) {
        this.activeTypes = [{
            value:'active', label:'Active'
        },{
            value:'inactive', label:'Inactive'
        },{
            value:'both', label: 'Both'
        }];
        this.itemActions = [{
            actionId: 'details', iconOnly: true, description: 'Show advertisement details',
            icon: 'mdi mdi-information', extraClasses: 'ui-button-success'
        },{
            actionId: 'edit', iconOnly: true, description: 'Edit this advertisement', icon: 'mdi mdi-pencil',
            extraClasses: 'ui-button-info', color: 'accent'
        },{
            actionId: 'delete', iconOnly: true, description: 'Delete this advertisement',
            icon: 'mdi mdi-delete', color: 'warn',
            extraClasses: 'ui-button-danger'
        }];
        this.actions = [{
            actionId: 'add', iconOnly: true, description: 'Add new advertisement',
            color:'accent',
            icon: 'mdi mdi-plus', extraClasses: 'ui-button-success ui-square-button'
        },{
            actionId: 'refresh', iconOnly:true,color:'accent',
            icon:'mdi mdi-refresh', extraClasses: 'ui-square-button'
        }]
    }

    ngOnInit() {
        this.searchStringSubject
            .debounceTime(300)
            .distinctUntilChanged()
            .subscribe(()=>{
                this.onFilterChange();
            });
        this.refreshAds();
    }
    onFilterChange(){
        this.currentPage = 1;
        this.refreshAds();
    }
    refreshAds(){
        this.advertisementService.searchAds(this.searchString, this.activeType,
            this.includeExpired, this.currentPage, this.pageSize)
            .subscribe((adlist: AdvertisementList)=>{
                this.advertisementList = adlist;
            })
    }
    createAdvertisement(adForm: AdvertisementFormComponent){
        if(adForm){
            let formData = adForm.getFormData();
            this.advertisementService.createAd(formData)
                .subscribe((ad: Advertisement)=>{
                    this.editMode = 'none';
                    this.refreshAds();
                },(error)=>{
                    let msg = Util.getErrorMessage(error, 'Error creating advertisement');
                    alert(msg);
                });

        }
    }
    updateAdvertisement(adForm: AdvertisementFormComponent){
        if(adForm){
            let formData = adForm.getFormData();
            this.advertisementService.updateAd(formData)
                .subscribe((ad: Advertisement)=>{
                    this.editMode = 'none';
                    this.refreshAds();
                },(error)=>{
                    let msg = Util.getErrorMessage(error, 'Error updating advertisement');
                    alert(msg);
                })

        }
    }
    onSearchStringChange(event){
        this.searchStringSubject.next(event);
    }
    onPageRequest(event){
        this.currentPage = event.page;
        this.refreshAds();
    }
    onAdListAction(event){
        switch(event.actionId) {
            case 'add':
                this.editingAdvertisement = null;
                this.adForm.resetForm();
                this.editMode = 'create';
                break;
            case 'refresh':
                this.refreshAds();
                break;
        }
    }
    onAdAction(event) {
        switch(event.actionId) {
            case 'details':
               this._showAdDetails(event.data, event.event);
               break;
            case 'edit':
                this.editingAdvertisement = event.data;
                this.editMode = 'edit';
                break;
            case 'delete':
                this._showDeleteConfirm(event.data);
                break;

        }
    }
    private _createAd(){
        let formData: FormData = this.adForm.getFormData();
        this.advertisementService.createAd(formData)
            .subscribe((ad: Advertisement)=>{
                alert('Crated advertisement: ' + ad.name);
                this.adForm.resetForm();
            },(error)=>{
                let msg = Util.getErrorMessage(error, 'Error creating AD');
            });
    }
    _showAdDetails(ad: Advertisement, event){
        this.displayAdInfo = ad;
    }
    _onDetailsHide() {
        this.displayAdInfo = null;
    }
    _showDeleteConfirm(ad: Advertisement){
        this.confirmService.confirm({
            message: 'Do you want to delete the advertisement?' + ad.name,
            accept: ()=>{
                this._deleteAd(ad);
            }
        })
    }
    _deleteAd(ad: Advertisement) {
        this.advertisementService.deleteAd(ad.id)
            .subscribe((result: ServerResult)=>{
                this.onFilterChange();
            });
    }
}
