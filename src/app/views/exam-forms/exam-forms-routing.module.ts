import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ExamFormsComponent } from './exam-forms.component';

const routes: Routes = [
  {
    path: '',
    component: ExamFormsComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExamFormsRoutingModule { }
