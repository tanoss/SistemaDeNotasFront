import { Component, OnInit } from '@angular/core';



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
  { position: 1, name: 'MATEMATICAS', weight: '9.86', symbol: '8.87' },
  { position: 2, name: 'LENGUAJE', weight: '7.74', symbol: '8.01' },
  { position: 3, name: 'HISTORIA', weight: '6.21', symbol: '7.2' },
  { position: 3, name: 'SOCIALES', weight: '6.94', symbol: '8.1' },
  { position: 5, name: 'CIVICA', weight: '5.12', symbol: '4.2' },
];
@Component({
  selector: 'app-adm-materiasp',
  templateUrl: './adm-materiasp.component.html',
  styleUrls: ['./adm-materiasp.component.scss']
})
export class AdmMateriaspComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;
}
