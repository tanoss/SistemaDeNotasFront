import { Component, OnInit, ViewChild, ViewContainerRef } from "@angular/core";
import {
  MatTableDataSource,
  MatDialogRef,
  MatSort,
  MatPaginator,
  MatDialog
} from "@angular/material";
import { SistemasData } from "app/interfaces/sistema.interface";
import { EditcontComponent } from "./editcont/editcont.component";
import { DeletecontComponent } from "./deletecont/deletecont.component";
import { RestService } from "app/service/rest.service";
import { ToastsManager } from "ng6-toastr";
import { AuthService } from "app/service/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-control-usuarios",
  templateUrl: "./control-usuarios.component.html",
  styleUrls: ["./control-usuarios.component.scss"]
})
export class ControlUsuariosComponent implements OnInit {
  // Seting Angular Material
  public displayedColumnsSistemas = ["nombre", "url", "opciones"];
  public displayedColumnsUsuarios = [
    "usuNombres",
    "usuApellidos",
    "usuCc",
    "spridenId",
    "spridenPidm",
    "opciones"
  ];
  public dataSourceSistema = new MatTableDataSource<SistemasData>();
  public dataSourceUsuario = new MatTableDataSource<SistemasData>();
  private sistema: SistemasData;
  public userPass: any;
  public crear: any;
  public editar: any;
  public mostrarMensajeFiltro: boolean;
  public mensaje: any;
  public data: any;
  public opcion: any;
  profiles: any = [];
  usuario: any = [];
  sistemas: any = [];
  sistema1: any = [];
  perfil: any = [];

  options: any = {
    toastLife: 4000,
    dismiss: "auto",
    showCloseButton: true
  };

  //declaracion de dialogos
  FormEdit: MatDialogRef<EditcontComponent>;
  FormDelete: MatDialogRef<DeletecontComponent>;

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
    this.listSystem();
  }

  setPaginatorSistema() {
    this.dataSourceSistema.sort = this.sort;
    this.dataSourceSistema.paginator = this.paginator;
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
  }

  setPaginatorUsuario() {
    this.dataSourceUsuario.sort = this.sort;
    this.dataSourceUsuario.paginator = this.paginator;
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

    this.paginator._intl.itemsPerPageLabel = "Items por Página";
    this.paginator._intl.firstPageLabel = "Primera Página";
    this.paginator._intl.previousPageLabel = "Página Anterior";
    this.paginator._intl.nextPageLabel = "Página Siguiente";
    this.paginator._intl.lastPageLabel = "Última Página";
    this.paginator._intl.getRangeLabel = RangeLabel;
  }

  setDataSistema() {
    this.dataSourceSistema = new MatTableDataSource(this.data);
    this.setPaginatorSistema();
  }

  setDataUsuario() {
    this.dataSourceUsuario = new MatTableDataSource(this.data);
    this.setPaginatorUsuario();
  }

  // Buscador/Filtro en Tabla
  doFilter(filterValue: string) {
    this.dataSourceSistema.filter = filterValue.trim().toLocaleLowerCase();
    if (this.dataSourceSistema.filteredData.length == 0) {
      this.mostrarMensajeFiltro = true;
    } else {
      this.mostrarMensajeFiltro = false;
    }
  }

  ngAfterViewInit(): void {
    this.dataSourceUsuario.sort = this.sort;
    this.dataSourceUsuario.paginator = this.paginator;
  }

  listSystem() {
    this.rest.getData("segs").subscribe((data: {}) => {
      this.sistemas = data;
    });
  }

  listperfil(id) {
    this.perfil.perId = null;
    this.dataSourceUsuario.data = [];
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

  // lista de sistemas
  cargarSistemasUsuario(codCC: any) {
    this.rest.getData("segsu/" + codCC).subscribe(
      (data: any) => {
        if (data.message) {
          this.mostrarMensajeFiltro = true;
          this.data = [];
          //iniciamos dataSource
          this.setDataSistema();
        } else {
          this.mostrarMensajeFiltro = false;
          this.data = data;
          //iniciamos dataSource
          this.setDataSistema();
        }
      },
      error => {
        console.log(error);
      }
    );
  }
  // Buscar los usuarios designados a el sistemas
  usuariosSis(id: any) {
    this.rest.getData("segus/" + id).subscribe((data: any) => {
      if (data.message) {
        this.mostrarMensajeFiltro = true;
        this.data = [];
        //iniciamos dataSource
        this.setDataUsuario();
      } else {
        this.mostrarMensajeFiltro = false;
        this.data = data;
        //iniciamos dataSource
        this.setDataUsuario();
      }
    });
  }
  // Listar usuarios  designados a el perfil
  usuariosPerf(id: any) {
    this.rest.getData("segup/" + id).subscribe((data: any) => {
      if (data.message) {
        this.mostrarMensajeFiltro = true;
        this.data = [];
        //iniciamos dataSource
        this.setDataUsuario();
      } else {
        this.mostrarMensajeFiltro = false;
        this.data = data;
        //iniciamos dataSource
        this.setDataUsuario();
      }
    });
  }
  // Vizualizar los perfiles
  verPerfiles(id) {
    this.rest.findData(id, "segp").subscribe((data: {}) => {
      this.perfil = data;
      this.FormEdit = this.dialog.open(EditcontComponent, {
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
          // this.cargarPerfiles();
        } else {
        }
      });
    });
  }
  // Editar los perfiles de un usuario
  editarPerfiles(id) {
    this.rest.findData(id, "segp").subscribe((data: {}) => {
      this.perfil = data;
      this.FormEdit = this.dialog.open(EditcontComponent, {
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
          // this.cargarPerfiles();
        } else {
        }
      });
    });
  }
}
