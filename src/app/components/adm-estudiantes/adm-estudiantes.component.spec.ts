import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmEstudiantesComponent } from './adm-estudiantes.component';

describe('AdmEstudiantesComponent', () => {
  let component: AdmEstudiantesComponent;
  let fixture: ComponentFixture<AdmEstudiantesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmEstudiantesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmEstudiantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
