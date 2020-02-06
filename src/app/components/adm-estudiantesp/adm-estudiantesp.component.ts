import { Component, OnInit, AfterViewInit, ViewChild, ViewContainerRef } from '@angular/core';
import { RestService } from 'app/service/rest.service';
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
import { Persona } from 'app/interfaces/persona.interface';
@Component({
  selector: 'app-adm-estudiantesp',
  templateUrl: './adm-estudiantesp.component.html',
  styleUrls: ['./adm-estudiantesp.component.scss']
})
export class AdmEstudiantespComponent implements OnInit {
  public data: any;
  public mostrarMensajeFiltro: boolean;
  // tslint:disable-next-line: max-line-length
  public displayedColumns = ['nombres', 'apellidos', 'quimestre1', 'quimestre2', 'promediofinal', 'opciones'];
  public dataSource = new MatTableDataSource<Persona>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  libreta: any = {
    idLibreta: 0,
    idPeriodoLectivo: 0,
    idClase: 0,
    notaQuimestreUno: 0,
    notaQuimestreDos: 0,
    promedioFinal: 0
  };

  options: any = {
    toastLife: 3000,
    dismiss: "auto",
    showCloseButton: true
  };

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




  user: any;
  constructor(private apiUserToken: AuthService, private service: RestService, public toastService: ToastsManager,
    vcr: ViewContainerRef) {
  }

  ngOnInit() {
    this.traercursos();
    this.mostrarMensajeFiltro = true;
  }

  cursos: any;

  traercursos() {
    this.user = this.apiUserToken.getUserToken();
    this.service.getData('idp/' + this.user.sub).subscribe(
      data => {
        this.cursos = data;
        console.log(this.cursos);
      }
    )
  }
  materias: any;
  traermateria(idmateria: number) {
    console.log(this.user.sub + idmateria);
    this.service.getData('idm/' + this.user.sub + '/' + idmateria).subscribe(
      data => {
        this.materias = data;
      }
    )
  }
  a: any;
  b: any;
  c: any;
  estudiantes: any;
  listarestudiantes(materia, grado, docente) {
    this.a = materia;
    this.b = grado;
    this.c = docente;
    console.log('id materia: ' + materia + 'idgrado: ' + grado + 'idocente: ' + docente);
    this.service.getData('idme/' + docente + '/' + grado + '/' + materia).subscribe(
      data => {
        if (data.message) {
          this.data = [];
          this.mostrarMensajeFiltro = true;
          this.setData();
        } else {
          this.data = data;
          this.setData();
          console.log(this.estudiantes);
          this.mostrarMensajeFiltro = false;
        }
      }
    )

  }
  recibirid(libreta, clase, periodo, n1, n2, promedio) {
    console.log(n1);
    console.log(n2);
    var resultado = n1 + n2 ;
    // tslint:disable-next-line: prefer-const
    var promedio1 = (resultado / 2);
    console.log(promedio1);
    this.libreta = {
      idLibreta: libreta,
      idClase: clase,
      idPeriodoLectivo: periodo,
      notaQuimestreUno: n1,
      notaQuimestreDos: n2,
      promedioFinal: promedio
    }
    this.editarnotas();
  }

  editarnotas() {
    console.log(this.libreta);
    this.service.updateData(this.libreta, 'editnotas').subscribe(
      data => {
        console.log(data);
      }
    )
    this.listarestudiantes(this.a, this.b, this.c);
  }

}
