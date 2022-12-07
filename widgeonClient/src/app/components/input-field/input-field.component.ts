import {
  Component,
  DoCheck,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.scss'],
})
export class InputFieldComponent implements OnInit {
  @Input()
  label: string = '';

  @Input()
  data: any = '';
  @Output() dataChange = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  change() {
    this.dataChange.next(this.data);
  }
}
