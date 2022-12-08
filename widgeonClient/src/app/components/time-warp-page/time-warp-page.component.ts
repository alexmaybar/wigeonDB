import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/clients.service';

@Component({
  templateUrl: './time-warp-page.component.html',
  styleUrls: ['./time-warp-page.component.scss'],
})
export class TimeWarpPageComponent implements OnInit {
  constructor(private cs: ClientService) {}

  ngOnInit(): void {}

  status = '';

  runBronzeAge() {
    this.status = 'waiting . . .';
    this.cs.bronzeAge().subscribe((res: any) => {
      this.status = res.response;
    });
  }

  runPhase1() {
    this.status = 'waiting . . .';
    this.cs.phase1().subscribe((res: any) => {
      this.status = res.response;
    });
  }
  runPhase2() {
    this.status = 'waiting . . .';

    this.cs.phase2().subscribe((res: any) => {
      this.status = res.response;
    });
  }
  runPhase3() {
    this.status = 'waiting . . .';

    this.cs.phase3().subscribe((res: any) => {
      this.status = res.response;
    });
  }
  runStoneAge() {
    this.status = 'waiting . . .';

    this.cs.stoneAge().subscribe((res: any) => {
      this.status = res.response;
    });
  }
}
