import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../../models/appstate';
import {Observable} from 'rxjs/Observable';
import {Message} from 'primeng/primeng';
/**
 * Created by ashok on 09/06/17.
 */

@Injectable()
export class SystemMessageService {
    constructor(private store: Store<AppState>) {
    }

    public lastMessage(): Observable<Message> {
        return this.store.select(store=>store.systemMessages.lastMessage)
            .filter(Boolean);
    }
    public messages(): Observable<Message[]> {
        return this.store.select(store=>store.systemMessages.messages)
                   .filter(Boolean);
    }

    public growlMessages(): Observable<Message[]> {
        return this.store.select(store=>store.systemMessages.growlMessages);
    }
}