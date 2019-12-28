import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AdminLayoutRoutes } from "../../layouts/admin-layout/admin-layout.routing";
import { MaterialModule } from "app/module/material.module";
import { AdmestudiantesComponent } from 'app/components/admestudiantes/admestudiantes.component';
@NgModule({
    imports: [
      CommonModule,
      RouterModule.forChild(AdminLayoutRoutes),
      FormsModule,
      ReactiveFormsModule,
      MaterialModule
    ],
    declarations: [AdmestudiantesComponent]
  })

// tslint:disable-next-line: class-name
export class admestudiantesModule {

}