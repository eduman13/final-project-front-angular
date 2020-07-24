import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NavbarComponent } from './navbar/navbar.component';
import { PatientInformationComponent } from './patient-information/patient-information.component';
import { PatientComponent } from './patient/patient.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { MedicalHistoryComponent } from './medical-history/medical-history.component';
import { MedicalInformationComponent } from './medical-information/medical-information.component';
import { DoctorAdminComponent } from './doctor-admin/doctor-admin.component';
import { CreateDoctorComponent } from './create-doctor/create-doctor.component';
import { PatientPanelComponent } from './patient-panel/patient-panel.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    component: NavbarComponent,
    children: [
      {
        path: '',
        component: MainComponent
      },
      {
        path: 'main/:id',
        component: MainComponent
      },
      {
        path: 'patient/:id',
        component: PatientComponent
      },
      {
        path: 'patient-information/:doctorId/:patientId',
        component: PatientInformationComponent
      },
      {
        path: 'medical-history/:patientId',
        component: MedicalHistoryComponent
      },
      {
        path: 'medical-information/:doctorId',
        component: MedicalInformationComponent
      },
      {
        path: 'doctor-admin',
        component: DoctorAdminComponent
      },
      {
        path: 'create-doctor',
        component: CreateDoctorComponent
      },
      {
        path: 'patient-admin/:id',
        component: PatientPanelComponent
      },
      {
        path: '**',
        component: MainComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

