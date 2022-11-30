import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/clients.service';

@Component({
  templateUrl: './request-panel.component.html',
  styleUrls: ['./request-panel.component.scss'],
})
export class RequestPanelComponent implements OnInit {
  queryStr = 'select * from teaches';
  data: any = null;

  constructor(private cs: ClientService) {}

  ngOnInit(): void {}

  runQuery() {
    console.log(this.queryStr);
    this.cs.runQuery(this.queryStr).subscribe((res) => {
      console.log(res);
      this.data = res;
    });
  }
}
