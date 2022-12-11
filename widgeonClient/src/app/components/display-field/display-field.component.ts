import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-display-field',
  templateUrl: './display-field.component.html',
  styleUrls: ['./display-field.component.scss'],
})
export class DisplayFieldComponent implements OnInit {
  @Input()
  value: any = null;

  @Input()
  label: any = null;

  constructor() {}

  ngOnInit(): void {}
}
