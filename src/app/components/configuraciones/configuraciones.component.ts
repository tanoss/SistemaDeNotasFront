import { Component, OnInit, ViewContainerRef } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { credentials, credentials1 } from "app/interfaces/credencia.interface";
import { MatStepper } from "@angular/material";
import { RestService } from "app/service/rest.service";
import { ToastsManager } from "ng6-toastr";
import { AuthService } from "app/service/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-configuraciones",
  templateUrl: "./configuraciones.component.html",
  styleUrls: ["./configuraciones.component.scss"]
})
export class ConfiguracionesComponent implements OnInit {
  checkpass: FormGroup;
  hide = true;
  disabled = false;
  // user = this.userToken.getUserToken();
  // public passEdt: credentials = {
  //   spridenId: this.user.sub,
  //   usuClave: ""
  // };
  user = this.userToken.getUserToken();
  public passEdt: credentials1 = {
    cedula: this.user.sub,
    clave : ""
  };

  // public passNw: credentials = {
  //   usuClave: "",
  //   spridenId: this.user.sub
  // };

  public passNw: credentials1 = {
    clave: "",
    cedula: this.user.sub
  };

  options: any = {
    toastLife: 4000,
    dismiss: "auto",
    showCloseButton: true
  };

  constructor(
    private _formBuilder: FormBuilder,
    private rest: RestService,
    public toastService: ToastsManager,
    private userToken: AuthService,
    private route: Router,
    vcr: ViewContainerRef
  ) {
    this.toastService.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.checkpass = this._formBuilder.group({
      check: ["", Validators.requiredTrue]
    });
  }

  confPass(stepper: MatStepper) {
    this.rest.addData(this.passEdt, "passOld").subscribe(
      data => {
        if (data == true) {
          stepper.next();
        } else {
          this.toastService.info(
            "",
            "La clave de seguridad no coincide !",
            this.options
          );
        }
      },
      error => {
        console.log("error al guardar", error);
      }
    );
  }

  actulizarPass() {
    this.rest.updateData(this.passNw, "updusu").subscribe(
      data => {
        if (data.message != undefined) {
          this.toastService.success(
            data.message,
            "La clave de seguridad !",
            this.options
          );
          setTimeout(() => {
            this.route.navigateByUrl("/dashboard");
            this.userToken.removeToken();
            setTimeout(() => {
              this.route.navigateByUrl("/login");
            }, 500);
          }, 1000);
        } else {
          this.toastService.info(
            "No se pudo actualizar la clave de seguridad",
            "Vuelva a intentarlo !",
            this.options
          );
        }
      },
      error => {
        console.log("error al guardar", error);
      }
    );
  }
}
