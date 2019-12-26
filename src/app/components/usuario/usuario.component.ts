import { Component, OnInit, ViewContainerRef } from "@angular/core";
import { UsuarioData } from "app/interfaces/user.interface";
import { RestService } from "app/service/rest.service";
import { ActivatedRoute, Router, NavigationEnd } from "@angular/router";
import { ToastsManager } from "ng6-toastr";
import { AuthService } from "app/service/auth.service";

@Component({
  selector: "app-usuario",
  templateUrl: "./usuario.component.html",
  styleUrls: ["./usuario.component.scss"]
})
export class UsuarioComponent implements OnInit {
  public guardar: boolean;
  public userPass: any;
  public menuItems: any[];
  public crear: any;
  searchValue: string = "";
  public opcion: any;

  options: any = {
    toastLife: 4000,
    dismiss: "auto",
    showCloseButton: true
  };

  navigationSubscription;

  usuarios: UsuarioData = {
    usuCc: ""
  };

  user: UsuarioData = {
    usuId: undefined,
    usuCc: "",
    usuNombres: "",
    usuApellidos: "",
    usuEmail: "",
    usuTipoDoc: "",
    usuCodSenescyt: "",
    usuEmailInstitucional: "",
    spridenId: "",
    spridenPidm: undefined
  };
  user1: UsuarioData = {
    usuId: undefined,
    usuCc: "",
    usuNombres: "",
    usuApellidos: "",
    usuEmail: "",
    usuTipoDoc: "",
    usuCodSenescyt: "",
    usuEmailInstitucional: "",
    spridenId: "",
    spridenPidm: undefined
  };

  userData: UsuarioData;
  datos: boolean;
  param: any;
  usuCc: any;
  datos1: any;
  data: any;
  cedula: 0;

  constructor(
    private rest: RestService,
    private route: ActivatedRoute,
    private router: Router,
    public toastsService: ToastsManager,
    vcr: ViewContainerRef,
    private userToken: AuthService
  ) {
    this.toastsService.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.access();
  }

  resetear() {
    this.user = this.user1;
  }

  reset() {
    this.usuarios.usuCc = "";
  }

  buscar() {
    this.rest.findDataBanner(this.usuarios.usuCc).subscribe(
      data => {
        if (data === null) {
          this.resetear();
          this.toastsService.error("El usuario no existe!");
          this.guardar = false;
          this.reset();
          console.log("No existe");
        } else {
          this.user = data;
          this.guardar = true;
          this.toastsService.success("Usuario encontrado");
          this.reset();
          console.log(this.user);
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  confirmar() {
    this.rest.addData(this.user, "addusu").subscribe(
      data => {
        if (data.message) {
          this.toastsService.error(data.message, "Aviso !", this.options);
          this.resetear();
          this.guardar = false;
        } else {
          this.reset();
          this.toastsService.success("Usuario agregado correctamente!");
          this.resetear();
          this.guardar = false;
        }
      },
      error => {
        console.log("error al guardar", error);
      }
    );
  }

  access() {
    this.userPass = this.userToken.getUserToken();
    this.rest.findDataUser(this.userPass.sub).subscribe(
      data => {
        this.opcion = data.opciones.filter(item => item.opcion == "USUARIOS");
        if (this.opcion.length == 0 || this.opcion == undefined) {
          this.router.navigateByUrl("/dashboard");
          // this.route.navigate(['/dashboard']);
        } else {
          this.guardar = false;
          this.crear = this.opcion.map(x => x.crear);
          this.crear = this.crear.find(x => x == 1);
        }
      },
      error => {
        console.log(error);
      }
    );
  }
}
