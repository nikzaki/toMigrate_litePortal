import {SystemMessages} from '../../models/system-messages';
import {Action} from '@ngrx/store';
import {SystemMessageActions} from './system-message-actions';
/**
 * Created by ashok on 09/06/17.
 */
let initSystemMessages: SystemMessages = {
    messages: [],
    growlMessages: []
}
export function systemMessageReducer(state: SystemMessages=initSystemMessages, action: Action): SystemMessages {
    switch(action.type) {
        case SystemMessageActions.ADD_MESSAGE:
            return {
                lastMessage: action.payload,
                messages: [...state.messages, action.payload],
                growlMessages: state.growlMessages
            };
        case SystemMessageActions.REMOVE_MESSAGE:
            let mgs = state.messages.filter(m=>m!==action.payload);
            if(state.lastMessage === action.payload)
                return {
                    lastMessage: null,
                    messages: mgs,
                    growlMessages: state.growlMessages
                }
            else return {
                lastMessage: state.lastMessage,
                messages: mgs,
                growlMessages: state.growlMessages
            } ;
        case SystemMessageActions.CLEAR_MESSAGES:
            return {
                lastMessage: null,
                messages: [],
                growlMessages: state.growlMessages
            };
        case SystemMessageActions.ADD_GROWL_MESSAGE:
            return {
                lastMessage: state.lastMessage,
                messages: state.messages,
                growlMessages: [...state.growlMessages, action.payload]
            };
        case SystemMessageActions.REMOVE_GROWL_MESSAGE:
            let msgs = state.growlMessages.filter(gm=>{
                return !Object.is(gm, action.payload);
            });
            return {
                lastMessage: state.lastMessage,
                messages: state.messages,
                growlMessages: msgs
            };
        case SystemMessageActions.SET_GROWL_MESSAGES:
            return {
                lastMessage: state.lastMessage,
                messages: state.messages,
                growlMessages: action.payload
            };
        case SystemMessageActions.CLEAR_GROWL_MESSAGES:
            return {
                lastMessage: state.lastMessage,
                messages: state.messages,
                growlMessages: []
            };
        default:
            return state;
    }
}