import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DelopcComponent } from './delopc.component';

describe('DelopcComponent', () => {
  let component: DelopcComponent;
  let fixture: ComponentFixture<DelopcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DelopcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DelopcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
