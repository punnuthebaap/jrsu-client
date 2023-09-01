import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
// importing service
import { BasicService } from '../../../service/basic.service';
// importing sweetalert
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  roles : any = []; 
  departments : any = []; 
  semesters : any = [];
  isRoleSelected: boolean = false;
  isDepartmentSelected: boolean = false;
  userForm: FormGroup | any;
  constructor(public route: Router, private basicService: BasicService) { }

  ngOnInit() {
    this.getAllRoles();
    this.userForm = new FormGroup({
      regId : new FormControl('', [Validators.required]), 
      email : new FormControl('', [Validators.required, Validators.email]),
      password : new FormControl('', [Validators.required, Validators.minLength(8)]),
      cpassword : new FormControl('', [Validators.required, Validators.minLength(8)]),
      role : new FormControl('0', [Validators.required]),
      department : new FormControl('0', [Validators.required]),
      currentSemester : new FormControl('0'),
    });
  }

  getAllRoles(): void {
    this.basicService.getAllRoles().subscribe((res :any) => {
      this.roles = res.data;
    })
  }

  setRoleSelected(): void {
    if(this.userForm.value.role !== '0'){
      if(this.userForm.value.role == '7'){
        this.getAllCourses();
      }
      else{
        this.getAllDepartments();
      }
      this.isRoleSelected = true;
    }
  }

  getAllDepartments(): void {
    this.basicService.getAllDepartments().subscribe((res :any) => {
      this.departments = res.data;
      console.log(res)
    })
  }

  getAllCourses(): void {
    this.basicService.getAllCourses().subscribe((res :any) => {
      this.departments = res.data;
      console.log(res)
    })
  }

  getSemesters(): void {
    this.basicService.getAllSemesterForCourse({"deptId" : this.userForm.value.department}).subscribe((res :any) => {
      this.semesters = res.data;
      console.log(res)
    })
  }

  setDepartmentSelected(): void {
    if(this.userForm.value.department !== '0'){
      if(this.userForm.value.role === '7'){
        this.getSemesters();
        this.isDepartmentSelected = true;
      }
    }
  }

  get f() {
    return this.userForm.controls;
  }

  registerUser(): void {
    console.log(this.userForm.value);
    this.basicService.saveUser(this.userForm.value).subscribe((res : any) => {
      console.log(res)
      if(res.error){
        this.showToaster('error', 'Register User', res.message? res.message : res.data);
      }
      else{
        this.showToaster('success', 'Register User', "Registered Successfully, Login to continue!");
        this.userForm.reset();
        this.isDepartmentSelected = false;
        this.isRoleSelected = false;
      }
    },(error) =>{
      // console.log(error);
      this.showToaster('error', 'Register User', error.error.message? error.error.message : error.error.data);
    });
  }

  showToaster(icon: any, title: any, text: any){
    const toast = Swal.mixin({ toast: false, allowOutsideClick: false, allowEscapeKey: false });
    toast.fire({icon:icon, title:title, text:text});
  }
}
