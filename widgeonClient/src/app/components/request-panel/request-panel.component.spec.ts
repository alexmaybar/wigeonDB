import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestPanelComponent } from './request-panel.component';

describe('RequestPanelComponent', () => {
  let component: RequestPanelComponent;
  let fixture: ComponentFixture<RequestPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestPanelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
