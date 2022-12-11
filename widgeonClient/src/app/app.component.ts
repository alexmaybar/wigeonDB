import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private router: Router) {}

  current = '';

  goToAdd() {
    this.router.navigate(['/', 'add']);
    this.current = 'add';
  }
  goToReports() {
    this.router.navigate(['/', 'reports']);
    this.current = 'reports';
  }
  goToRequest() {
    this.router.navigate(['/', 'request']);
    this.current = 'request';
  }
  goToTimeWarp() {
    this.router.navigate(['/', 'time-warp']);
    this.current = 'time-warp';
  }
}
