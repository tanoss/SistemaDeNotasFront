
import { Component, OnInit, AfterViewInit, ViewChild, ViewContainerRef } from '@angular/core';
import { RestService } from 'app/service/rest.service';
import { Persona} from 'app/interfaces/persona.interface';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { ToastsManager } from 'ng6-toastr';

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
  {position: 1, name: 'MATEMATICAS', weight: '9.86', symbol: '8.87'},
  {position: 2, name: 'SOCIALES', weight: '7.74', symbol: '8.01'},
  {position: 3, name: 'LENGUAJE', weight: '6.21', symbol: '7.2'},
  {position: 3, name: 'CIVICA', weight: '6.94', symbol: '8.1'},
  {position: 5, name: 'NATURALES', weight: '5.12', symbol: '4.2'},
];

@Component({
  selector: 'app-calificaciones',
  templateUrl: './calificaciones.component.html',
  styleUrls: ['./calificaciones.component.scss']
})
export class CalificacionesComponent implements OnInit {
 
  ngOnInit() {
  }
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;


}
