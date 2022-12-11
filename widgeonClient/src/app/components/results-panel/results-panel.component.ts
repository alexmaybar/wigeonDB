import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-results-panel',
  templateUrl: './results-panel.component.html',
  styleUrls: ['./results-panel.component.scss'],
})
export class ResultsPanelComponent implements OnInit {
  @Input()
  resultsObject: any = null;

  @Output() selectedEvent = new EventEmitter<string>();

  isSelected = -1;

  constructor() {}

  ngOnInit(): void {}

  select(i: any) {
    this.isSelected = i;
    this.selectedEvent.emit(i);
  }
}
