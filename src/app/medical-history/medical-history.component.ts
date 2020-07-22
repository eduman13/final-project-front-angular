import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-medical-history',
  templateUrl: './medical-history.component.html',
  styleUrls: ['./medical-history.component.css']
})
export class MedicalHistoryComponent implements OnInit {

  private sub: Subscription;
  patientId: number;
  urlBasic = 'http://localhost:8082/medical_history/pdf/';
  urlPdf: string;

  constructor(
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(
      params => {
        this.patientId = params['patientId'];
        this.urlPdf = `${this.urlBasic}${this.patientId}`;
        console.log(this.urlPdf);
      }
    );
  }

}
