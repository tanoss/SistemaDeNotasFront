import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddopcComponent } from './addopc.component';

describe('AddopcComponent', () => {
  let component: AddopcComponent;
  let fixture: ComponentFixture<AddopcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddopcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddopcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
