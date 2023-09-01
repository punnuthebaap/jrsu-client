import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule, CardModule, FormModule, GridModule, TableModule, SpinnerModule } from '@coreui/angular';

import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { ExamFormsRoutingModule } from './exam-forms-routing.module';
import { ExamFormsComponent } from './exam-forms.component';



@NgModule({
  declarations: [ExamFormsComponent],
  imports: [
    CommonModule,
    ExamFormsRoutingModule,
    GridModule,
    ButtonModule,
    CardModule,
    FormModule,
    ReactiveFormsModule,
    TableModule,
    SpinnerModule
  ]
})
export class ExamFormsModule { }
