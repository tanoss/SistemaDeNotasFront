import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from "@angular/router";
import { AuthService } from "app/service/auth.service";

@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate {
  constructor(private apiSeg: AuthService, private route: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (!this.apiSeg.setloggedIn()) {
      this.route.navigateByUrl("/login");
      this.apiSeg.removeToken();
      return false;
    }
    return true;
  }
}
