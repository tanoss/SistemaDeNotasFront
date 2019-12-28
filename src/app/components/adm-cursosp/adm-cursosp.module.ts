import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AdminLayoutRoutes } from "../../layouts/admin-layout/admin-layout.routing";
import { MaterialModule } from "app/module/material.module";
import { AdmCursospComponent } from 'app/components/adm-cursosp/adm-cursosp.component';
@NgModule({
    imports: [
      CommonModule,
      RouterModule.forChild(AdminLayoutRoutes),
      FormsModule,
      ReactiveFormsModule,
      MaterialModule
    ],
    declarations: [AdmCursospComponent],

  })
// tslint:disable-next-line: class-name
export class admCursospModule {

}