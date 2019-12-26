import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AdminLayoutRoutes } from "../../layouts/admin-layout/admin-layout.routing";
import { MaterialModule } from "app/module/material.module";
import { ProfesoresComponent } from 'app/components/profesores/profesores.component';

@NgModule({
    imports: [
      CommonModule,
      RouterModule.forChild(AdminLayoutRoutes),
      FormsModule,
      ReactiveFormsModule,
      MaterialModule
    ],
    declarations: [ProfesoresComponent]
  })


export class ProfesoresModule {}