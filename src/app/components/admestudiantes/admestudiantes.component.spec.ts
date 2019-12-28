import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmestudiantesComponent } from './admestudiantes.component';

describe('AdmestudiantesComponent', () => {
  let component: AdmestudiantesComponent;
  let fixture: ComponentFixture<AdmestudiantesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmestudiantesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmestudiantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
