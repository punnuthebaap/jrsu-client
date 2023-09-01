import { State, Action, StateContext, Selector } from '@ngxs/store';
import { LoginState } from '../models/login.model';
import { AddState, RemoveState } from './state.action';

export class GlobalStateModel {
    globalState : LoginState
}

@State<GlobalStateModel><any>({
    name: 'globalState',
    defaults: {
        globalState: []
    }
})

export class GlobalState {
    @Selector()
    static getGlobalState(state: GlobalStateModel){
        return state.globalState
    }

    @Action()
    add({getState, patchState}: StateContext<GlobalStateModel>, { payload }: AddState)
}