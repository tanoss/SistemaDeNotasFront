import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { RestService } from "app/service/rest.service";
@Component({
  selector: "app-editsis",
  templateUrl: "./editsis.component.html",
  styleUrls: ["./editsis.component.scss"]
})
export class EditsisComponent {
  public options: any = {
    toastLife: 4000,
    dismiss: "auto",
    showCloseButton: true
  };
  public sistema: any = {
    sisId: this.data.sisId,
    sisNombre: this.data.sisNombre,
    sisUrlSistema: this.data.sisUrlSistema,
    sisEstado: this.data.sisEstado
  };
  public mensaje: any;

  constructor(
    public dialogRef: MatDialogRef<EditsisComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private Service: RestService
  ) {}

  actualizarSistema() {
    this.Service.updateData(this.sistema, "segs").subscribe(
      data => {
        this.mensaje = data;
        this.dialogRef.close(this.mensaje);
      },
      error => {
        console.log("Error al actualizar", error);
      }
    );
  }
  cerrarModal() {
    this.dialogRef.close();
  }
}
