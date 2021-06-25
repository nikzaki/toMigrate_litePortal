import {sessionReducer} from './session-reducer';
import {createAction} from '../create-action';
import {SessionActions} from './session-actions';
import {Session} from '../../models/session/session';
import {Admin} from '../../models/mygolf/admin';
import {Player} from '../../models/mygolf/player/player';

/**
 * Testing sessionReducer
 * Created by ashok on 05/05/17.
 */
const sampleSession: Session = {
    authToken: 'xyz',
    status   : 'active',
    userInfo : {
        userId  : 1,
        userName: 'Test Player',
        userType: 'Player',
        password: '123456'
    }
};
const sampleAdminSession: Session = {
    authToken: 'xyz',
    status   : 'active',
    userInfo : {
        userId  : 101,
        userName: 'myGolf2u Admin',
        userType: 'Admin',
        password: '123456'
    }
};
const sampleAdmin: Admin  ={
    name: 'myGolf2u Admin'
};
const samplePlayer: Player = {
    playerId: 11,
    userId: 1,
    playerName: 'Test Player',
    firstName: 'Test',
    lastName: 'Player'
}
describe('Session Reducer', () => {
    it('Initial State', () => {
        expect(sessionReducer(null, createAction(''))).toEqual({status: 'inactive'});
    });
    it('Login Pending', () => {
        expect(sessionReducer({status: 'inactive'}, createAction(SessionActions.LOGIN_PENDING)))
            .toEqual({status: 'inprogress', error: ''});
    });
    it('Login Success', () => {
        const initialState = {status: 'inprogress', error: ''};
        const state1 = sessionReducer(initialState, createAction(SessionActions.LOGIN_SUCESS));
        expect(state1).toBeTruthy();
        //No payload (Session) is passed, the state isn't changed. Returns the same state back
        expect(state1).toBe(initialState);

        let state2 = sessionReducer(state1, createAction(SessionActions.LOGIN_SUCESS, sampleSession));
        expect(state2).toBeTruthy();
        expect(state2).not.toBe(initialState);
        expect(state2.status).toEqual('active');
        expect(state2.authToken).toEqual('xyz');
        //Expect in new state, new UserInfo created from sampleSession.userInfo. Not reference
        expect(state2.userInfo).not.toBe(sampleSession.userInfo);
        expect(state2.userInfo).toEqual(sampleSession.userInfo);
    });

    it('Admin Logged In', ()=>{
        const initialState = {status: 'inprogress', error: ''};
        const state1 = sessionReducer(initialState, createAction(SessionActions.LOGIN_SUCESS, sampleAdminSession));
        expect(state1).toBeTruthy();
        expect(state1).not.toBe(initialState);
        expect(state1.status).toEqual('active');
        expect(state1.authToken).toEqual('xyz');
        expect(state1.userInfo).toEqual(sampleAdminSession.userInfo);
        expect(state1.userData).toBeFalsy();
        const state2 = sessionReducer(state1, createAction(SessionActions.ADMIN_LOGGED_IN));
        expect(state2).toBeTruthy();
        //No change in state object.
        expect(state2).toEqual(state1);
        const state3 = sessionReducer(state2, createAction(SessionActions.ADMIN_INFO_POPULATE, sampleAdmin));
        expect(state3).toBeTruthy();
        expect(state3.userData).toBeTruthy();
        // expect(state3.userData).not.toBe(sampleAdmin);
        expect(state3.userData).toEqual(sampleAdmin);
    });
    it('Player Logged In', ()=> {

        const initialState = {status: 'inprogress', error: ''};
        const state1 = sessionReducer(initialState, createAction(SessionActions.LOGIN_SUCESS, sampleSession));
        expect(state1).toBeTruthy();
        const  state2 = sessionReducer(state1, createAction(SessionActions.PLAYER_LOGGED_IN));
        expect(state2).toBeTruthy();
        //No change in state object.
        expect(state2).toEqual(state1);
        const state3 = sessionReducer(state2, createAction(SessionActions.PLAYER_INFO_POPULATE, samplePlayer));
        expect(state3).toBeTruthy();
        expect(state3.userData).toBeTruthy();
        // expect(state3.userData).not.toBe(samplePlayer);
        expect(state3.userData).toEqual(samplePlayer);
    });
});