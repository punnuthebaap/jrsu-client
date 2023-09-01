import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StateService } from './state.service';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  apiUrl = 'http://localhost:3000/';
  token: any ;
  
  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': '*/*'
    }),
  };
  constructor(private http: HttpClient, private state: StateService) {
  }

  getHeader() {
    const token = this.state.getState().token;
    let header = new HttpHeaders().set(
      "Authorization",
      "Bearer " + token
    );
    return header
  }

  getDeptName(id: any) {
    return this.http.post(this.apiUrl + 'getDeptById', id ,{headers: this.getHeader()});
  }

  getRoleName(id: any) {
    return this.http.post(this.apiUrl + 'getRoleById', id ,{headers: this.getHeader()});
  }

  getUserCount() {
    return this.http.get(this.apiUrl + 'getUserCount', {headers: this.getHeader()});
  }

  getExamFormCount() {
    return this.http.get(this.apiUrl + 'getExamFormCount', {headers: this.getHeader()});
  }

  getCoursesCount() {
    return this.http.get(this.apiUrl + 'getCoursesCount', {headers: this.getHeader()});
  }

  createNewExam(data: any) {
    return this.http.post(this.apiUrl + 'createNewExam', data, {headers: this.getHeader()});
  }

  getAllExams() {
    return this.http.get(this.apiUrl + 'getAllExam', {headers: this.getHeader()});
  }

  getAllExamFormByExam(data: any) {
    return this.http.post(this.apiUrl + 'getAllExamFormByExam', data, {headers: this.getHeader()});
  }

  getCurrentSemester(data: any) {
    return this.http.post(this.apiUrl + 'getCurrentSemester', data, {headers: this.getHeader()});
  }

  getSemesterName(data: any) {
    return this.http.post(this.apiUrl + 'getSemesterName', data, {headers: this.getHeader()});
  }

  getTotalSubjects(data: any){
    return this.http.post(this.apiUrl + 'getTotalSubjectsByCourse', data, {headers: this.getHeader()});
  }

  applyForExam(data: any){
    return this.http.post(this.apiUrl + 'applyForExams', data, {headers: this.getHeader()});
  }

  checkWhetherApplicationExist(data: any){
    return this.http.post(this.apiUrl + 'checkWhetherApplicationExist', data, {headers: this.getHeader()});
  }
}
