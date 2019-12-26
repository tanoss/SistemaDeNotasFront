import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DelsisComponent } from './delsis.component';

describe('DelsisComponent', () => {
  let component: DelsisComponent;
  let fixture: ComponentFixture<DelsisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DelsisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DelsisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
