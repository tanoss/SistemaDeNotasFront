import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmEstudiantespComponent } from './adm-estudiantesp.component';

describe('AdmEstudiantespComponent', () => {
  let component: AdmEstudiantespComponent;
  let fixture: ComponentFixture<AdmEstudiantespComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmEstudiantespComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmEstudiantespComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
