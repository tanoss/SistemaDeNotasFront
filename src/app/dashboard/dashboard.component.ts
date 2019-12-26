import { Component, OnInit, ViewContainerRef } from "@angular/core";
import { ToastsManager } from "ng6-toastr";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit {
  constructor(public toastService: ToastsManager, vcr: ViewContainerRef) {
    this.toastService.setRootViewContainerRef(vcr);
  }

  ngOnInit() {}
}
