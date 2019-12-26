import {
  Component,
  OnInit,
  ViewChild,
  ViewContainerRef,
  AfterViewInit
} from "@angular/core";
import {
  MatPaginator,
  MatTableDataSource,
  MatSort,
  MatDialog,
  MatDialogRef
} from "@angular/material";
import { RestService } from "../../service/rest.service";
import { AddperfComponent } from "../perfiles/addperf/addperf.component";
import { EditperfComponent } from "../perfiles/editperf/editperf.component";
import { DelperfComponent } from "../perfiles/delperf/delperf.component";
import { ToastsManager } from "ng6-toastr";
import { FormBuilder } from "@angular/forms";
import { AuthService } from "app/service/auth.service";
import { Router } from "@angular/router";
import { PerfilS } from "app/interfaces/perfil.interface";

@Component({
  selector: "app-perfiles",
  templateUrl: "./perfiles.component.html",
  styleUrls: ["./perfiles.component.scss"]
})
export class PerfilesComponent implements OnInit, AfterViewInit {
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
  public opcion: any;

  // Seting Angular Material
  displayedColumns: string[] = ["nombreper", "nombresis", "urlsis", "opciones"];
  public dataSource = new MatTableDataSource<PerfilS>();
  public perfil: any;

  //declaracion de dialogos
  FormAdd: MatDialogRef<AddperfComponent>;
  FormDel: MatDialogRef<DelperfComponent>;
  FormEdit: MatDialogRef<EditperfComponent>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private _formBuilder: FormBuilder,
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

  // Paginador de Tabla Perfiles
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  // Carga de Listado de Perfiles
  cargarPerfiles() {
    this.rest.getData("segp").subscribe(
      (data: PerfilS[]) => {
        this.dataSource.data = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  // Agrega un Perfil
  addPerfil() {
    this.FormAdd = this.dialog.open(AddperfComponent, {
      width: "350px",
      data: {}
    });

    this.FormAdd.afterClosed().subscribe(result => {
      this.mensaje = result;
      if (this.mensaje != undefined) {
        this.toastService.success(
          this.mensaje.message,
          "El Perfil !",
          this.options
        );
        this.cargarPerfiles();
      } else {
      }
    });
  }

  // Editar un perfil
  editarPerfil(id) {
    this.rest.findData(id, "segp").subscribe((data: {}) => {
      this.perfil = data;
      this.FormEdit = this.dialog.open(EditperfComponent, {
        width: "350px",
        data: this.perfil
      });
      this.FormEdit.afterClosed().subscribe(result => {
        this.mensaje = result;
        if (this.mensaje != undefined) {
          this.toastService.success(
            this.mensaje.message,
            "El Perfil !",
            this.options
          );
          this.cargarPerfiles();
        } else {
        }
      });
    });
  }

  // Borrar un Perfil
  eliminarPerfil(perId: number, perNombre: string) {
    this.id = perId;
    this.FormDel = this.dialog.open(DelperfComponent, {
      width: "350px",
      data: {
        id: perId,
        perNombre: perNombre
      }
    });

    this.FormDel.afterClosed().subscribe(result => {
      this.mensaje = result;
      if (this.mensaje != undefined) {
        this.toastService.success(
          this.mensaje.message,
          "El Perfil !",
          this.options
        );
        this.cargarPerfiles();
      } else {
      }
    });
  }

  access() {
    this.userPass = this.userToken.getUserToken();
    this.rest.findDataUser(this.userPass.sub).subscribe(
      data => {
        this.opcion = data.opciones.filter(item => item.opcion == "PERFILES");
        if (this.opcion.length == 0 || this.opcion == undefined) {
          this.route.navigateByUrl("/dashboard");
          // this.route.navigate(['/dashboard']);
        } else {
          this.cargarPerfiles();
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
