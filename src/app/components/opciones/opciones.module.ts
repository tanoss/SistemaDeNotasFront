import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "app/module/material.module";
import { OpcionesComponent } from "app/components/opciones/opciones.component";
import { AddopcComponent } from "app/components/opciones/addopc/addopc.component";
import { EditopcComponent } from "app/components/opciones/editopc/editopc.component";
import { DelopcComponent } from "app/components/opciones/delopc/delopc.component";
import { AdminLayoutRoutes } from "app/layouts/admin-layout/admin-layout.routing";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  declarations: [
    OpcionesComponent,
    AddopcComponent,
    EditopcComponent,
    DelopcComponent
  ],
  entryComponents: [EditopcComponent, AddopcComponent, DelopcComponent]
})
export class OpcionesModule {}
