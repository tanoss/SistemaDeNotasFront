import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditperfComponent } from './editperf.component';

describe('EditperfComponent', () => {
  let component: EditperfComponent;
  let fixture: ComponentFixture<EditperfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditperfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditperfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
