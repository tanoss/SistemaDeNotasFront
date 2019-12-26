import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpcionperfilComponent } from './opcionperfil.component';

describe('OpcionperfilComponent', () => {
  let component: OpcionperfilComponent;
  let fixture: ComponentFixture<OpcionperfilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpcionperfilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpcionperfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
