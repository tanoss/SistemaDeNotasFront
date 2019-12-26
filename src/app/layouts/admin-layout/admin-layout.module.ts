
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdminLayoutRoutes } from './admin-layout.routing';
import { MaterialModule } from 'app/module/material.module';
import { UsuarioModule } from 'app/components/usuario/usuario.module';
import { OpcionesModule } from 'app/components/opciones/opciones.module';
import { PerfilesModule } from 'app/components/perfiles/perfiles.module';
import { SistemasModule } from 'app/components/sistemas/sistemas.module';
import { UsuPerfilModule } from 'app/components/usu-perfil/usu-perfil.module';
import { DashboardComponent } from 'app/dashboard/dashboard.component';
import { ConfiguracionesComponent } from 'app/components/configuraciones/configuraciones.component';
import { PerfilComponent } from 'app/components/perfil/perfil.component';
import { OpcionperfilModule } from 'app/components/opc-perfil/opcionperfil.module';
import { ControlusuModule } from 'app/components/control-usuarios/controlusu.module';
import { ProfesoresModule} from 'app/components/profesores/profesores.module'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    UsuarioModule,
    OpcionesModule,
    PerfilesModule,
    SistemasModule,
    UsuPerfilModule,
    OpcionperfilModule,
    ControlusuModule,
    ProfesoresModule
  ],
  declarations: [
    DashboardComponent,
    ConfiguracionesComponent,
    PerfilComponent
  ]
})

export class AdminLayoutModule { }
