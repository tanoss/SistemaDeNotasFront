import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuPerfilComponent } from './usu-perfil.component';

describe('UsuPerfilComponent', () => {
  let component: UsuPerfilComponent;
  let fixture: ComponentFixture<UsuPerfilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsuPerfilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuPerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
