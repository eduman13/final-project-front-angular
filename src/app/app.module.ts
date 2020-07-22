import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MaterialModule } from './material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PatientInformationComponent } from './patient-information/patient-information.component';

import { PatientService } from './service/patient.service';
import { PatientComponent } from './patient/patient.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { MedicalHistoryComponent } from './medical-history/medical-history.component';
import { SafePipe } from './pipes/safe.pipe';
import { DialogMedicationDialog } from './patient-information/patient-information.component';
import { DoctorService } from './service/doctor.service';
import { MedicalInformationComponent, DialogMedicalDialog } from './medical-information/medical-information.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PatientComponent,
    PatientInformationComponent,
    LoginComponent,
    MainComponent,
    MedicalHistoryComponent,
    SafePipe,
    DialogMedicationDialog,
    MedicalInformationComponent,
    DialogMedicalDialog
  ],
  entryComponents: [DialogMedicationDialog, DialogMedicalDialog],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [PatientService, DoctorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
