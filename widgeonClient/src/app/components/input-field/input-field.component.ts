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
  values: string[] = ['None'];

  @Input()
  displayValues: any = null;

  @Input()
  type = 'text';

  @Input()
  label: string = '';

  @Input()
  min: any = null;

  @Input()
  data: any = '';
  @Output() dataChange = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  change() {
    if (this.type === 'number') {
      this.dataChange.next(String(this.data));
    } else {
      this.dataChange.next(this.data);
    }
  }
}
