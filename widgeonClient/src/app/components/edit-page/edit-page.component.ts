import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/clients.service';

@Component({
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss'],
})
export class EditPageComponent implements OnInit {
  constructor(private cs: ClientService) {}

  data: any = null;

  ngOnInit(): void {}

  getSections() {
    this.cs.runQuery('select * from Section').subscribe((res) => {
      console.log(res);
      this.data = res;
    });
  }
}
