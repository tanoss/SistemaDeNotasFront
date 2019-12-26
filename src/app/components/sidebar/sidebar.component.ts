import { Component, OnInit } from "@angular/core";
import { RestService } from "app/service/rest.service";
import { AuthService } from "app/service/auth.service";

declare const $: any;

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [

  { path: '/sistemas', title: 'SISTEMAS', icon: 'apps', class: 'nav-pills-info' },
  { path: '/perfiles', title: 'PERFILES', icon: 'format_list_bulleted', class: '' },
  { path: '/opciones', title: 'OPCIONES', icon: 'toc', class: '' },
  { path: '/#', title: '___________________________', icon: '', class: '' },
  { path: '/opcion_perfil', title: 'ASIGNACION OPCIONES', icon: 'playlist_add_check', class: '' },
  { path: '/usuario_perfil', title: 'ASIGNACION PERFILES', icon: 'supervisor_account', class: '' },
  { path: '/usuariomostrar', title: 'OPCIONES ASIGNADAS', icon: 'check', class: '' },
  { path: '/profesores', title: 'PROFESORES', icon: 'check', class: '' }

];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems = [];
  userPass: any;

  constructor(private rest: RestService, private userToken: AuthService) { }

  ngOnInit() {
    //this.menuItems = ROUTES.filter(menuItem => menuItem);
    //this.menuPath();
    this.menuRole()
  }
  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  }

  menuPath() {
    this.userPass = this.userToken.getUserToken();
    this.rest.findDataUser(this.userPass.sub).subscribe(
      data => {
        this.menuItems = Array.from(
          new Set(data.opciones.map(x => x.opcion))
        ).map(datos => {
          return {
            opcion: data.opciones.find(s => s.opcion === datos).opcion,
            url: data.opciones.find(s => s.opcion === datos).url,
            icono: data.opciones.find(s => s.opcion === datos).icono,
            clase: data.opciones.find(s => s.opcion === datos).clase
          };
        });
      },
      error => {
        console.log(error);
      }
    );
  }

  menuRole() {
    this.userPass = this.userToken.getUserToken();
    this.rest.findRole(this.userPass.sub).subscribe(
      data => {
        if (data.idTipoUsuario === 1) {
          this.menuItems = [
            { path: '/sistemas', title: 'SISTEMAS', icon: 'apps', class: 'nav-pills-info' },
            { path: '/perfiles', title: 'PERFILES', icon: 'format_list_bulleted', class: '' },
            { path: '/opciones', title: 'OPCIONES', icon: 'toc', class: '' },
          ];

        } else if (data.idTipoUsuario === 2) {
          console.log('el rol es dos')
        } else if (data.idTipoUsuario === 3) {
          this.menuItems = [
            { path: '/opciones', title: 'OPCIONES', icon: 'toc', class: '' },
          ];
          console.log('el rol es tres')
        }
      }
    )
  }
}
