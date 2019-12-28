import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmCursosComponent } from './adm-cursos.component';

describe('AdmCursosComponent', () => {
  let component: AdmCursosComponent;
  let fixture: ComponentFixture<AdmCursosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmCursosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmCursosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
