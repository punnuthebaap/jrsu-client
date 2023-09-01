import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { StateService } from '../service/state.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  constructor(private state : StateService, private router: Router) {
  }

  canActivate() {
    if(this.state.isLoggedIn()){
      return true;
    }
    this.router.navigate(['login']);
    return false;
  }
  
}