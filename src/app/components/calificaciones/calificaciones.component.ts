
import { Component, OnInit, AfterViewInit, ViewChild, ViewContainerRef } from '@angular/core';
import { RestService } from 'app/service/rest.service';
import { Persona, libro } from 'app/interfaces/persona.interface';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { ToastsManager } from 'ng6-toastr';

@Component({
  selector: 'app-calificaciones',
  templateUrl: './calificaciones.component.html',
  styleUrls: ['./calificaciones.component.scss']
})
export class CalificacionesComponent implements OnInit {

  public mostrarMensajeFiltro: boolean;
  public displayedColumns = ['cedula', 'nombres', 'apellidos' ,'correo' ];
  public dataSource = new MatTableDataSource<libro>();

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
    this.dataSource = new MatTableDataSource(this.data1);
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

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private apiService: RestService,
    public toastService: ToastsManager,
    vcr: ViewContainerRef,
  ) {
    this.toastService.setRootViewContainerRef(vcr);
  }



  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }


  ngOnInit() {
    this.cargarestudiantes();
  }
  // tslint:disable-next-line: member-ordering
  usuario: any = {
    idTipoUsuario: '3',
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
  public data: any;
  public data1: any;
  public data2: any;

  agregarprof() {
    console.log(this.usuario);
    this.apiService.addData( this.usuario, 'libro').subscribe(
      data => {
        console.log('se agrego');
      }, error => {
        console.log(error)
      }
    )
  }

  cargarestudiantes() {
    this.apiService.getData('librorel').subscribe(
      data => {
        if (data.message) {
          this.data = [];
          this.mostrarMensajeFiltro = true;
          this.setData();
        } else {
          this.data1 = data;
          //iniciamos dataSource
          this.mostrarMensajeFiltro = false;
          this.setData();
        }
      }
    );
  }

  cargarestudiantes1() {
    this.apiService.getData('autores').subscribe(
      data => {
        if (data.message) {
          this.data = [];
          this.mostrarMensajeFiltro = true;
          this.setData();
        } else {
          this.data2 = data;
          //iniciamos dataSource
          this.mostrarMensajeFiltro = false;
          this.setData();
        }
      }
    );
  }


}
