import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { RestService } from "app/service/rest.service";
import { OpcionData } from "app/interfaces/opcion.interface";
@Component({
  selector: "app-listar",
  templateUrl: "./listar.component.html",
  styleUrls: ["./listar.component.scss"]
})
export class ListarComponent implements OnInit {
  opcion: OpcionData = {
    opcId: 0,
    opcNombre: "",
    opcNivel: 0,
    opcOrden: 0,
    opcUrl: "",
    sisNombre: "",
    sisId: 0
  };

  constructor(
    public dialogRef: MatDialogRef<ListarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private Service: RestService
  ) {
    console.log(data);
  }

  ngOnInit() {}
  cerrarModal() {
    this.dialogRef.close();
  }
}
