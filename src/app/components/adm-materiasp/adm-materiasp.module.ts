import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AdminLayoutRoutes } from "../../layouts/admin-layout/admin-layout.routing";
import { MaterialModule } from "app/module/material.module";
import { AdmMateriaspComponent } from 'app/components/adm-materiasp/adm-materiasp.component';
@NgModule({
    imports: [
      CommonModule,
      RouterModule.forChild(AdminLayoutRoutes),
      FormsModule,
      ReactiveFormsModule,
      MaterialModule
    ],
    declarations: [AdmMateriaspComponent],

  })
// tslint:disable-next-line: class-name
export class admMateriaspModule {

}