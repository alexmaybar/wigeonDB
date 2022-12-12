import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-edit-row',
  templateUrl: './edit-row.component.html',
  styleUrls: ['./edit-row.component.scss'],
})
export class EditRowComponent implements OnInit {
  @Input()
  title: any = null;

  @Input()
  data: any = null;

  @Input()
  columns: any = null;

  @Input()
  buttonLabel: any = null;

  @Output() edit = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  editEvent() {
    this.edit.next(this.data);
  }
}
