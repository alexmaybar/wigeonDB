import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.goToAdd();
  }

  current = 'home';

  goToAdd() {
    this.router.navigate(['/', 'home']);
    this.current = 'home';
  }
  goToReports() {
    this.router.navigate(['/', 'reports']);
    this.current = 'reports';
  }
  goToTimeWarp() {
    this.router.navigate(['/', 'time-warp']);
    this.current = 'time-warp';
  }
}
