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
  {position: 1, name: 'Luis Pincay', weight: '9.86', symbol: '8.87'},
  {position: 2, name: 'Roberto Ponce', weight: '7.74', symbol: '8.01'},
  {position: 3, name: 'Braulio Torres', weight: '6.21', symbol: '7.2'},
  {position: 3, name: 'Wilmer Gavilanez', weight: '6.94', symbol: '8.1'},
  {position: 5, name: 'Eduardo Perez', weight: '5.12', symbol: '4.2'},
];
@Component({
  selector: 'app-adm-cursosp',
  templateUrl: './adm-cursosp.component.html',
  styleUrls: ['./adm-cursosp.component.scss']
})
export class AdmCursospComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;
}
