export namespace User {
    export namespace Auth {
      export class LoginFlowInitiated {
        static readonly type = "[Login] Login Flow Initiated";
      }
  
      export class LogoutFlowInitiated {
        static readonly type = "[Login] Logout Flow Initiated";
      }
    }
    // export class UserChangedFromAuth0SDK {
    //   static readonly type = "[Auth0 SDK] User Changed";
    //   constructor(public payload: { user: undefined }) {}
    // }
}