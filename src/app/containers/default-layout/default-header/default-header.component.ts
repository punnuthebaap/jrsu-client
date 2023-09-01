import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BasicService } from 'src/app/service/basic.service';
import { StateService } from 'src/app/service/state.service';
import { DepartmentService } from 'src/app/service/department.service';
import { Router, RouterModule } from '@angular/router';

import { ClassToggleService, HeaderComponent } from '@coreui/angular';

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
})
export class DefaultHeaderComponent extends HeaderComponent {

  @Input() sidebarId: string = "sidebar";

  public newMessages = new Array(4)
  public newTasks = new Array(5)
  public newNotifications = new Array(5)
  departmentName: string = "";
  roleName: string = "";
  constructor(private classToggler: ClassToggleService, 
              public route: Router,
              // private basic: BasicService,
              private state: StateService,
              private departmentService: DepartmentService) {
    super();
  }

  ngOnInit() {
    if(this.state.isLoggedIn()){
      const user = this.state.getState();
      const role = user.details.role;
      const department = user.details.department;
      this.getDeptName(department);
      this.getRoleName(role);
      console.log(this.departmentName)
    }
  }

  logout(){
    this.state.removeState();
    this.route.navigate(['/login']);
  }

  getDeptName(id: any) {
    this.departmentService.getDeptName({"id" : id}).subscribe((res :any) => {
      this.departmentName = res.data[0].departmentName;
    });
  }

  getRoleName(id: any) {
    this.departmentService.getRoleName({"id" : id}).subscribe((res :any) => {
      this.roleName = res.data[0].roleName;
    });
  }

}
