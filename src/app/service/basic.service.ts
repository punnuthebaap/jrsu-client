import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BasicService {
  apiUrl = 'http://localhost:3000/';
  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': '*/*'
    }),
  };
  constructor(private http: HttpClient) { }

  getAllRoles() {
    return this.http.get(this.apiUrl+'allRoles');
  }

  getAllDepartments() {
    return this.http.get(this.apiUrl+'allDepartments');
  }

  getAllCourses() {
    return this.http.get(this.apiUrl+'getAllcourse');
  }

  getAllSemesterForCourse(course: any) {
    return this.http.post(this.apiUrl+'getAllSemesterForCourse',course);
  }

  saveUser(user: any) {
    return this.http.post(this.apiUrl+'register',user);
  }

  login(user: any) {
    return this.http.post(this.apiUrl+'login',user);
  }
}
