import {Store} from '@ngrx/store';
import {AppState} from '../../models/appstate';
import {Message} from 'primeng/primeng';
import {Injectable} from '@angular/core';
import {ToastsManager} from 'ng2-toastr/ng2-toastr';
/**
 * Created by ashok on 09/06/17.
 */

@Injectable()
export class SystemMessageActions {
    public static ADD_MESSAGE = 'ADD_MESSAGE';
    public static REMOVE_MESSAGE = 'REMOVE_MESSAGE';
    public static CLEAR_MESSAGES = 'CLEAR_MESSAGES';
    public static ADD_GROWL_MESSAGE = 'ADD_GROWL_MESSAGE';
    public static SET_GROWL_MESSAGES = 'SET_GROWL_MESSAGES';
    public static REMOVE_GROWL_MESSAGE = 'REMOVE_GROWL_MESSAGE';
    public static CLEAR_GROWL_MESSAGES = 'CLEAR_GROWL_MESSAGES';
    growlMessages: Message[] = [];
    messages: Message[] = [];
    constructor(private store: Store<AppState>, private toastManager: ToastsManager) {
    }

    public info(detail: string, summary?: string) {
        this.addMessage({
            severity: 'info',
            detail: detail,
            summary: summary
        });
    }
    public warn(detail: string, summary?: string) {
        this.addMessage({
            severity: 'warn',
            detail: detail,
            summary: summary
        });
    }
    public error(detail: string, summary?: string) {
        this.addMessage({
            severity: 'error',
            detail: detail,
            summary: summary
        });
    }
    public errorGrowl(detail: string, summary?: string) {
        this.addGrowlMessage({
            severity: 'error',
            detail: detail,
            summary: summary
        });
    }
    public warningGrowl(detail: string, summary?: string) {
        this.addGrowlMessage({
            severity: 'warn',
            detail: detail,
            summary: summary
        });
    }
    public infoGrowl(detail: string, summary?: string) {
        this.addGrowlMessage({
            severity: 'info',
            detail: detail,
            summary: summary
        });

    }
    public addMessage(message: Message) {
        // this.store.dispatch(createAction(SystemMessageActions.ADD_MESSAGE, message));
        // this.primeMsgService.add(message);
        this.messages.push(message);
    }

    public removeMessage(message: Message) {
        // this.store.dispatch(createAction(SystemMessageActions.REMOVE_MESSAGE, message));
    }
    public setGrowlMessages(messages: Message[]){
        // this.store.dispatch(createAction(SystemMessageActions.SET_GROWL_MESSAGES, messages));
    }
    public clearMessages(){

        // this.store.dispatch(createAction(SystemMessageActions.CLEAR_MESSAGES));
    }

    public addGrowlMessage(message: Message){
        // this.store.dispatch(createAction(SystemMessageActions.ADD_GROWL_MESSAGE, message));
        // this.primeMsgService.add(message);
        // this.growlMessages.push(message);
        switch(message.severity){
            case 'error':
                this.toastManager.error(message.detail, message.summary);
                break;
            case 'warn':
                this.toastManager.warning(message.detail, message.summary);
                break;
            default:
                this.toastManager.info(message.detail, message.summary);
        }
    }
    public removeGrowlMessage(message: Message) {
        // this.store.dispatch(createAction(SystemMessageActions.REMOVE_GROWL_MESSAGE, message));
    }
    public clearGrowlMessages() {
        // this.store.dispatch(createAction(SystemMessageActions.CLEAR_GROWL_MESSAGES));
    }
}