import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AdminLayoutRoutes } from "../../layouts/admin-layout/admin-layout.routing";
import { MaterialModule } from "app/module/material.module";
import { PerfilesComponent } from "app/components/perfiles/perfiles.component";
import { AddperfComponent } from "app/components/perfiles/addperf/addperf.component";
import { DelperfComponent } from "app/components/perfiles/delperf/delperf.component";
import { EditperfComponent } from "app/components/perfiles/editperf/editperf.component";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  declarations: [
    PerfilesComponent,
    AddperfComponent,
    DelperfComponent,
    EditperfComponent
  ],
  entryComponents: [AddperfComponent, DelperfComponent, EditperfComponent]
})
export class PerfilesModule {}
