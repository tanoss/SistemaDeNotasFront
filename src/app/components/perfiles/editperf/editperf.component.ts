import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { RestService } from "../../../service/rest.service";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from "@angular/forms";

@Component({
  selector: "app-editperf",
  templateUrl: "./editperf.component.html",
  styleUrls: ["./editperf.component.scss"]
})
export class EditperfComponent implements OnInit {
  selectSistema = new FormControl("", Validators.required);
  sistems: any = [];
  hide = true;
  disabled = false;
  mostrarMensajeFiltro: boolean;
  mensaje: any;
  constructor(
    public dialogRef: MatDialogRef<EditperfComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private Service: RestService,
    private _formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.listSystem();
  }

  // Método para Actualizar un perfil
  actualizarPerfil() {
    this.Service.updateData(this.data, "segp").subscribe(
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
