import { Component, OnInit } from '@angular/core';

import { Patient } from '../model/patient';
import { PatientService } from '../service/patient.service';

import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { AuthUtils } from '../utils/auth-utils';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {

  private sub: Subscription;
  pageTitle = 'Patients';
  imageWidth = 30;
  imageMargin = 2;
  tileMedicalHistory = 'MEDICAL_HISTORY';
  patients: Patient[];
  id: number;
  dataSource: any = null;
  displayedColumns = ['photo', /* 'id', */ 'name', 'social security number', 'birthday'];
  listFilter: any = {};
  searchFilter: any = {
    id: '',
    name: '',
    socialSecurityNumber: '',
    birthday: ''
  };

  constructor(
    private patientService: PatientService,
    private route: ActivatedRoute
  ) { }

  applyFilter(filterValue: string): void {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  freshDataList(patients: Patient[]): void {
    patients.map(patient => {
      patient.completeName = `${patient.name} ${patient.surnames}`;
    });
    this.patients = patients;
    this.dataSource = new MatTableDataSource(this.patients);
  }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(
      params => {
        this.id = params['id'];
      }
    );
    this.patientService.getPatientsByDoctor(this.id).subscribe(patients => this.freshDataList(patients));
    this.searchFilter = {};
    this.listFilter = {};
  }

}
