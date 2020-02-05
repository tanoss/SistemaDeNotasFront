import { Component, OnInit, AfterViewInit, ViewChild, ViewContainerRef } from '@angular/core';
import { RestService } from 'app/service/rest.service';
import { Persona } from 'app/interfaces/persona.interface';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ToastsManager } from 'ng6-toastr';
import { FormControl, FormGroupDirective, NgForm, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';


export class InputEmail implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-admestudiantes',
  templateUrl: './admestudiantes.component.html',
  styleUrls: ['./admestudiantes.component.scss']
})
export class AdmestudiantesComponent implements OnInit, AfterViewInit {
  public data: any;
  public mostrarMensajeFiltro: boolean;
  public displayedColumns = ['cedula', 'nombres', 'apellidos', 'correo', 'direccion', 'telefonoConvencional', 'telefonoCelular', 'referenciaPersNombre', 'referenciaPersTelf'];
  public dataSource = new MatTableDataSource<Persona>();

  /// validatr input
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  matcher = new InputEmail();
  options: any = {
    toastLife: 3000,
    dismiss: "auto",
    showCloseButton: true
  };
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
  constructor(private apiService: RestService,
    public toastService: ToastsManager,
    vcr: ViewContainerRef, private formBuilder: FormBuilder
  ) {
    this.toastService.setRootViewContainerRef(vcr);
  }



  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }


  ngOnInit() {
    this.cargarestudiantes();
    this.listaridestudiante();
    this.cargarprofesores();
  }
  // tslint:disable-next-line: member-ordering
  usuario: any = {
    idTipoUsuario: '3',
    cedula: '',
    nombre: '',
    apellido: '',
    correo: '',
    direccion: '',
    telefonoConvencional: '',
    telefonoCelular: '',
    referenciaPersNombre: '',
    referenciaPersTelf: ''
  };
  // tslint:disable-next-line: member-ordering
  profesor: any[] = [];


  agregarestu() {
    console.log(this.usuario);
    this.apiService.addData(this.usuario, 'addperson').subscribe(
      data => {
        if (data) {
          this.toastService.success("", "Estudiante Agregado");
          console.log(data);
          this.cargarestudiantes();
        } else {
          this.toastService.info(
            data.message,
            "Estudiante no agregado",
            this.options
          );
        }
      },
      error => {
        this.toastService.error(
          "Vuelva a intertarlo",
          "Datos NO Estudiante !");
        this.options
      }
    );
  }

  cargarestudiantes() {
    this.apiService.getData('allestudiantes').subscribe(
      data => {
        if (data.message) {
          this.data = [];
          this.mostrarMensajeFiltro = true;
          this.setData();
        } else {
          this.data = data;
          //iniciamos dataSource
          this.mostrarMensajeFiltro = false;
          this.setData();
        }
      }
    );
  }

  profesores: any;
  cargarprofesores() {
    this.apiService.getData('allprof').subscribe(
      data => {
          this.profesores = data;
      }
    );
  }

  estudiantes: any;
  listaridestudiante() {
    this.apiService.getData('estudianteid').subscribe(
      data => {
        this.estudiantes = data;

      }
    )
  }

  estudiante: number;
  profesorc: String;
  grado: number;
  save1(estudiante) {
    this.estudiante = estudiante;
    console.log(this.estudiante)
  }

  cursos:any;
  save2(profesorc) {
    this.profesorc = profesorc;
    this.apiService.getData('idp/' + this.profesorc).subscribe(
      data => {
        this.cursos = data;
        console.log(this.cursos);
      }
    )
  }

  asignacion: any;
  save3(grado) {
    this.grado = grado;
    this.asignacion = {
      idEstudiante: this.estudiante,
      idMateriaDocenteGrado: this.grado
    }
    this.asignarestudiante();
  }
  
  asignarestudiante() {
    console.log(this.asignacion)
    this.apiService.addData(this.asignacion, 'clase').subscribe(
      data => {
        console.log(data);
      }
    )
  }

  materias: any;
  traermateria(idmateria: number) {
    console.log(this.profesorc , idmateria);
    this.apiService.getData('idm/' + this.profesorc + '/' + idmateria).subscribe(
      data => {
        this.materias = data;
      }
    )
  }

}
