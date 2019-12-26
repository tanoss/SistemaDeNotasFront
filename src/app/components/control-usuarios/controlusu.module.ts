import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlUsuariosComponent } from './control-usuarios.component';
import { EditcontComponent } from './editcont/editcont.component';
import { DeletecontComponent } from './deletecont/deletecont.component';
import { AdminLayoutRoutes } from 'app/layouts/admin-layout/admin-layout.routing';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'app/module/material.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  declarations: [ControlUsuariosComponent, EditcontComponent, DeletecontComponent],
  entryComponents: [EditcontComponent, DeletecontComponent]

})
export class ControlusuModule { }
