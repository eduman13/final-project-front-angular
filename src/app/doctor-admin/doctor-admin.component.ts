import { DoctorService } from './../service/doctor.service';
import { Component, OnInit } from '@angular/core';
import { Doctor } from '../model/doctor';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-doctor-admin',
  templateUrl: './doctor-admin.component.html',
  styleUrls: ['./doctor-admin.component.css']
})
export class DoctorAdminComponent implements OnInit {

  pageTitle = 'Doctor Panel';
  doctors: Doctor[];
  dataSource: any = null;
  listFilter: any = {};
  displayedColumns = ['name', 'schoolNumber', 'birthday'];
  searchFilter: any = {
    id: '',
    name: '',
    surnames: '',
    schoolNumber: '',
    birthday: ''
};

  constructor(
    private doctorService: DoctorService
  ) { }

  applyFilter(filterValue: string): void {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  freshDataList(doctors: Doctor[]): void {
    doctors.map(doctor => {
      doctor.completeName = `${doctor.name} ${doctor.surnames}`;
    });
    this.doctors = doctors;
    this.dataSource = new MatTableDataSource(this.doctors);
  }

  ngOnInit(): void {
    this.doctorService.getAll().subscribe(doctors => this.freshDataList(doctors));
    this.searchFilter = {};
    this.listFilter = {};
  }

  getAll(): void {
    this.doctorService.getAll().subscribe(doctors => this.freshDataList(doctors));
  }

  reset(): void {
    this.searchFilter = {};
    this.listFilter = {};
    this.getAll();
  }

}