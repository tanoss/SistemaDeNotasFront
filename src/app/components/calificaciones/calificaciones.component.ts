
import { Component, OnInit, AfterViewInit, ViewChild, ViewContainerRef } from '@angular/core';
import { RestService } from 'app/service/rest.service';
import { Persona } from 'app/interfaces/persona.interface';
import { AuthService } from 'app/service/auth.service';
import {
  MatPaginator,
  MatTableDataSource,
  MatSort,
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material';
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


@Component({
  selector: 'app-calificaciones',
  templateUrl: './calificaciones.component.html',
  styleUrls: ['./calificaciones.component.scss']
})
export class CalificacionesComponent implements OnInit,  AfterViewInit {
  user: any;
  public data: any;
  public mostrarMensajeFiltro: boolean;
  public displayedColumns = ['materia', 'nq1', 'nq2', 'promediofinal'];
  public dataSource = new MatTableDataSource<Persona>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.traernotas();
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  constructor(private apiUserToken: AuthService, private service: RestService) {

  }

  // paginacion
  setPaginator() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    const RangeLabel = (page: number, pageSize: number, length: number) => {
      if (length == 0 || pageSize == 0) {
        return `0 de ${length}`;
      }
      length = Math.max(length, 0);
      const startIndex = page * pageSize;
      // If the start index exceeds the list length, do not try and fix the end index to the end.
      const endIndex =
        startIndex < length
          ? Math.min(startIndex + pageSize, length)
          : startIndex + pageSize;
      return `${startIndex + 1} - ${endIndex} de ${length}`;
    };

    this.paginator._intl.itemsPerPageLabel = 'Items por Página';
    this.paginator._intl.firstPageLabel = 'Primera Página';
    this.paginator._intl.previousPageLabel = 'Página Anterior';
    this.paginator._intl.nextPageLabel = 'Página Siguiente';
    this.paginator._intl.lastPageLabel = 'Última Página';
    this.paginator._intl.getRangeLabel = RangeLabel;
  }

  setData() {
    this.dataSource = new MatTableDataSource(this.data);
    this.setPaginator();
  }

  // Buscador/Filtro en Tabla
  doFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
    if (this.dataSource.filteredData.length == 0) {
      this.mostrarMensajeFiltro = true;
    } else {
      this.mostrarMensajeFiltro = false;
    }
  }


  traernotas() {
    this.user = this.apiUserToken.getUserToken();

    this.service.getData('id/' + this.user.sub).subscribe(
      data => {
        this.data = data;
        //iniciamos dataSource
        //this.mostrarMensajeFiltro = false;
        this.setData();
      }
    )
  }


}
