import { DoctorService } from './../service/doctor.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Doctor } from '../model/doctor';

@Component({
  selector: 'app-create-doctor',
  templateUrl: './create-doctor.component.html',
  styleUrls: ['./create-doctor.component.css']
})
export class CreateDoctorComponent implements OnInit {

  pageTitle = 'Create Doctor';
  doctorForm: FormGroup;
  fieldColspan = 3;
  birthdayValid = false;
  schoolNumberValid = false;

  constructor(
    private fb: FormBuilder,
    private doctorService: DoctorService
  ) {

  }
  ngOnInit(): void {
    this.doctorForm = this.fb.group({
      name: ['', Validators.required],
      surnames: ['', Validators.required],
      schoolNumber: ['', Validators.required, Validators.pattern('\d{12}[A-Z]')],
      birthday: ['', [Validators.required, Validators.pattern('\d{4}-\d{2}-\d{2}')]],
      street: ['', Validators.required],
      portal: ['', [Validators.required], Validators.pattern('\d')],
      number: ['', [Validators.required, Validators.pattern('\d')]]
    });
  }

  createDoctor(): void {
    const doctor = new Doctor(this.doctorForm.value.name, this.doctorForm.value.surnames, this.doctorForm.value.schoolNumber,
      this.doctorForm.value.birthday, this.doctorForm.value.street, this.doctorForm.value.portal, this.doctorForm.value.number);
    this.doctorService.createDoctor(doctor);
  }

}
