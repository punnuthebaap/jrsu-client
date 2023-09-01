import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule, CardModule, FormModule, GridModule } from '@coreui/angular';

import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { ApplicationRoutingModule } from './application-routing.module';
import { ApplicationComponent } from './application.component';


@NgModule({
  declarations: [ApplicationComponent],
  imports: [
    CommonModule,
    ApplicationRoutingModule,
    GridModule,
    ButtonModule,
    CardModule,
    FormModule,
    ReactiveFormsModule
  ]
})
export class ApplicationModule { }
