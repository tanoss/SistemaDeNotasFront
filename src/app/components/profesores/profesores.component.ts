import { Component, OnInit } from '@angular/core';
import { RestService } from 'app/service/rest.service';
import { ConstantPool } from '@angular/compiler';

@Component({
  selector: 'app-profesores',
  templateUrl: './profesores.component.html',
  styleUrls: ['./profesores.component.scss']
})
export class ProfesoresComponent implements OnInit {

  constructor(private apiService: RestService, ) {
  }

  ngOnInit() {
  }
  // tslint:disable-next-line: member-ordering
  usuario: any = {
    idTipoUsuario: '2',
    cedula: ' ',
    nombre: ' ',
    apellido: ' ',
    correo: '',
    direccion: '',
    telefonoConvencional: '',
    telefonoCelular: '',
    referenciaPersNombre: '',
    referenciaPersTelf: ''
  };
  // tslint:disable-next-line: member-ordering
  profesor: any[] = [];

  agregarprof() {
    console.log(this.usuario);
    this.apiService.addData( this.usuario, 'addprofe').subscribe(
      data => {
        console.log("se agrefgo")
      }, error => {
        console.log(error)
      }
    )
  }

}
