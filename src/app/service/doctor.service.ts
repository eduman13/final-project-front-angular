import { Doctor } from './../model/doctor';
import { AuthUtils } from './../utils/auth-utils';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { User } from '../model/user';
import { Address } from '../model/address';
import { Observable } from 'rxjs';

@Injectable()
export class DoctorService {

    constructor(
        private http: HttpClient,
    ) { }

    getIdDoctorByUser(): Observable<User> {
        const url = `http://localhost:8082/user/find_by_username`;
        let params = new HttpParams().set('username', AuthUtils.getUsername());
        return this.http.get(url, { params: params })
            .pipe(map(this.extractData));
    }

    getDoctorById(id: number): Observable<Doctor> {
        const url = `http://localhost:8082/doctor/find_by_id/${id}`;
        return this.http.get(url)
            .pipe(map(this.extractData));
    }

    updateAddress(id: number, address: Address): void {
        const url = `http://localhost:8082/doctor/update_address/${id}`;
        const header: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
        this.http.put(url, address, {headers: header}).subscribe();
    }

    getAll(): Observable<Doctor[]> {
        const url = 'http://localhost:8082/doctor/find_all';
        return this.http.get(url)
            .pipe(map(this.extractData));
    }

    createDoctor(doctor: Doctor): void {
        const url = `http://localhost:8082/user/doctor/create`;
        const header: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
        this.http.post(url, doctor, {headers: header}).subscribe();
    }

    private extractData(response: Response) {
        let body: any = response.json ? response.json() : response;
        return body.data ? body.data : (body || {});
      }
}