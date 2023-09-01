import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule, CardModule, FormModule, GridModule } from '@coreui/angular';

import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { CreateExamRoutingModule } from './create-exam-routing.module';
import { CreateExamComponent } from './create-exam.component';


@NgModule({
  declarations: [CreateExamComponent],
  imports: [
    CommonModule,
    CreateExamRoutingModule,
    GridModule,
    ButtonModule,
    CardModule,
    FormModule,
    ReactiveFormsModule
  ]
})
export class CreateExamModule { }
