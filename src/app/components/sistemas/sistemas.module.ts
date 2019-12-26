import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AdminLayoutRoutes } from "../../layouts/admin-layout/admin-layout.routing";
import { MaterialModule } from "app/module/material.module";
import { SistemasComponent } from "app/components/sistemas/sistemas.component";
import { AddsisComponent } from "app/components/sistemas/addsis/addsis.component";
import { EditsisComponent } from "app/components/sistemas/editsis/editsis.component";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  declarations: [SistemasComponent, AddsisComponent, EditsisComponent],
  entryComponents: [AddsisComponent, EditsisComponent]
})
export class SistemasModule {}
