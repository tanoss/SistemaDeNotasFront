import {
  Component,
  Inject,
  OnInit,
  ViewChild,
  ViewContainerRef,
  AfterViewInit,
  ViewEncapsulation
} from "@angular/core";
import {
  MatPaginator,
  MatTableDataSource,
  MatSort,
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from "@angular/material";

import { AddsisComponent } from "../sistemas/addsis/addsis.component";
import { EditsisComponent } from "../sistemas/editsis/editsis.component";
import { ToastsManager } from "ng6-toastr";
import { Router } from "@angular/router";
import { AuthService } from "app/service/auth.service";
import { SistemasData } from "app/interfaces/sistema.interface";
import { RestService } from "app/service/rest.service";
@Component({
  selector: "app-sistemas",
  templateUrl: "./sistemas.component.html",
  styleUrls: ["./sistemas.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class SistemasComponent implements OnInit, AfterViewInit {
  // Seting Angular Material
  public displayedColumns = ["nombre", "url", "opciones"];
  public dataSource = new MatTableDataSource<SistemasData>();
  private sistema: SistemasData;
  public userPass: any;
  public crear: any;
  public editar: any;
  public mostrarMensajeFiltro: boolean;
  public mensaje: any;
  public data: any;
  public opcion: any;

  options: any = {
    toastLife: 4000,
    dismiss: "auto",
    showCloseButton: true
  };

  //declaracion de dialogos
  FormAdd: MatDialogRef<AddsisComponent>;
  FormEdit: MatDialogRef<EditsisComponent>;

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
  }

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

    this.paginator._intl.itemsPerPageLabel = "Items por Página";
    this.paginator._intl.firstPageLabel = "Primera Página";
    this.paginator._intl.previousPageLabel = "Página Anterior";
    this.paginator._intl.nextPageLabel = "Página Siguiente";
    this.paginator._intl.lastPageLabel = "Última Página";
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

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  // lista de sistemas
  cargarSistemas(estado) {
    this.rest.getData(estado).subscribe(
      data => {
        if (data.message) {
          this.data = [];
          //iniciamos dataSource
          this.mostrarMensajeFiltro = true;
          this.setData();
        } else {
          this.data = data;
          //iniciamos dataSource
          this.mostrarMensajeFiltro = false;
          this.setData();
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  // Agrega un sistema
  addSistemas() {
    this.FormAdd = this.dialog.open(AddsisComponent, {
      width: "350px",
      data: {}
    });
    this.FormAdd.afterClosed().subscribe(result => {
      this.mensaje = result;
      if (this.mensaje != undefined) {
        this.toastService.success(
          this.mensaje.message,
          "El Sistema !",
          this.options
        );
        this.cargarSistemas("segs");
      } else {
      }
    });
  }

  // Editar un Sistema
  editarSistema(id, estado) {
    this.rest.findData(id, "segs").subscribe((data: {}) => {
      this.sistema = data;
      this.FormEdit = this.dialog.open(EditsisComponent, {
        width: "350px",
        data: this.sistema
      });
      this.FormEdit.afterClosed().subscribe(result => {
        this.mensaje = result;
        if (this.mensaje != undefined) {
          this.toastService.success(
            this.mensaje.message,
            "El Sistema !",
            this.options
          );
          if (estado == true) {
            this.cargarSistemas("segs");
          } else {
            this.cargarSistemas("segsi");
          }
        } else {
        }
      });
    });
  }

  // access() {
  //   this.userPass = this.userToken.getUserToken();
  //   this.rest.findDataUser(this.userPass.sub).subscribe(
  //     data => {
  //       this.opcion = data.opciones.filter(item => item.opcion == "SISTEMAS");
  //       if (this.opcion.length == 0 || this.opcion == undefined) {
  //         this.route.navigateByUrl("/dashboard");
  //       } else {
  //         this.cargarSistemas("segs");
  //         this.crear = this.opcion.map(x => x.crear);
  //         this.crear = this.crear.find(x => x == 1);
  //         this.editar = this.opcion.map(x => x.modificar);
  //         this.editar = this.editar.find(x => x == 1);
  //       }
  //     },
  //     error => {
  //       console.log(error);
  //     }
  //   );
  // }
  // openDialog(): void {
  //   const dialogRef = this.dialog.open(SistemasComponent, {
  //     width: '250px',
  //   });
    
    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed');
    // });
    //openDialog(){
    //  'mirar'
    //}
  }

