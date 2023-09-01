import { Injectable } from "@angular/core";
import { State, Selector, Action, Store, StateContext  } from "@ngxs/store";
import { UserStateModel } from "../user/user.model";
import { User } from "./user.action";

@State<UserStateModel>({
  name: "user",
  defaults: {
    userDetails: undefined,
  },
})

@Injectable()

export class UserState {
    constructor(private store: Store) {
        // this.listenToUserChange();
      }
    @Action(User.Auth.LoginFlowInitiated)
    login() {
        // this.authService.loginWithRedirect();
    }

  // ✨ New 👇
    @Action(User.Auth.LogoutFlowInitiated)
    logout() {
        // this.authService.logout();
    }
    
    @Selector()
    static user(state: UserStateModel) {
        return state.userDetails;
    }

    @Selector()
    static isLoggedIn(state: UserStateModel) {
        return !!state.userDetails;
    }
}