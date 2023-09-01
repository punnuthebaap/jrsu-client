import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  constructor(private route: Router) { }

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
    this.route.navigate(['/login']);
  }

  isLoggedIn(){
    return !!localStorage.getItem('globalState');
  }
  
}
