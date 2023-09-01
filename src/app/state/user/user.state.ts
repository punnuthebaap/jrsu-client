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
        this.listenToUserChange();
    }

    @Action(User.UserNeedToBeUpdated)
    userNeedToBeUpdated(
        ctx: StateContext<UserStateModel>,
        actions: User.UserNeedToBeUpdated
    ) {
        const state = ctx.getState();
        ctx.setState({
        ...state,
        userDetails: actions.payload.user,
        });
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
    
    private listenToUserChange(): void {
        this.store.select(UserState.user).subscribe((user) => {
          this.store.dispatch(
            new User.UserNeedToBeUpdated({ user: user || undefined })
          );
        });
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