import { Component, OnInit, ViewContainerRef, ViewChild } from '@angular/core';
import { RestService } from 'app/service/rest.service';
import {  OpcionData } from 'app/interfaces/opcion.interface';
import { PerfilData2, PerfilData} from 'app/interfaces/perfil.interface';
import {SistemasData1} from 'app/interfaces/sistema.interface';
import { MatPaginator, MatTableDataSource, MatSort, MatDialog, MatDialogRef } from '@angular/material';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ListarComponent } from 'app/components/opc-perfil/listar/listar.component';

import { ToastsManager } from 'ng6-toastr';
@Component({
  selector: 'app-mostrar',
  templateUrl: './mostrar.component.html',
  styleUrls: ['./mostrar.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', display: 'none' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
//declaración de dialogos
export class MostrarComponent implements OnInit {

  sistemas: any = []
  profiles: any = []
  ejemplo1: any = []
  sistema1: SistemasData1 = {
    sisId: 0,
    sisNombre: "",
    sisUrlSistema: "",
    sis_estado: false,
  }
  opcion: OpcionData = {
    opcId: 0,
    opcNombre: "",
    opcNivel: 0,
    opcOrden: 0,
    opcUrl: "",
    sisNombre: "",
    sisId: 0,
  }


  public data: any;
  public perfil: any;
  perfil1: PerfilData2 = {
    perId: 0,
    perNombre: '',
    sisId: 0
  }

  //declaración de dialogos
  FormList: MatDialogRef<ListarComponent>;


  mostrarMensajeFiltro: boolean;
  mostrarMensajeTabla: boolean;
  mostrarMensajeTabla1: boolean;

  index: number;
  id: number;

  mostrarMensaje: boolean;
  dataPerfiles: PerfilData[];


  mensaje: any;

  options: any = {
    toastLife: 4000,
    dismiss: "auto",
    showCloseButton: true,
  }

  listperfil(id) {
    this.mostrarMensajeTabla = false;
    this.mostrarMensajeTabla1 = false;
    this.rest.findData(id, "segps").subscribe(data => {
      if (data.message) {
        this.toastService.info(data.message, 'No existe !');
        this.mostrarMensajeTabla1 = true;
        this.profiles = [];

        // this.opciones = [];
        this.setData();
      } else {
        this.profiles = data;

        // this.listSystem();
        // this.opciones = [];
        //console.log(this.profiles)
        this.setData();
      }
    });
  }



  constructor(private rest: RestService,
    public dialog: MatDialog, public dataService: RestService,
    public toastService: ToastsManager, vcr: ViewContainerRef) {
    this.toastService.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.listSystem();
    this.cargarPerfiles();
  }

  listSystem() {
    this.rest.getData("segs").subscribe((data: {}) => {
      this.sistemas = data;
      //console.log("listar sistema:", this.sistemas);

    });
  }
  // Seting Angular Material

  displayedColumns: string[] = ['id', 'nombreper', 'nmestado', 'editar'];
  public dataSource = new MatTableDataSource<PerfilData>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;





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
  ngAfterViewInit() {
    this.setPaginator();
  }

  setPaginator() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    const RangeLabel = (page: number, pageSize: number, length: number) => {
      if (length == 0 || pageSize == 0) { return `0 de ${length}`; }
      length = Math.max(length, 0);
      const startIndex = page * pageSize;
      // If the start index exceeds the list length, do not try and fix the end index to the end.
      const endIndex = startIndex < length ?
        Math.min(startIndex + pageSize, length) :
        startIndex + pageSize;
      return `${startIndex + 1} - ${endIndex} de ${length}`;
    }

    this.paginator._intl.itemsPerPageLabel = 'Items por Página';
    this.paginator._intl.firstPageLabel = 'Primera Página';
    this.paginator._intl.previousPageLabel = 'Página Anterior';
    this.paginator._intl.nextPageLabel = 'Página Siguiente';
    this.paginator._intl.lastPageLabel = 'Última Página';
    this.paginator._intl.getRangeLabel = RangeLabel;
  }

  setData() {
    this.dataSource = new MatTableDataSource(this.profiles);
    this.setPaginator();
  }

  // Carga de Listado de Perfiles
  cargarPerfiles() {
    this.rest.getData("segp").subscribe((data: any) => {
      this.data = data;
      // this.profiles = data.perId;


      this.setData();
    }, error => {
      console.log(error);
    });
  }


  // perles(id){
  //   this.mostrarMensajeTabla = false;
  //   this.mostrarMensajeTabla1 = false;
  //    this.rest.findData(id,"segpo").subscribe(data => {
  //     if (data.message) {
  //       this.toastService.info(data.message, 'No existe !');
  //       this.mostrarMensajeTabla1 = true;
  //       this.ejemplo1 = [];
  //       //this.setData();
  //     } else {
  //       this.ejemplo1 = data
  //      // this.setData();
  //     }
  //    })
  // }

  perles(id) {
    this.mostrarMensajeTabla = false;
    this.mostrarMensajeTabla1 = false;
    this.rest.findData(id, "segpo").subscribe(data => {
      if (data.message) {
        this.toastService.info(data.message, 'No existe !');
        this.mostrarMensajeTabla1 = true;
        this.ejemplo1 = [];
      } else {
        this.ejemplo1 = data
        this.FormList = this.dialog.open(ListarComponent, {
          width: '350px',
          data: this.ejemplo1
        })
      }
    })
  }





}
