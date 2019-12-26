import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddperfComponent } from './addperf.component';

describe('AddperfComponent', () => {
  let component: AddperfComponent;
  let fixture: ComponentFixture<AddperfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddperfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddperfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
