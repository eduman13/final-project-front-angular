import { AuthUtils } from './../utils/auth-utils';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  private sub: Subscription;
  id: number;
  isAdmin: boolean;

  constructor(
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(
      params => {
        this.id = params['id'];
      }
    );
    this.isAdmin = AuthUtils.getRoles().includes('ADMIN');
  }

}
