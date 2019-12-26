import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";

const http = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
    Accept: "application/json"
  })
};

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(credetianl) {
    let pass = JSON.stringify(credetianl);
    return this.http.post("/sdn/login", pass, http).pipe(
      map(
        (res: any) => {
          return res;
        },
        error => {
          console.log("Error: ", error);
        }
      )
    );
  }

  removeToken() {
    localStorage.removeItem("token");
  }
  // setToken
  accessToken(token: string) {
    localStorage.setItem("token", token);
  }
  // getToken
  passToken() {
    return localStorage.getItem("token");
  }

  getUserToken() {
    var token = this.passToken();
    if (token) {
      var userToken = atob(token.split(".")[1]);
      return JSON.parse(userToken);
    } else {
      return null;
    }
  }

  setloggedIn() {
    var userLogged = this.getUserToken();
    if (userLogged) {
      return (
        userLogged.exp > Date.now() / 1000 &&
        userLogged.jti == "SegGestionUsuarios"
      );
    } else return false;
  }
}
