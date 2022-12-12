import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayRowComponent } from './display-row.component';

describe('DisplayRowComponent', () => {
  let component: DisplayRowComponent;
  let fixture: ComponentFixture<DisplayRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayRowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
