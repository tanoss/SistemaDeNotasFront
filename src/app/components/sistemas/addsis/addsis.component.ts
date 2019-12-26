import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { RestService } from "app/service/rest.service";
import { SistemasData1 } from "app/interfaces/sistema.interface";

@Component({
  selector: "app-addsis",
  templateUrl: "./addsis.component.html",
  styleUrls: ["./addsis.component.scss"]
})
export class AddsisComponent {
  sistema: SistemasData1 = {
    sisId: 0,
    sisNombre: "",
    sisUrlSistema: "",
    sis_estado: true
  };
  options: any = {
    toastLife: 4000,
    dismiss: "auto",
    showCloseButton: true
  };

  mensaje: any;

  public dataSave: any;

  constructor(
    public dialogRef: MatDialogRef<AddsisComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dataService: RestService
  ) {}

  addSistema() {
    this.dataService.addData(this.sistema, "segs").subscribe(
      data => {
        this.mensaje = data;
        this.dialogRef.close(this.mensaje);
      },
      error => {
        console.log("error al guardar", error);
      }
    );
  }

  cerrarModal() {
    this.dialogRef.close();
  }
}
