import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddsisComponent } from './addsis.component';

describe('AddsisComponent', () => {
  let component: AddsisComponent;
  let fixture: ComponentFixture<AddsisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddsisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddsisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
