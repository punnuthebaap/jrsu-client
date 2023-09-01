import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExamDashboardComponent } from './exam-dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: ExamDashboardComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExamDashboardRoutingModule { }
