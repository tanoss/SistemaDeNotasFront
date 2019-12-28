
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
import { ProfesoresModule} from 'app/components/profesores/profesores.module';
import { admestudiantesModule } from 'app/components/admestudiantes/admestudiantes.module';
import { admCursosModule} from 'app/components/adm-cursos/adm-cursos.module';
import { admEstudiantespModule} from 'app/components/adm-estudiantesp/adm-estudiantesp.module';
import { admCursospModule} from 'app/components/adm-cursosp/adm-cursosp.module';
import { admMateriaspModule} from 'app/components/adm-materiasp/adm-materiasp.module';
import { CalificacionesModule} from 'app/components/calificaciones/calificaciones.module'
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
    ProfesoresModule,
    admestudiantesModule,
    admCursosModule,
    admCursospModule,
    admEstudiantespModule,
    admMateriaspModule,
    CalificacionesModule
    
  ],
  declarations: [
    DashboardComponent,
    ConfiguracionesComponent,
    PerfilComponent
  ]
})

export class AdminLayoutModule { }
