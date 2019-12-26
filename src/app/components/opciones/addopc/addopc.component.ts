import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { RestService } from "../../../service/rest.service";
import { OpcionS } from "app/interfaces/opcion.interface";

@Component({
  selector: "app-addopc",
  templateUrl: "./addopc.component.html",
  styleUrls: ["./addopc.component.scss"]
})
export class AddopcComponent implements OnInit {
  public sistemas: any = [];
  public mensaje: any;
  public opcion: OpcionS = {
    opcNombre: "",
    opcNivel: undefined,
    opcOrden: undefined,
    opcUrl: "",
    segSistemas: {
      sisId: undefined
    }
  };

  constructor(
    private dialogRef: MatDialogRef<AddopcComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private Service: RestService
  ) {}
  ngOnInit() {
    this.listData();
  }
  // Método para Agregar una opción
  addOpcion() {
    this.Service.addData(this.opcion, "sego").subscribe(
      data => {
        this.mensaje = data;
        this.dialogRef.close(this.mensaje);
      },
      error => {
        console.log("error al guardar", error);
      }
    );
  }

  listData() {
    this.Service.getData("segs").subscribe((data: {}) => {
      this.sistemas = data;
    });
  }

  // Cierre de Modal
  cerrarModal() {
    this.dialogRef.close();
  }
}
