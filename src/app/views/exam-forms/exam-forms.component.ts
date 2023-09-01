import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
// importing service
import { StateService } from '../../service/state.service';
import { DepartmentService } from '../../service/department.service';
// importing sweetalert
import Swal from 'sweetalert2';

@Component({
  selector: 'app-exam-forms',
  templateUrl: './exam-forms.component.html',
  styleUrls: ['./exam-forms.component.scss']
})
export class ExamFormsComponent {
  allExam: any; 
  isAllExam : boolean = false;
  onlyExam: boolean = true;
  isLoading: boolean = false;
  dataSource: any = [];
  dataSource1: any = [];
  titleExamApplication: string ='';
  titleExamType: string ='';
  role: any;
  users: any;
  userId: any;
  constructor(public route: Router, private general: DepartmentService, private stateService: StateService) { }

  ngOnInit(): void {
    const user = this.stateService.getState();
    const role = user.details.role;
    this.role = role;
    this.userId = user.details.id;
    const department = user.details.department;
    this.getAllExamData();
  }

  getAllExamData() {
    this.general.getAllExams().subscribe((res :any) => {
      if(res.data.length<1){
        this.showToaster('error','Exam Forms','Data not found');
      }
      else{
        this.dataSource = res.data;
        console.log(res)
        this.isAllExam = true
      }
    });
  }

  viewExamApp(item: any){
    this.isLoading = true;
    this.titleExamType = item.examtype;
    this.titleExamApplication = item.examName;
    this.general.getAllExamFormByExam({id: item.id}).subscribe((res :any) => {
      if(res.data.length<1){
        this.showToaster('error','Exam Applications','Data not found');
        this.isLoading = false;
      }
      else{
        this.dataSource = res.data;
        this.isLoading = false;
        this.onlyExam=false;
        console.log(res)
      }
      // this.isAllExam = true
    });
  }
  showToaster(icon: any, title: any, text: any){
    const toast = Swal.mixin({ toast: false, allowOutsideClick: false, allowEscapeKey: false });
    toast.fire({icon:icon, title:title, text:text});
  }

  backToExamForms(){
    this.onlyExam=true;
    this.isLoading=false;
  }

  applyForExams(item: any){
    Swal.fire({
      icon: 'info', text: 'Please wait applying for exams',
      position: 'center', didOpen: () => { Swal.showLoading() }
    });
    let studentId = 0;
    let cS= 0;
    this.general.getCurrentSemester({id: this.userId}).subscribe((res :any) => {
      studentId = res.data[0].id;
      cS = res.data[0].currentSemester;
    });
    let obj={
      examFormId : item.id,
      studentId : studentId,
      currentSemester : cS
    }
    
    this.general.checkWhetherApplicationExist(obj).subscribe((res: any)=> {
      console.log(res)
      if(res.data.length>1){
        this.showToaster('info','Applying for exams',' Already applied for exams.');
      }
      else{
        this.general.applyForExam(obj).subscribe((res: any)=> {
          this.showToaster('success','Applying for exams','Applied');
        })
      }
    },()=>Swal.close());
  }
}
