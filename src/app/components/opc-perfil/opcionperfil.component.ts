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
  MatDialog
} from "@angular/material";
import { RestService } from "../../service/rest.service";
import { SelectionModel } from "@angular/cdk/collections";
import { ToastsManager } from "ng6-toastr";
import { Opciones, OpcionData, OpcionS} from 'app/interfaces/opcion.interface';
import { PerfilData2, PerfilS  } from 'app/interfaces/perfil.interface';
import { SistemasData } from "app/interfaces/sistema.interface";
import { AuthService } from "app/service/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-opcionperfil",
  templateUrl: "./opcionperfil.component.html",
  styleUrls: ["./opcionperfil.component.scss"]
})
export class OpcionperfilComponent implements OnInit, AfterViewInit {
  public options: any = {
    toastLife: 2000,
    dismiss: "auto",
    showCloseButton: true
  };
  public checked = undefined;

  public mostrarMensajeFiltro: boolean;
  public noOpciones: boolean;
  public noPerfiles: boolean;
  public siPerfiles: boolean;
  public mensaje: any;
  public perfiles: PerfilS[];
  public profileso: any[] = [];
  public userPass: any;
  public menuItems: any[];
  public ver = [];
  public guardar = [];
  public modificar = [];
  public eliminar = [];
  public imprimir = [];
  public sist: number;
  opciones: any = [];
  sistemas: SistemasData[];
  perId: string;

  opcPer: Opciones = {
    opcId: 0,
    perId: 0
  };

  perfil: PerfilData2 = {
    perId: 0,
    perNombre: "",
    sisId: 0
  };

  sistema1: SistemasData = {
    sisId: 0,
    sisNombre: ""
  };

  // Seting Angular Material
  displayedColumns: string[] = [
    "select",
    "opcNombre",
    "ver",
    "guardar",
    "modificar",
    "eliminar",
    "imprimir"
  ];

  public dataSource = new MatTableDataSource<OpcionS>();
  public data: any;
  selection = new SelectionModel<OpcionS>(true, []);

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach(row => this.selection.select(row));
  }

  checkboxLabel(row?: OpcionData): string {
    if (!row) {
      return `${this.isAllSelected() ? "select" : "deselect"} all`;
    }
    return `${
      this.selection.isSelected(row) ? "deselect" : "select"
    } row ${row.opcId + 1}`;
  }

  //declaracion de dialogos

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

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

  // Buscador/Filtro en Tabla
  doFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
    if (this.dataSource.filteredData.length == 0) {
      this.mostrarMensajeFiltro = true;
    } else {
      this.mostrarMensajeFiltro = false;
    }
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  listaSistemas() {
    this.rest.getData("segs").subscribe((data: SistemasData[]) => {
      this.sistemas = data;
    });
  }
  listperfiles(id) {
    this.sist = id;
    this.perfil.perId = null;
    this.dataSource.data = [];
    this.noOpciones = false;
    this.noPerfiles = false;
    this.rest.findData(id, "segps").subscribe(data => {
      if (data.message) {
        this.dataSource.data = [];
        this.toastService.info(
          data.message,
          "Búsqueda de Perfiles !",
          this.options
        );
        this.noPerfiles = true;
        this.perfiles = [];
        this.resetprofileso();
      } else {
        this.toastService.success("", "Seleccione un Perfil !", this.options);
        this.perfiles = data;
        this.listaSistemas();
        this.opciones = [];
        this.resetprofileso();
      }
    });
  }

  listopciones(id, idp) {
    this.perId = idp;

    this.noOpciones = false;
    this.siPerfiles = false;
    this.rest.findData(id, "segos").subscribe(data => {
      if (data.message) {
        this.toastService.info(
          data.message,
          "Búsqueda de Opciones !",
          this.options
        );
        this.noOpciones = true;
        this.dataSource.data = [];
        this.resetprofileso();
      } else {
        this.toastService.success(
          "",
          "Seleccione una o varias Opciones !",
          this.options
        );
        this.dataSource.data = data;
        this.resetprofileso();
      }
    });
  }

  addListOpcPer(oId: number, pId: number) {
    var datas = this.profileso.find(x => x.opcId == oId);
    // Comprueba si el valor existe en el array
    if (datas != undefined) {
      // De ser asi tomo su posicion y lo elimina
      var dt = this.profileso.indexOf(datas);
      this.profileso.splice(dt, 1);
      this.ver[oId] = false;
      this.guardar[oId] = false;
      this.modificar[oId] = false;
      this.eliminar[oId] = false;
      this.imprimir[oId] = false;
    } else {
      // Caso contrario lo agrega al array
      this.profileso.push({
        opcId: oId,
        perId: pId * 1,
        ver: this.ver[oId] * 1,
        oppNuevo: this.guardar[oId] * 1,
        oppEditar: this.modificar[oId] * 1,
        oppEliminar: this.eliminar[oId] * 1,
        oppImprimir: this.imprimir[oId] * 1
      });
    }
  }

  saveListOpcPer() {
    // toma los valores actuales del array y los muestra
    // console.log(this.profileso);
    this.rest.addData(this.profileso, "segaddop").subscribe(
      data => {
        this.mensaje = data;
        this.toastService.success(
          this.mensaje.message,
          "La Asignación !",
          this.options
        );
        this.resetprofileso();
        this.dataSource.data = [];
        this.sistema1.sisId = null;
        this.perfil.perId = null;
      },
      error => {
        console.log("error al guardar", error);
      }
    );
  }
  resetprofileso() {
    this.profileso = [];
  }

  verprofileso() {
    console.log(this.profileso);
  }

  access() {
    this.userPass = this.userToken.getUserToken();
    this.rest.findDataUser(this.userPass.sub).subscribe(
      data => {
        this.menuItems = data.opciones;
        var datas = this.menuItems.find(x => x.opcion == "ASIGNACIÓN OPCIONES");
        if (datas == undefined) {
          this.route.navigateByUrl("/dashboard");
          // this.route.navigate(['/dashboard']);
        } else {
          this.listaSistemas();
          this.toastService.success(
            "",
            "Seleccione un Sistema !",
            this.options
          );
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  datacheck(i: number) {
    console.log(i);
  }
}
