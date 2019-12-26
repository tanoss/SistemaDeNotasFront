import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DelperfComponent } from './delperf.component';

describe('DelperfComponent', () => {
  let component: DelperfComponent;
  let fixture: ComponentFixture<DelperfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DelperfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DelperfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
