import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditsisComponent } from './editsis.component';

describe('EditsisComponent', () => {
  let component: EditsisComponent;
  let fixture: ComponentFixture<EditsisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditsisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditsisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
