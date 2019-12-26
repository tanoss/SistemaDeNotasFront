import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditcontComponent } from './editcont.component';

describe('EditcontComponent', () => {
  let component: EditcontComponent;
  let fixture: ComponentFixture<EditcontComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditcontComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditcontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
