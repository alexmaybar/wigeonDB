import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-display-row',
  templateUrl: './display-row.component.html',
  styleUrls: ['./display-row.component.scss'],
})
export class DisplayRowComponent implements OnInit {
  @Input()
  title: any = '';

  @Input()
  data: any = null;

  @Input()
  columns: any = null;

  constructor() {}

  ngOnInit(): void {}
}
