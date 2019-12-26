import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AdminLayoutRoutes } from "../../layouts/admin-layout/admin-layout.routing";
import { MaterialModule } from "app/module/material.module";
import { UsuPerfilComponent } from "app/components/usu-perfil/usu-perfil.component";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  declarations: [UsuPerfilComponent],
  entryComponents: []
})
export class UsuPerfilModule {}
