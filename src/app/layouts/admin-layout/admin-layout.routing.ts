import { Routes } from '@angular/router';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { SistemasComponent } from 'app/components/sistemas/sistemas.component';
import { PerfilesComponent } from 'app/components/perfiles/perfiles.component';
import { OpcionesComponent } from 'app/components/opciones/opciones.component';
import { UsuarioComponent } from 'app/components/usuario/usuario.component';
import { ConfiguracionesComponent } from 'app/components/configuraciones/configuraciones.component';
import { UsuPerfilComponent } from '../../components/usu-perfil/usu-perfil.component'
import { PerfilComponent } from 'app/components/perfil/perfil.component';
import { OpcionperfilComponent } from 'app/components/opc-perfil/opcionperfil.component';
import { MostrarComponent } from 'app/components/opc-perfil/mostrar/mostrar.component';
import { ControlUsuariosComponent } from 'app/components/control-usuarios/control-usuarios.component';
import { ProfesoresComponent } from 'app/components/profesores/profesores.component'
import { AdmestudiantesComponent } from 'app/components/admestudiantes/admestudiantes.component'
import { AdmCursosComponent } from 'app/components/adm-cursos/adm-cursos.component'
import {AdmEstudiantespComponent} from 'app/components/adm-estudiantesp/adm-estudiantesp.component';
import {AdmMateriaspComponent} from 'app/components/adm-materiasp/adm-materiasp.component';
import {AdmCursospComponent} from 'app/components/adm-cursosp/adm-cursosp.component';
import { CalificacionesComponent } from 'app/components/calificaciones/calificaciones.component';
export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'sistemas', component: SistemasComponent },
    { path: 'perfiles', component: PerfilesComponent },
    { path: 'opciones', component: OpcionesComponent },
    { path: 'usuario', component: UsuarioComponent },
    { path: 'configuraciones', component: ConfiguracionesComponent },
    { path: 'usuario_perfil', component: UsuPerfilComponent },
    { path: 'perfil', component: PerfilComponent },
    { path: 'opcion_perfil', component: OpcionperfilComponent },
    { path: 'usuariomostrar', component: MostrarComponent },
    { path: 'control_usuarios', component: ControlUsuariosComponent },
    { path: 'profesores', component: ProfesoresComponent },
    { path: 'admestudiantes' , component: AdmestudiantesComponent},
    { path: 'adm_cursos', component: AdmCursosComponent },
    { path: 'adm_estudiantesp', component: AdmEstudiantespComponent},
    { path: 'adm_materiasp', component: AdmMateriaspComponent},
    { path: 'adm_cursosp', component: AdmCursospComponent},
    { path: 'calificaciones', component: CalificacionesComponent}

];