import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AdminLayoutRoutes } from "../../layouts/admin-layout/admin-layout.routing";
import { MaterialModule } from "app/module/material.module";
import { OpcionperfilComponent } from "app/components/opc-perfil/opcionperfil.component";
import { MostrarComponent } from "app/components/opc-perfil/mostrar/mostrar.component";
import { ListarComponent } from "app/components/opc-perfil/listar/listar.component";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  declarations: [OpcionperfilComponent, MostrarComponent, ListarComponent],
  entryComponents: [ListarComponent]
})
export class OpcionperfilModule {}
