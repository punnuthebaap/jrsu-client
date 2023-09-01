import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
// importing service
import { BasicService } from '../../../service/basic.service';
import { StateService } from '../../../service/state.service';
// importing sweetalert
import Swal from 'sweetalert2';
// using NGXS
import { Store } from "@ngxs/store";
import { User, UserState } from "src/app/state";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  isAuthenticated$ = this.store.select(UserState.isLoggedIn);
  user$ = this.store.select(UserState.user);
  loginForm: FormGroup | any;
  isLoading: boolean = false;
  constructor(public route: Router, private basicService: BasicService, private stateService: StateService,
              private store: Store) { }

ngOnInit() {
  
  console.log(this.isAuthenticated$)
    this.loginForm = new FormGroup({
      regId : new FormControl('', [Validators.required]),
      password : new FormControl('', [Validators.required, Validators.minLength(8)])
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  login() {
    this.isLoading=true;
    Swal.fire({
      icon: 'info', text: 'Please wait while check your details',
      position: 'center', didOpen: () => { Swal.showLoading() }
    });
    console.log(this.loginForm.value);
    this.basicService.login(this.loginForm.value).subscribe((res : any) => {
      console.log(res)
      if(res.error){
        this.showToaster('error', 'Log User', res.message? res.message : res.data);
      }
      else{
        this.store.dispatch(new User.Auth.LoginFlowInitiated());
        this.stateService.setState(res.token,res.data);
        this.showToaster('success', 'Log User', "Logged in Successfully");
        this.navigateByRole(res.data.role);
      }
    },(error: any) =>{
      // console.log(error);
      this.showToaster('error', 'Log User', error.error.message? error.error.message : error.error.data);
    },()=>{
      Swal.close();
    });
  }

  showToaster(icon: any, title: any, text: any){
    const toast = Swal.mixin({ toast: false, allowOutsideClick: false, allowEscapeKey: false });
    toast.fire({icon:icon, title:title, text:text});
  }

  navigateByRole(role: any) {
    if(role == 8){
      this.route.navigate(["/exam-dash"]);
    }
    if(role == 7){
      this.route.navigate(["/student-dash"]);
    }
  }
}
