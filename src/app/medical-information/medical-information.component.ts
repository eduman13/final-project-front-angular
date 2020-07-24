import { Component, OnInit, Inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

import { DoctorService } from '../service/doctor.service';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { Doctor } from './../model/doctor';
import { Address } from './../model/address';

@Component({
  selector: 'app-medical-information',
  templateUrl: './medical-information.component.html',
  styleUrls: ['./medical-information.component.css']
})
export class MedicalInformationComponent implements OnInit {

  pageTitle = 'Doctor Information';
  private sub: Subscription;
  doctorForm: FormGroup;
  doctor: Doctor;
  doctorId: number;
  fieldColspan = 3;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private doctorService: DoctorService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(
      params => {
        this.doctorId = params['doctorId'];
        this.getDoctor(this.doctorId);
      }
    );
    this.doctorForm = this.fb.group({
      id: '',
      name: '',
      surnames: '',
      schoolNumber: '',
      birthday: '',
      street: '',
      portal: '',
      number: ''
    });
  }

  reset(): void {
    this.getDoctor(this.doctorId);
  }

  getDoctor(id: number): void {
    this.doctorService.getDoctorById(id).subscribe(doctor => this.onAccountRetrieved(doctor));
  }

  onAccountRetrieved(doctor: Doctor): void {
    this.doctor = doctor;
    this.doctorForm.get('id').setValue(this.doctor.id);
    this.doctorForm.get('name').setValue(this.doctor.name);
    this.doctorForm.get('surnames').setValue(this.doctor.surnames);
    this.doctorForm.get('schoolNumber').setValue(this.doctor.schoolNumber);
    this.doctorForm.get('birthday').setValue(this.doctor.birthday);
    this.doctorForm.get('street').setValue(this.doctor.street);
    this.doctorForm.get('portal').setValue(this.doctor.portal);
    this.doctorForm.get('number').setValue(this.doctor.number);
  }

  openDialog(): void {
    const config = new MatDialogConfig();
    config.disableClose = true;
    config.autoFocus = true;

    config.data = {
      doctorId: this.doctorId
    };

    const dialogRef = this.dialog.open(DialogMedicalDialog, config);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  get id() {
    return this.doctorForm.get('id');
  }

  get name() {
    return this.doctorForm.get('name');
  }

  get surnames() {
    return this.doctorForm.get('surname');
  }

  get schoolNumber() {
    return this.doctorForm.get('schoolNumber');
  }

  get birthday() {
    return this.doctorForm.get('birthday');
  }

  get street() {
    return this.doctorForm.get('street');
  }

  get portal() {
    return this.doctorForm.get('portal');
  }

  get number() {
    return this.doctorForm.get('number');
  }

}

@Component({
  selector: 'dialog-medical',
  templateUrl: 'dialog-medical.html',
  styleUrls: ['./dialog-medical.css']
})
export class DialogMedicalDialog implements OnInit {

  addressForm: FormGroup;
  doctorId: number;
  fieldColspan = 3;
  address: Address;

  constructor(
    private fb: FormBuilder,
    private doctorService: DoctorService,
    private route: ActivatedRoute,
    private dialogRef: MatDialogRef<DialogMedicalDialog>,
    @Inject(MAT_DIALOG_DATA) data) {
      this.doctorId = data.doctorId;
     }

  ngOnInit(): void {
    this.addressForm = this.fb.group({
      street: '',
      portal: '',
      number: ''
    });
  }

  updateAddress(): void {
    this.address = new Address(this.addressForm.value.street, this.addressForm.value.portal, this.addressForm.value.number);
    this.doctorService.updateAddress(this.doctorId, this.address);
  }

  get street() {
    return this.addressForm.get('street');
  }

  get portal() {
    return this.addressForm.get('portal');
  }

  get number() {
    return this.addressForm.get('number');
  }
}
