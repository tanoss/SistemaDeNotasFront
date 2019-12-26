import { Component, ViewContainerRef, OnInit } from "@angular/core";
import { AuthService } from "app/service/auth.service";
import { Router } from "@angular/router";
import { ToastsManager } from "ng6-toastr";
import { credentials, credentials1 } from "app/interfaces/credencia.interface";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  credential: credentials1 = {
    cedula: "",
    clave: ""
  };

  options: any = {
    toastLife: 3000,
    dismiss: "auto",
    showCloseButton: true
  };

  hide = true;

  constructor(
    private apiAuth: AuthService,
    private route: Router,
    public toastService: ToastsManager,
    vcr: ViewContainerRef
  ) {
    this.toastService.setRootViewContainerRef(vcr);
  }
  ngOnInit() {
    if (this.apiAuth.setloggedIn()) {
      location.replace("dashboard");
    }
  }

  loginpass() {
    this.apiAuth.login(this.credential).subscribe(
      data => {
        if (data.segToken) {
          this.apiAuth.accessToken(data.segToken);
          this.apiAuth.setloggedIn();
          this.toastService.success("", "Acceso Satisfactorio !", this.options);
          setTimeout(() => {
            this.route.navigate(["/dashboard"]);
          }, 400);
        } else {
          this.toastService.info(
            data.message,
            "Acceso Fallido !",
            this.options
          );
        }
      },
      error => {
        this.toastService.error(
          "Vuelva a intertarlo",
          "Error de conexión !",
          this.options
        );
      }
    );
  }
}
