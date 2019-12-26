import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { RestService } from "../../../service/rest.service";

@Component({
  selector: "app-editopc",
  templateUrl: "./editopc.component.html",
  styleUrls: ["./editopc.component.scss"]
})
export class EditopcComponent implements OnInit {
  sistems: any = [];

  mensaje: any;
  constructor(
    public dialogRef: MatDialogRef<EditopcComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private Service: RestService
  ) {}

  ngOnInit() {
    this.listSystem();
  }

  // Método para Actualizar una opcion
  actualizarOpcion() {
    this.Service.updateData(this.data, "sego").subscribe(
      data => {
        this.mensaje = data;
        this.dialogRef.close(this.mensaje);
      },
      error => {
        console.log("Error al actualizar", error);
      }
    );
  }
  listSystem() {
    this.Service.getData("segs").subscribe((data: {}) => {
      this.sistems = data;
    });
  }
  // Cierre Modal
  cerrarModal() {
    this.dialogRef.close();
  }
}
