import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { RouterModule } from "@angular/router";
import { AppRoutingModule } from "./app.routing";
import { ComponentsModule } from "./components/components.module";
import { MaterialModule } from "./module/material.module";
import { AppComponent } from "./app.component";
import { RestService } from "./service/rest.service";
import { HttpClientModule } from "@angular/common/http";
import { LayoutModule } from "@angular/cdk/layout";
import { LoginComponent } from "./login/login.component";
import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { AuthGuard } from "./auth/auth.guard";
import { ToastModule } from "ng6-toastr";

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    LayoutModule,
    HttpModule,
    ComponentsModule,
    RouterModule,
    ToastModule.forRoot()
  ],
  declarations: [AppComponent, AdminLayoutComponent, LoginComponent],
  providers: [RestService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {}
