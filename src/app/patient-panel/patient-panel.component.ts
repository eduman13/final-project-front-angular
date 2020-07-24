import { DoctorService } from './../service/doctor.service';
import { PatientService } from './../service/patient.service';
import { Component, OnInit } from '@angular/core';
import { Patient } from '../model/patient';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Doctor } from '../model/doctor';

@Component({
  selector: 'app-patient-panel',
  templateUrl: './patient-panel.component.html',
  styleUrls: ['./patient-panel.component.css']
})
export class PatientPanelComponent implements OnInit {

  private sub: Subscription;
  pageTitle = 'Patient Panel';
  imageWidth = 30;
  imageMargin = 2;
  dataSource: any = null;
  patients: Patient[];
  id: number;
  displayedColumns = ['photo', 'name', 'socialSecurityNumber', 'birthday'];
  listFilter: any = {};
  searchFilter: any = {
    name: '',
    surnames: '',
    socialSecurityNumber: '',
    birthday: ''
};

  constructor(
    private patientService: PatientService,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) { }

  reset(): void {
    this.patientService.getAll().subscribe(patients => this.freshDataList(patients));
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  freshDataList(patients: Patient[]) {
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
    this.patientService.getAll().subscribe(patients => this.freshDataList(patients));
  }

  getPatients(): void {
    this.patientService.getAll();
  }

  openDialog(): void {
    const config = new MatDialogConfig();
    config.disableClose = true;
    config.autoFocus = true;

    const dialogRef = this.dialog.open(DialogCreatePatient, config);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}

@Component({
  selector: 'dialog-create-patient',
  templateUrl: 'dialog-create-patient.html',
  styleUrls: ['./dialog-create-patient.css']
})
export class DialogCreatePatient implements OnInit {

  patientForm: FormGroup;
  doctors: Doctor[];
  female = ['../../assets/avatar/avatar2.png', '../../assets/avatar/avatar3.png'];
  male = ['../../assets/avatar/avatar1.png', '../../assets/avatar/avatar4.png', '../../assets/avatar/avatar5.png'];

  constructor(
    private fb: FormBuilder,
    private patientService: PatientService,
    private doctorService: DoctorService,
   ) {}

  ngOnInit(): void {
    this.patientForm = this.fb.group({
      name: ['', Validators.required],
      surnames: ['', Validators.required],
      socialSecurityNumber: ['', Validators.required],
      birthday: ['', Validators.required],
      street: ['', Validators.required],
      portal: ['', Validators.required],
      number: ['', Validators.required],
      gender: ['', Validators.required],
      doctorId: ['', Validators.required]
    });
    this.doctorService.getAll().subscribe(doctors => this.doctors = doctors);
  }

  createPatient(): void {
    let photo: string;
    if (this.patientForm.value.gender === 'female') {
      photo = this.female[Math.floor(Math.random() * this.female.length)];
    } else {
      photo = this.male[Math.floor(Math.random() * this.male.length)];
    }
    console.log(this.patientForm.value.doctorId);
    const patient = new Patient(photo, this.patientForm.value.name, this.patientForm.value.surnames,
      this.patientForm.value.socialSecurityNumber, this.patientForm.value.birthday, this.patientForm.value.street,
      this.patientForm.value.portal, this.patientForm.value.number, this.patientForm.value.doctorId);
    this.patientService.createPatient(patient);
  }

}


