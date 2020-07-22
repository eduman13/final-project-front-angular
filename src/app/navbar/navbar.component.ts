import { DoctorService } from './../service/doctor.service';
import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { MediaMatcher } from '@angular/cdk/layout';
import { AuthUtils } from '../utils/auth-utils';

import { User } from '../model/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {

  user: User;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private router: Router,
    private doctorService: DoctorService
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    // tslint:disable-next-line: deprecation
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  mobileQuery: MediaQueryList;

  fillerNav = [
    {
      name: 'Patient',
      route: 'patient',
      icon: 'home'
    }
  ];

  private _mobileQueryListener: () => void;

  shouldRun = true;

  ngOnInit(): void {
    this.doctorService.getIdDoctorByUser().subscribe(user => {
      this.user = user;
    });
  }

  ngOnDestroy(): void {
    // tslint:disable-next-line: deprecation
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  logout(): void {
    AuthUtils.logout(this.router);
  }
}
