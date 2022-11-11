import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-results-panel',
  templateUrl: './results-panel.component.html',
  styleUrls: ['./results-panel.component.scss'],
})
export class ResultsPanelComponent implements OnInit {
  @Input()
  resultsObject: any = null;

  constructor() {}

  ngOnInit(): void {}
}
