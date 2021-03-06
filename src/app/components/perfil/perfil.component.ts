import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { AuthService } from 'app/service/auth.service';
import { RestService } from 'app/service/rest.service';
import { ToastsManager } from 'ng6-toastr';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormBuilder, FormGroup } from '@angular/forms';

export class InputEmail implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
  
 
   /// validatr input
   emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  matcher = new InputEmail();
  options: any = {
    toastLife: 3000,
    dismiss: "auto",
    showCloseButton: true
  };

  public mensaje: any ;
  user: any = {
    nombres: " ",
    apellidos: " ",
    cod_cc: " ",
    cod_id: " ",
    cod_pidm: " ",
    email: " ",
    perfil: ""
  };

  usuario: any = {
    idPersona: ' ',
    idTipoUsuario: ' ',
    cedula: ' ',
    nombre: ' ',
    apellido: ' ',
    correo: '',
    direccion: '',
    telefonoConvencional: '',
    telefonoCelular: '',
    referenciaPersNombre: '',
    referenciaPersTelf: '',
    clave: ''
  };

  perfil: any[] = [{}];

  constructor(
    private apiUserToken: AuthService,
    private apiService: RestService,
    public toastService: ToastsManager,
    vcr: ViewContainerRef,
  ) { 
    this.toastService.setRootViewContainerRef(vcr);

  }

  ngOnInit() {
    this.dataUser();
  }

  dataUser() {
    this.user = this.apiUserToken.getUserToken();
    this.apiService.findRole(this.user.sub).subscribe(
      data => {
        this.usuario = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  actualizaper() {
    this.apiService.updateData(this.usuario, 'editper').subscribe(
      data => {
        console.log('se actualizo');
        this.mensaje = data;
        this.toastService.success(
          data.message,
          'La información ',
          this.options);
        this.mensaje = data;
       
      },
      error => {
        console.log(error)
        // this.toastService.error(
        //   'No se a podido actualizar el perfil',
        //   'El Servidor no Responde',
        //   this.options)
      }
    )
  }
}
