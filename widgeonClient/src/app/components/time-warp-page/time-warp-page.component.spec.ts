import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeWarpPageComponent } from './time-warp-page.component';

describe('TimeWarpPageComponent', () => {
  let component: TimeWarpPageComponent;
  let fixture: ComponentFixture<TimeWarpPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimeWarpPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimeWarpPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
