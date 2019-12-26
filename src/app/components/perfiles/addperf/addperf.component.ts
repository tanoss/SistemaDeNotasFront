import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { RestService } from "app/service/rest.service";
import { PerfilS } from "app/interfaces/perfil.interface";

@Component({
  selector: "app-addperf",
  templateUrl: "./addperf.component.html",
  styleUrls: ["./addperf.component.scss"]
})
export class AddperfComponent implements OnInit {
  public sistemas: any = [];
  public mensaje: any;
  public perfil: PerfilS = {
    perNombre: "",
    segSistemas: {
      sisId: undefined
    }
  };
  constructor(
    private dialogRef: MatDialogRef<AddperfComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private Service: RestService
  ) {}

  ngOnInit() {
    this.listData();
  }

  // Método para Agregar un perfil
  addPerfil() {
    this.Service.addData(this.perfil, "segp").subscribe(
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
    this.Service.getData("segs").subscribe(data => {
      this.sistemas = data;
    });
  }

  // Cierre de Modal
  cerrarModal() {
    this.dialogRef.close();
  }
}
