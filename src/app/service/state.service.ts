import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  constructor() { }

  setState(token : string, LoginDetails: any){
    const state = {
      isLoggedIn : true,
      token : token,
      details : LoginDetails
    }
    localStorage.setItem('globalState', JSON.stringify(state));
  }

  getState(){
    return JSON.parse(localStorage.getItem('globalState') || '{}');
  }

  removeState(){
    localStorage.removeItem('globalState');
  }

  isLoggedIn(){
    return !!localStorage.getItem('globalState');
  }
  
}
