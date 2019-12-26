import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/service/auth.service';
import { RestService } from 'app/service/rest.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
  user: any = {
    nombres: " ",
    apellidos: " ",
    cod_cc: " ",
    cod_id: " ",
    cod_pidm: " ",
    email: " ",
    perfil: ""
  };

  usuario: any = {
    cedula: ' ',
    nombre: ' ',
    apellido: ' ',
    correo: '',
    direccion: '',
    telefonoConvencional: '',
    telefonoCelular: '',
    referenciaPersNombre: '',
    referenciaPersTelf: '',

  };

  perfil: any[] = [{}];

  constructor(
    private apiUserToken: AuthService,
    private apiService: RestService
  ) { }

  ngOnInit() {
    this.dataUser();
  }

  dataUser() {
    this.user = this.apiUserToken.getUserToken();
    this.apiService.findRole(this.user.sub).subscribe(
      data => {
        this.usuario = data;
        //.perfil = data.perfil;
        console.log(this.user);
      },
      error => {
        console.log(error);
      }
    );
  }
}
