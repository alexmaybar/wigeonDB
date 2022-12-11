import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  Output,
  ViewChild,
  ElementRef,
} from '@angular/core';

@Component({
  selector: 'app-results-panel',
  templateUrl: './results-panel.component.html',
  styleUrls: ['./results-panel.component.scss'],
})
export class ResultsPanelComponent implements OnInit {
  @Input()
  columns: any = null;

  @Input()
  resultsObject: any = null;

  @Input()
  deleteBtn: any = false;

  @Input()
  editBtn: any = false;

  @Input()
  height: any = 'none';

  @Output() selectedEvent = new EventEmitter<string>();
  @Output() sortEvent = new EventEmitter<string>();
  @Output() deleteEvent = new EventEmitter<number>();
  @Output() editEvent = new EventEmitter<number>();

  isSelected = -1;
  sortProp = null;

  constructor() {}

  ngOnInit(): void {}

  select(i: any) {
    this.isSelected = i;
    this.selectedEvent.emit(i);
  }

  sort(i: any) {
    this.sortProp = i;
    this.sortEvent.emit(i);
  }

  editRecord(i: any) {
    this.editEvent.emit(i);
  }

  deleteRecord(i: any) {
    this.deleteEvent.emit(i);
  }
}
