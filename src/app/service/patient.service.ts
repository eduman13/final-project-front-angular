import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Patient } from '../model/patient';
import { Medication } from '../model/medication';

@Injectable()
export class PatientService {

    private urlBasic = 'http://localhost:8082/patient/';

    constructor(
        private http: HttpClient,
    ) { }

    getPatientBySSN(ssn: string): Observable<Patient> {
        let url = `${this.urlBasic}find_by_ssn`;
        let params = new HttpParams().set('ssn', ssn);
        return this.http.get(url, { params: params })
            .pipe(map(this.extractData));
    }

    getPatientsByDoctor(id: number): Observable<Patient[]> {
        let url = `${this.urlBasic}find_all_by_doctor/${id}`;
        return this.http.get(url)
            .pipe(map(this.extractData));
    }

    getPatientById(id: number): Observable<Patient> {
        let url = `${this.urlBasic}find_by_id/${id}`;
        return this.http.get(url)
            .pipe(map(this.extractData));
    }

    getMedicationByPatient(id: number): Observable<Medication> {
        let url = `http://localhost:8082/medication/find_by_patient/${id}`;
        return this.http.get(url)
            .pipe(map(this.extractData));
    }

    getAll(): Observable<Patient[]> {
        let url =`http://localhost:8082/patient/find_all`;
        return this.http.get(url)
            .pipe(map(this.extractData))
    }

    deletePatient(id: number): void {
        let url = `http://localhost:8082/patient/delete/${id}`;
        this.http.delete(url).subscribe();
    }

    createPatient(patient: Patient): void {
        let url = `http://localhost:8082/patient/create`;
        const header: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
        this.http.post(url, patient, {headers: header}).subscribe();
    }

    private extractData(response: Response) {
        let body: any = response.json ? response.json() : response;
        return body.data ? body.data : (body || {});
      }
}