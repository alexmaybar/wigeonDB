import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletePageComponent } from './delete-page.component';

describe('DeletePageComponent', () => {
  let component: DeletePageComponent;
  let fixture: ComponentFixture<DeletePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeletePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeletePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
