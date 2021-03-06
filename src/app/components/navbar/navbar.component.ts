import { Component, OnInit, ElementRef, ViewContainerRef } from "@angular/core";
import { Location } from "@angular/common";
import { Router } from "@angular/router";
import { ToastsManager } from "ng6-toastr";
import { AuthService } from "app/service/auth.service";
import { RestService } from "app/service/rest.service";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"]
})
export class NavbarComponent implements OnInit {
  userPass: any;
  private listTitles: any[];
  location: Location;
  mobile_menu_visible: any = 0;
  private toggleButton: any;
  private sidebarVisible: boolean;

  usuario: any = {
    nombre: ' ',
    apellido: ' ',
  };

  constructor(
    location: Location,
    private element: ElementRef,
    public toastService: ToastsManager,
    vcr: ViewContainerRef,
    private router: Router,
    private userToken: AuthService,
    private rest: RestService
  ) {
    this.location = location;
    this.sidebarVisible = false;
    this.toastService.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.user();
    const navbar: HTMLElement = this.element.nativeElement;
    this.toggleButton = navbar.getElementsByClassName("navbar-toggler")[0];
    this.router.events.subscribe(event => {
      this.sidebarClose();
      var $layer: any = document.getElementsByClassName("close-layer")[0];
      if ($layer) {
        $layer.remove();
        this.mobile_menu_visible = 0;
      }
    });
  }

  sidebarOpen() {
    const toggleButton = this.toggleButton;
    const body = document.getElementsByTagName("body")[0];
    setTimeout(function() {
      toggleButton.classList.add("toggled");
    }, 500);

    body.classList.add("nav-open");

    this.sidebarVisible = true;
  }
  sidebarClose() {
    const body = document.getElementsByTagName("body")[0];
    this.toggleButton.classList.remove("toggled");
    this.sidebarVisible = false;
    body.classList.remove("nav-open");
  }
  sidebarToggle() {
    // const toggleButton = this.toggleButton;
    // const body = document.getElementsByTagName('body')[0];
    var $toggle = document.getElementsByClassName("navbar-toggler")[0];

    if (this.sidebarVisible === false) {
      this.sidebarOpen();
    } else {
      this.sidebarClose();
    }
    const body = document.getElementsByTagName("body")[0];

    if (this.mobile_menu_visible == 1) {
      // $('html').removeClass('nav-open');
      body.classList.remove("nav-open");
      if ($layer) {
        $layer.remove();
      }
      setTimeout(function() {
        $toggle.classList.remove("toggled");
      }, 400);

      this.mobile_menu_visible = 0;
    } else {
      setTimeout(function() {
        $toggle.classList.add("toggled");
      }, 430);

      var $layer = document.createElement("div");
      $layer.setAttribute("class", "close-layer");

      if (body.querySelectorAll(".main-panel")) {
        document.getElementsByClassName("main-panel")[0].appendChild($layer);
      } else if (body.classList.contains("off-canvas-sidebar")) {
        document
          .getElementsByClassName("wrapper-full-page")[0]
          .appendChild($layer);
      }

      setTimeout(function() {
        $layer.classList.add("visible");
      }, 100);

      $layer.onclick = function() {
        //asign a function
        body.classList.remove("nav-open");
        this.mobile_menu_visible = 0;
        $layer.classList.remove("visible");
        setTimeout(function() {
          $layer.remove();
          $toggle.classList.remove("toggled");
        }, 400);
      }.bind(this);

      body.classList.add("nav-open");
      this.mobile_menu_visible = 1;
    }
  }

  getTitle() {
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if (titlee.charAt(0) === "#") {
      titlee = titlee;
    }
    titlee = titlee.split("/").pop();

    for (var item = 0; item < this.listTitles.length; item++) {
      if (this.listTitles[item].path === titlee) {
        return this.listTitles[item].title;
      }
    }
    return "INICIO";
  }

  logout() {
    // location.replace('login');
    this.toastService.success("", "Cerrando Sesión !!");
    setTimeout(() => {
      localStorage.removeItem("token");
      this.router.navigate(["/login"]);
    }, 1000);
  }

  user() {
    this.userPass = this.userToken.getUserToken();
    this.rest.findRole(this.userPass.sub).subscribe(
      data => {
        this.usuario.nombre = data.nombre;
        this.usuario.apellido = data.apellido;
      }
    )
  }
  
}
