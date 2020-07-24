import { Component, OnInit } from '@angular/core';
import { AuthUtils } from './utils/auth-utils';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'final-project';

  constructor(private router: Router){

  }
  ngOnInit(): void {
    if (!AuthUtils.isLogged()){
      this.router.navigate(['login']);
    }
  }
}
