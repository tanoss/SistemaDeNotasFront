import { Component, OnInit } from '@angular/core';
import { RestService } from '../../service/rest.service';
import { ConstantPool } from '@angular/compiler';


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

  grado: any = {
    paralelo: '',
  };

  constructor(private servicio: RestService) { }

  ngOnInit() {
  }
  

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;

  foods: Food[] = [
    { value: 'steak-0', viewValue: 'Steak' },
    { value: 'pizza-1', viewValue: 'Pizza' },
    { value: 'tacos-2', viewValue: 'Tacos' }
  ];

  


  creargrado() {
    this.servicio.addData(this.grado, 'gradoadd').subscribe(
      data => {
        console.log(data);
      }
    )

  }
 mensaje: any;

  crearparalelo() {
     this.servicio.addData(this.paralelo, 'paraleloadd').subscribe(
       data => {
        this.mensaje = data
        console.log(this.mensaje)
       }
     )
    
  }

  creargradop() {


  }

}
