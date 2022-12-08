import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/clients.service';

@Component({
  templateUrl: './time-warp-page.component.html',
  styleUrls: ['./time-warp-page.component.scss'],
})
export class TimeWarpPageComponent implements OnInit {
  constructor(private cs: ClientService) {}

  ngOnInit(): void {}

  runBronzeAge() {
    this.cs.bronzeAge().subscribe((res) => {
      console.log(res);
    });
  }

  runPhase1() {
    this.cs.phase1().subscribe((res) => {
      console.log(res);
    });
  }
  runPhase2() {
    this.cs.phase2().subscribe((res) => {
      console.log(res);
    });
  }
  runPhase3() {
    this.cs.phase3().subscribe((res) => {
      console.log(res);
    });
  }
  runStoneAge() {
    this.cs.stoneAge().subscribe((res) => {
      console.log(res);
    });
  }
}
