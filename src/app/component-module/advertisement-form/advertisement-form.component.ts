import {
    Component, OnInit, Input, ViewEncapsulation, ViewChild, Output, EventEmitter, OnChanges,
    SimpleChanges
} from '@angular/core';
import {Advertisement} from '../../models/mygolf/advertisement';
import {FormBuilder, FormControl,  Validators} from '@angular/forms';
import {FileUpload} from 'primeng/primeng';

@Component({
    selector   : 'advertisement-form',
    templateUrl: './advertisement-form.component.html',
    styleUrls  : ['./advertisement-form.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AdvertisementFormComponent implements OnInit, OnChanges {
    @Input() mode: string = 'create'; //Other values are 'edit' and 'short'
    @Input() advertisement: Advertisement;

    @Input() showButtons: boolean = true;
    @Output() onCreate: EventEmitter<FormData> = new EventEmitter();
    @Output() onUpdate: EventEmitter<any> = new EventEmitter();

    name: FormControl;
    companyName: FormControl;
    active: FormControl;
    startDate: FormControl;
    endDate: FormControl;
    displayPeriod: FormControl;
    rank: FormControl;
    externalUrl: FormControl;
    useIn: FormControl;
    @ViewChild('imageFileUpload') imageFileUpload: FileUpload
    constructor(private fb: FormBuilder) {
        this.name = new FormControl('', [Validators.required,Validators.minLength(5), Validators.maxLength(100)]);
        this.companyName = new FormControl('', [Validators.required,Validators.minLength(3), Validators.maxLength(100)]);
        this.active = new FormControl(true);
        this.startDate = new FormControl(new Date(), [Validators.required]);
        this.endDate = new FormControl(new Date(2999, 11, 31), [Validators.required]);
        this.displayPeriod = new FormControl(1);
        this.rank = new FormControl(1);
        this.externalUrl = new FormControl('');
        this.useIn = new FormControl(['PG', 'PC', 'AG', 'AC']);
    }

    ngOnInit() {
    }

    ngOnChanges(changes: SimpleChanges): void {
        if(changes.advertisement && this.advertisement ){
            if(this.advertisement){
                this.name.setValue(this.advertisement.name);
                this.companyName.setValue(this.advertisement.companyName);
                this.active.setValue(this.advertisement.active);
                this.startDate.setValue(new Date(this.advertisement.startDate));
                this.endDate.setValue(new Date(this.advertisement.endDate));
                this.displayPeriod.setValue(this.advertisement.displayPeriod);
                this.rank.setValue(this.advertisement.rank);
                this.externalUrl.setValue(this.advertisement.externalUrl);
                this.useIn.setValue(this.advertisement.useIn);
            }
            else  this.resetForm();

        }

    }

    onSelect(event) {
    }
    resetForm() {
        this.name.reset();
        this.companyName.reset();
        // this.startDate.setValue(new Date());
        this.startDate.reset(new Date());
        this.endDate.reset(new Date(2999, 11, 31));
        this.displayPeriod.reset(1);
        this.rank.reset(1);
        if(this.imageFileUpload)
            this.imageFileUpload.clear();
        this.externalUrl.reset('');
        this.useIn.reset(['PG', 'PC', 'AG', 'AC']);
    }
    isFormValid() {
        let valid = this.name.valid && this.companyName.valid && this.startDate.valid
         && this.endDate.valid && this.displayPeriod.valid && this.rank.valid;
        if(this.mode === 'create' && this.imageFileUpload){
            valid = valid &&((this.imageFileUpload.files.length)?true:false);
        }
        return valid;
    }
    onClear(){
        this.resetForm();
    }
    onCreateClick($event) {
        if(this.mode === 'create'){
            let data: FormData = this.getFormData();
            this.onCreate.emit(data);
        }

    }
    onUpdateClick($event){
        if(this.mode === 'edit' && this.advertisement ){
            let data: FormData = this.getFormData();

            // data.adId = this.advertisement.id;
            this.onUpdateClick({
                formData: data,
                currentData: this.advertisement
            });
        }

    }
    getFormData(): FormData {

        let imageFile: File = (this.imageFileUpload && this.imageFileUpload.files && this.imageFileUpload.files.length)
            ?this.imageFileUpload.files[0]:null;
        let useIn = (<string []>this.useIn.value).join(',');
        let formData: FormData = new FormData();

        formData.append("name", this.name.value);
        formData.append("active", this.active.value +'');
        formData.append("companyName", this.companyName.value);
        formData.append("startDate", this.startDate.value);
        formData.append("endDate", this.endDate.value);
        formData.append("displayPeriod", this.displayPeriod.value);
        formData.append("rank", this.rank.value);
        formData.append("useIn", useIn);
        formData.append("externalUrl", this.externalUrl.value);
        if(imageFile)
            formData.append("adImageFile", imageFile, imageFile.name);
        if((this.mode === 'edit' || this.mode === 'short') && this.advertisement)
            formData.append("adId", this.advertisement.id+'');
        return formData;
    }
}
