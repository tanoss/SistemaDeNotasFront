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
import { AddopcComponent } from "../opciones/addopc/addopc.component";
import { SelectionModel } from "@angular/cdk/collections";
import { ToastsManager } from "ng6-toastr";
import {
  Usua,
  UsuarioData
} from "app/interfaces/usuario.interface";
import {   PerfilData2 } from 'app/interfaces/perfil.interface';
import { Router } from "@angular/router";
import { AuthService } from "app/service/auth.service";
import { SistemasData1} from "app/interfaces/sistema.interface";
@Component({
  selector: "app-usu-perfil",
  templateUrl: "./usu-perfil.component.html",
  styleUrls: ["./usu-perfil.component.scss"]
})
export class UsuPerfilComponent implements OnInit, AfterViewInit {
  options: any = {
    toastLife: 4000,
    dismiss: "auto",
    showCloseButton: true
  };
  public userPass: any;
  public menuItems: any[];

  mensaje: any;
  profiles: any = [];
  profileso: any[] = [];

  usuario: any = [];
  sistemas: any = [];

  perfiles: Usua = {
    perId: 0,
    usuId: 0
  };

  perfil: PerfilData2 = {
    perId: 0,
    perNombre: "",
    sisId: 0
  };

  sistema1: SistemasData1 = {
    sisId: 0,
    sisNombre: "",
    sisUrlSistema: "",
    sis_estado: false
  };

  // Seting Angular Material
  displayedColumns = [
    "select",
    "usuNombres",
    "usuApellidos",
    "usuCc",
    "spridenId",
    "spridenPidm"
  ];

  public dataSource = new MatTableDataSource<UsuarioData>();
  public data: any;
  selection = new SelectionModel<UsuarioData>(true, []);

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  listProfiles() {
    this.rest.getData("segp").subscribe((data: {}) => {
      this.profiles = data;
    });
  }

  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach(row => this.selection.select(row));
  }

  checkboxLabel(row?: UsuarioData): string {
    if (!row) {
      return `${this.isAllSelected() ? "select" : "deselect"} all`;
    }
    return `${
      this.selection.isSelected(row) ? "deselect" : "select"
    } row ${row.usuId + 1}`;
  }

  //declaracion de dialogos
  FormAdd: MatDialogRef<AddopcComponent>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  mostrarMensajeFiltro: boolean;
  mostrarMensajeTabla: boolean;
  mostrarMensajeTabla1: boolean;
  dataCentros: UsuarioData[];
  index: number;
  id: number;

  constructor(
    private rest: RestService,
    public dialog: MatDialog,
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

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
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

  listperfil(id) {
    this.perfil.perId = null;
    this.dataSource.data = [];
    this.rest.findData(id, "segps").subscribe(data => {
      if (data.message) {
        this.toastService.info(data.message, "Perfiles !", this.options);
        this.profiles = [];
        this.usuario = [];
      } else {
        this.toastService.success("", "Seleccione un Perfil !", this.options);
        this.profiles = data;
        this.listSystem();
        this.usuario = [];
      }
    });
  }
  usuarios() {
    this.cargarUsuarios();
    this.toastService.success(
      "",
      "Seleccione uno o varios Usuarios !",
      this.options
    );
  }

  // Carga de Listado de Opciones
  cargarUsuarios() {
    this.rest.getData("segu").subscribe(
      (data: any) => {
        this.dataSource.data = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  listSystem() {
    this.rest.getData("segs").subscribe((data: {}) => {
      this.sistemas = data;
    });
  }

  addListUsuPer(oId: number, pId: number) {
    var datas = this.profileso.find(x => x.usuId == oId);
    // Comprueba si el valor existe en el array
    if (datas != undefined) {
      // De ser asi tomo su posicion y lo elimina
      var dt = this.profileso.indexOf(datas);
      this.profileso.splice(dt, 1);
    } else {
      // Caso contrario lo agrega al array
      this.profileso.push({
        usuId: oId,
        perId: pId * 1,
        uspFechaIni: Date.now()
      });
    }
  }

  saveListUsuPer() {
    this.rest.addData(this.profileso, "segup").subscribe(
      data => {
        this.mensaje = data;
        this.toastService.success(
          this.mensaje.message,
          "El Asignación !",
          this.options
        );
        this.dataSource.data = [];
        this.sistema1.sisId = null;
        this.perfil.perId = null;
      },
      error => {
        console.log("error al guardar", error);
      }
    );
  }
  access() {
    this.userPass = this.userToken.getUserToken();
    this.rest.findDataUser(this.userPass.sub).subscribe(
      data => {
        this.menuItems = data.opciones;
        var datas = this.menuItems.find(x => x.opcion == "ASIGNACIÓN PERFILES");
        if (datas == undefined) {
          this.route.navigateByUrl("/dashboard");
          // this.route.navigate(['/dashboard']);
        } else {
          this.toastService.success(
            "",
            "Seleccione un Sistema !",
            this.options
          );
          this.listSystem();
        }
      },
      error => {
        console.log(error);
      }
    );
  }
}
