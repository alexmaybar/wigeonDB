import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-result-item',
  templateUrl: './result-item.component.html',
  styleUrls: ['./result-item.component.scss'],
})
export class ResultItemComponent implements OnInit {
  @Input()
  resultObject = null;

  @Input()
  selected: boolean = false;

  @Input()
  type: string = '';

  constructor() {}

  ngOnInit(): void {}
}
