import { Component, OnInit, ɵConsole, ViewChild, ViewContainerRef } from '@angular/core';
import { RestService } from '../../service/rest.service';
import { ConstantPool } from '@angular/compiler';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Grado } from 'app/interfaces/persona.interface';
import { ToastsManager } from 'ng6-toastr';




@Component({
  selector: 'app-adm-cursos',
  templateUrl: './adm-cursos.component.html',
  styleUrls: ['./adm-cursos.component.scss']
})


export class AdmCursosComponent implements OnInit {

  public data: any;
  public mostrarMensajeFiltro: boolean;
  public displayedColumns = ['cedula', 'nombres', 'apellidos'];
  public dataSource = new MatTableDataSource<Grado>();

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

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private servicio: RestService,
    public toastService: ToastsManager,
    vcr: ViewContainerRef,
  ) {
    this.toastService.setRootViewContainerRef(vcr);
  }

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
    idGrado: 0,
    idParalelo: 0
  };


  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }


  ngOnInit() {
    this.listargrados();
    this.listarparalelos();
    this.listargradospr();
  }



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
        this.listargrados();
      }
    )
    
  }
  mensaje: any;

  crearparalelo() {
    this.servicio.addData(this.paralelo, 'paraleloadd').subscribe(
      data => {
        //this.mensaje = data
        //this.data = data
        this.listarparalelos();
        
      }
    )
    
  }

  creargradop(grado: number, paralelo: number) {
    console.log(grado, paralelo);
    this.gp = {
      idGrado: grado,
      idParalelo: paralelo
    }
    this.creargradopa();
  }
  response: any;

  creargradopa() {
    this.servicio.addData(this.gp, 'gradopadd').subscribe(
      data => {
        this.response = data;
        console.log(this.gp);
        this.listargradospr();
      }
    )
  }
  
  listargradospr() {
    this.servicio.getData("gradopr").subscribe(
      data => {
        this.data = data;
        this.setData();
      }
    )
  }

}
