import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmMateriaspComponent } from './adm-materiasp.component';

describe('AdmMateriaspComponent', () => {
  let component: AdmMateriaspComponent;
  let fixture: ComponentFixture<AdmMateriaspComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmMateriaspComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmMateriaspComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
