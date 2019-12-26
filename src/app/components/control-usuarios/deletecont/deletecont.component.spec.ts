import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletecontComponent } from './deletecont.component';

describe('DeletecontComponent', () => {
  let component: DeletecontComponent;
  let fixture: ComponentFixture<DeletecontComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeletecontComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletecontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
