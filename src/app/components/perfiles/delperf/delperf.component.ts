import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { RestService } from "../../../service/rest.service";

@Component({
  selector: "app-delperf",
  templateUrl: "./delperf.component.html",
  styleUrls: ["./delperf.component.scss"]
})
export class DelperfComponent {
  public mensaje: any;

  constructor(
    public dialogRef: MatDialogRef<DelperfComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private Service: RestService
  ) {}

  eliminarPerfil(id: number) {
    this.Service.deleteData(id, "segp").subscribe(data => {
      this.mensaje = data;
      this.dialogRef.close(this.mensaje);
    });
  }

  cerrarModal() {
    this.dialogRef.close();
  }
}
