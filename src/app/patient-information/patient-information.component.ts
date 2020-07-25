import { PatientService } from './../service/patient.service';
import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';

import { Patient } from '../model/patient';
import { AuthUtils } from '../utils/auth-utils';

@Component({
  selector: 'app-patient-information',
  templateUrl: './patient-information.component.html',
  styleUrls: ['./patient-information.component.css']
})
export class PatientInformationComponent implements OnInit {

  private sub: Subscription;
  pageTitle = 'Search Patient';
  fieldColspan = 3;
  patient: Patient;
  patientForm: FormGroup;
  doctorId: number;
  patientId: number;
  imageWidth = 100;
  imageMargin = 2;
  isAdmin: boolean;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private patientService: PatientService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe( params => {
      this.doctorId = params['doctorId'];
      this.patientId = params['patientId'];
      this.getPatientById(this.patientId);
    });
    this.patientForm = this.fb.group({
      id: '',
      name: '',
      surnames: '',
      socialSecurityNumber: '',
      birthday: '',
      street: '',
      portal: '',
      number: ''
    });
    this.isAdmin = AuthUtils.getRoles().includes('ADMIN');
  }

  searchPatient() {
    console.log(this.patientForm.value);
  }

  getPatientById(patientId: number): void {
    this.patientService.getPatientById(patientId).subscribe(patient => this.onAccountRetrieved(patient));
  }

  deletePatient(): void {
    this.patientService.deletePatient(this.patientId);
  }

  onAccountRetrieved(patient: Patient): void {
    this.patient = patient;
    this.patientForm.get('id').setValue(this.patient.id);
    this.patientForm.get('name').setValue(this.patient.name);
    this.patientForm.get('surnames').setValue(this.patient.surnames);
    this.patientForm.get('socialSecurityNumber').setValue(this.patient.socialSecurityNumber);
    this.patientForm.get('birthday').setValue(this.patient.birthday);
    this.patientForm.get('street').setValue(this.patient.street);
    this.patientForm.get('portal').setValue(this.patient.portal);
    this.patientForm.get('number').setValue(this.patient.number);
  }

  goToLink(): void {
    const url = 'http://localhost:8082/medical_history/pdf/' + this.patientId;
    window.open(url, '_blank');
  }

  openDialog(): void {
    const config = new MatDialogConfig();
    config.disableClose = true;
    config.autoFocus = true;

    config.data = {
      patientId: this.patientId
    };

    const dialogRef = this.dialog.open(DialogMedicationDialog, config);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  get id() {
    return this.patientForm.get('id');
  }

  get name() {
    return this.patientForm.get('name');
  }

  get surnames() {
    return this.patientForm.get('surname');
  }

  get socialSecurityNumber() {
    return this.patientForm.get('socialSecurityNumber');
  }

  get birthday() {
    return this.patientForm.get('birthday');
  }

  get street() {
    return this.patientForm.get('street');
  }

  get portal() {
    return this.patientForm.get('portal');
  }

  get number() {
    return this.patientForm.get('number');
  }
}

@Component({
  selector: 'dialog-medication',
  templateUrl: 'dialog-medication.html',
})
export class DialogMedicationDialog implements OnInit {

  info: string;
  patientId: number;

  constructor(
    private patientService: PatientService,
    private route: ActivatedRoute,
    private dialogRef: MatDialogRef<DialogMedicationDialog>,
    @Inject(MAT_DIALOG_DATA) data) {
      this.patientId = data.patientId;
     }

  ngOnInit(): void {
    this.patientService.getMedicationByPatient(this.patientId).subscribe(medication => {
      this.info = medication.info;
    });
  }
}
