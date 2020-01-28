import { Component, OnInit, ɵConsole } from '@angular/core';
import { RestService } from '../../service/rest.service';
import { ConstantPool } from '@angular/compiler';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';


export interface PeriodicElement {
  name: string;
  position: number;
  weight: string;
  symbol: string;
}



export interface Food {
  value: string;
  viewValue: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Primero', weight: 'A', symbol: 'Ken Lopez' },
  { position: 2, name: 'Primero', weight: 'B', symbol: 'Luis Gualavisi' },
  { position: 3, name: 'Primero', weight: 'C', symbol: 'Carlos Luna' },
  { position: 3, name: 'Segundo', weight: 'A', symbol: 'Maria Luna' },
  { position: 5, name: 'Segundo', weight: 'B', symbol: 'Alvaro Ruiz' },
];

@Component({
  selector: 'app-adm-cursos',
  templateUrl: './adm-cursos.component.html',
  styleUrls: ['./adm-cursos.component.scss']
})


export class AdmCursosComponent implements OnInit {

  paralelo: any = {
    paralelo: '',

  };

  paralelos1: any;

  grado: any = {
    grado: '',
    nombreGrado: ''
  };

  grados: any;
  gp: any = {
    idGrado: '',
    idParalelo: ''
  };

  constructor(private servicio: RestService) { }

  ngOnInit() {
    this.listargrados();
    this.listarparalelos();
  }


  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;

  foods: Food[] = [
    { value: 'steak-0', viewValue: 'Steak' },
    { value: 'pizza-1', viewValue: 'Pizza' },
    { value: 'tacos-2', viewValue: 'Tacos' }
  ];


  
  listargrados() {
    this.servicio.getData('grado').subscribe(
      data => {
        console.log(data);
        this.grados = data;
      }
    )
  }

  listarparalelos() {
    this.servicio.getData('paralelo').subscribe(
      data => {
        this.paralelos1 = data;
      }
    )
  }

  creargrado() {
    console.log(this.grado);
    this.servicio.addData(this.grado, 'gradoadd').subscribe(
      data => {
        this.mensaje = data
        console.log(data);
      }
    )
      this.listargrados();
  }
  mensaje: any;

  crearparalelo() {
    this.servicio.addData(this.paralelo, 'paraleloadd').subscribe(
      data => {
        this.mensaje = data
        console.log(this.mensaje)
        console.log(this.paralelo)
      }
    )
    this.listarparalelos();
  }

  creargradop(grado: number, paralelo: number) {
    console.log(grado, paralelo );
    this.gp = {
       gradoId: grado,
      paraleloId: paralelo
    }
    this.creargradopa();
  }
  response: any;
  creargradopa() {
    
    this.servicio.addData(this.gp, 'gradopadd').subscribe(
      data => {
        this.response = data;
        console.log(this.response);
      }
    )
  }

}
