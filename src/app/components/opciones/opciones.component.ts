import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  ViewContainerRef
} from "@angular/core";
import {
  MatPaginator,
  MatTableDataSource,
  MatSort,
  MatDialog,
  MatDialogRef
} from "@angular/material";
import { RestService } from "../../service/rest.service";
import { AddopcComponent } from "../opciones/addopc/addopc.component";
import { DelopcComponent } from "../opciones/delopc/delopc.component";
import { EditopcComponent } from "../opciones/editopc/editopc.component";
import { ToastsManager } from "ng6-toastr";
import { AuthService } from "app/service/auth.service";
import { Router } from "@angular/router";
import { OpcionS } from "app/interfaces/opcion.interface";

@Component({
  selector: "app-opciones",
  templateUrl: "./opciones.component.html",
  styleUrls: ["./opciones.component.scss"]
})
export class OpcionesComponent implements OnInit, AfterViewInit {
  // Seting Angular Material
  public displayedColumns = [
    "opcNombre",
    "segSistemas",
    "opcNivel",
    "opcOrden",
    "opcUrl",
    "opciones"
  ];
  public dataSource = new MatTableDataSource<OpcionS>();

  public opcion: any;
  public mostrarMensajeFiltro: boolean;
  public id: number;
  public mensaje: any;
  public options: any = {
    toastLife: 4000,
    dismiss: "auto",
    showCloseButton: true
  };
  public userPass: any;
  public crear: any;
  public editar: any;
  public eliminar: any;

  //declaracion de dialogos
  FormAdd: MatDialogRef<AddopcComponent>;
  FormDel: MatDialogRef<DelopcComponent>;
  FormEdit: MatDialogRef<EditopcComponent>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private rest: RestService,
    public dialog: MatDialog,
    public dataService: RestService,
    public toastService: ToastsManager,
    vcr: ViewContainerRef,
    private userToken: AuthService,
    private route: Router
  ) {
    this.toastService.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.access();
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

  // Paginador de Tabla
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  // Carga de Listado de Opciones
  cargarOpciones() {
    this.rest.getData("sego").subscribe(
      (data: OpcionS[]) => {
        this.dataSource.data = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  // Agregar un Opcion
  addOpcion() {
    this.FormAdd = this.dialog.open(AddopcComponent, {
      width: "350px",
      data: {}
    });
    this.FormAdd.afterClosed().subscribe(result => {
      this.mensaje = result;
      if (this.mensaje != undefined) {
        this.toastService.success(
          this.mensaje.message,
          "La Opcion !",
          this.options
        );
        this.cargarOpciones();
      } else {
      }
    });
  }

  // Editar una opcion
  editarOpcion(id) {
    this.rest.findData(id, "sego").subscribe((data: {}) => {
      this.opcion = data;
      this.FormEdit = this.dialog.open(EditopcComponent, {
        width: "350px",
        data: this.opcion
      });
      this.FormEdit.afterClosed().subscribe(result => {
        this.mensaje = result;
        if (this.mensaje != undefined) {
          this.toastService.success(
            this.mensaje.message,
            "La Opción !",
            this.options
          );
          this.cargarOpciones();
        } else {
        }
      });
    });
  }

  // Borrar una Opcion
  eliminarOpcion(opcId: number, opcNombre: string) {
    this.id = opcId;
    this.FormDel = this.dialog.open(DelopcComponent, {
      width: "350px",
      data: {
        id: opcId,
        opcNombre: opcNombre
      }
    });
    this.FormDel.afterClosed().subscribe(result => {
      this.mensaje = result;
      if (this.mensaje != undefined) {
        this.toastService.success(
          this.mensaje.message,
          "La Opción !",
          this.options
        );
        this.cargarOpciones();
      } else {
      }
    });
  }

  access() {
    this.userPass = this.userToken.getUserToken();
    this.rest.findDataUser(this.userPass.sub).subscribe(
      data => {
        this.opcion = data.opciones.filter(item => item.opcion == "OPCIONES");
        if (this.opcion.length == 0 || this.opcion == undefined) {
          this.route.navigateByUrl("/dashboard");
          // this.route.navigate(['/dashboard']);
        } else {
          this.cargarOpciones();
          this.crear = this.opcion.map(x => x.crear);
          this.crear = this.crear.find(x => x == 1);
          this.editar = this.opcion.map(x => x.modificar);
          this.editar = this.editar.find(x => x == 1);
          this.eliminar = this.opcion.map(x => x.eliminar);
          this.eliminar = this.eliminar.find(x => x == 1);
        }
      },
      error => {
        console.log(error);
      }
    );
  }
}
