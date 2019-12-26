import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditopcComponent } from './editopc.component';

describe('EditopcComponent', () => {
  let component: EditopcComponent;
  let fixture: ComponentFixture<EditopcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditopcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditopcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
