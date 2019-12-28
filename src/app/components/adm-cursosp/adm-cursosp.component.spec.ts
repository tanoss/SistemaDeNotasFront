import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmCursospComponent } from './adm-cursosp.component';

describe('AdmCursospComponent', () => {
  let component: AdmCursospComponent;
  let fixture: ComponentFixture<AdmCursospComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmCursospComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmCursospComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
