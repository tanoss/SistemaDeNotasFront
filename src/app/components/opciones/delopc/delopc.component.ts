import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { RestService } from "../../../service/rest.service";

@Component({
  selector: "app-delopc",
  templateUrl: "./delopc.component.html",
  styleUrls: ["./delopc.component.scss"]
})
export class DelopcComponent {
  mensaje: any;

  constructor(
    public dialogRef: MatDialogRef<DelopcComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private Service: RestService
  ) {}

  // Método para Borrar una opcion
  eliminarOpcion(id: number) {
    this.Service.deleteData(id, "sego").subscribe(data => {
      this.mensaje = data;
      this.dialogRef.close(this.mensaje);
    });
  }

  cerrarModal() {
    this.dialogRef.close();
  }
}
