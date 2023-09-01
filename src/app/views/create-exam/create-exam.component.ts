import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
// importing service
import { StateService } from '../../service/state.service';
import { DepartmentService } from '../../service/department.service';
// importing sweetalert
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-exam',
  templateUrl: './create-exam.component.html',
  styleUrls: ['./create-exam.component.scss']
})
export class CreateExamComponent implements OnInit {
  createExamForm : FormGroup | any;
  constructor(public route: Router, private general: DepartmentService, private stateService: StateService) { }

  ngOnInit(): void {
    this.createExamForm = new FormGroup({
      examName : new FormControl('', [Validators.required]),
      examType : new FormControl('', [Validators.required]),
      startDate : new FormControl('', [Validators.required]),
      endDate : new FormControl('', [Validators.required])
    });
  }

  createExam(){
    Swal.fire({
      icon: 'info', text: 'Please wait while check your details',
      position: 'center', didOpen: () => { Swal.showLoading() }
    });
    console.log(this.createExamForm.value);
    this.general.createNewExam(this.createExamForm.value).subscribe((res : any) => {
      console.log(res)
      if(res.error){
        this.showToaster('error', 'Create Exam', res.message? res.message : res.data);
      }
      else{
        this.showToaster('success', 'Create Exam', "Created successfully");
      }
    },(error) =>{
      // console.log(error);
      this.showToaster('error', 'Create Exam', error.error.message? error.error.message : error.error.data);
    },()=>{
      // Swal.close();
      this.createExamForm.reset();
    });
  }

  showToaster(icon: any, title: any, text: any){
    const toast = Swal.mixin({ toast: false, allowOutsideClick: false, allowEscapeKey: false });
    toast.fire({icon:icon, title:title, text:text});
  }

}
