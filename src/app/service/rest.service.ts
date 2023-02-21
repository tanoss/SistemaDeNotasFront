import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "environments/environment";

const http = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
    Accept: "application/json"
  })
};

@Injectable({
  providedIn: "root"
})
export class RestService {

   ult = environment.urlapi;
  constructor(private http: HttpClient) {}

  // Funcion unica de consulta----------------------------------------
  getData(seg: String): Observable<any> {
    return this.http.get<any>(this.ult+'/sdn/' + seg).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  // Funcion unica para guargar---------------------------------------
  addData(sistema, add: String) {
    let sistemaAdd = JSON.stringify(sistema);
    return this.http.post(this.ult+"/sdn/" + add, sistemaAdd, http).pipe(
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
  // Funcion unica para actualizar-----------------------------------
  updateData(sistema, upd: String) {
    let sistemaUpdate = JSON.stringify(sistema);
    return this.http.put(this.ult+"/sdn/" + upd, sistemaUpdate, http).pipe(
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
  // Funcion unica para actualizar-----------------------------------
  deleteData(id: number, upd: String) {
    return this.http.delete(this.ult+"/adm/" + upd + "/" + id, http).pipe(
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

  findData(id: number, upd: String) {
    return this.http.get(this.ult+'/adm/' + upd + '/' + id, http).pipe(
      map(
        (res: any) => {
          return res;
        },
        error => {
          console.log('Error: ', error);
        }
      )
    );
  }

  findDataUser(user: String) {
    return this.http.get(this.ult+'/adm/id/' + user + '/1', http).pipe(
      map(
        (res: any) => {
          return res;
        },
        error => {
          console.log('Error: ', error);
        }
      )
    );
  }

  findRole(user: String) {
    return this.http.get(this.ult+'/sdn/role/' + user , http).pipe(
      map(
        (res: any) => {
          return res;
        },
        error => {
          console.log('Error: ', error);
        }
      )
    );
  }

  findDataBanner(id: string) {
    return this.http.get(this.ult+'/banner/' + id, http).pipe(
      map(
        (res: any) => {
          return res;
        },
        error => {
          console.log('Error: ', error);
        }
      )
    );
  }
}
