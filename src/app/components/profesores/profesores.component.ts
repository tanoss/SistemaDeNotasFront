import { Component, OnInit, AfterViewInit, ViewChild, ViewContainerRef } from '@angular/core';
import { RestService } from 'app/service/rest.service';
import { ConstantPool } from '@angular/compiler';
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
// validar input
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

export class InputEmail implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-profesores',
  templateUrl: './profesores.component.html',
  styleUrls: ['./profesores.component.scss'],
})
export class ProfesoresComponent implements OnInit, AfterViewInit {
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
  constructor(private apiService: RestService,
    public toastService: ToastsManager,
    vcr: ViewContainerRef,
  ) {
    this.toastService.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.cargarprofesores();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  // tslint:disable-next-line: member-ordering
  usuario: any = {
    idTipoUsuario: '2',
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

  agregarprof() {
    console.log(this.usuario);
    this.apiService.addData(this.usuario, 'addperson').subscribe(
      data => {
        if (data) {
          this.toastService.success("Profesor Agregado");
          console.log('Profesor Agregado');
          console.log(data);
          this.cargarprofesores();
        } else {
          this.toastService.info(
            data.message,
            "Profesor no agregado",
          );
        }
      },
      error => {
        this.toastService.error(
          "Vuelva a intertarlo",
          "Error de conexión !");
      }
    );
    
  }
  cargarprofesores() {
    this.apiService.getData('allprof').subscribe(
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

}
