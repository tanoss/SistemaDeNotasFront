import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { RestService } from '../../../service/rest.service';
@Component({
  selector: 'app-delsis',
  templateUrl: './delsis.component.html',
  styleUrls: ['./delsis.component.scss']
})
export class DelsisComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DelsisComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private Service: RestService
  ) { }

  ngOnInit() {
    console.log("La data que viene al Borrar es:", this.data);
  }

  // Método para Borrar un Centro de Gestión
  borrarSistema(id: number){
    this.dialogRef.close("Centro de Gestión Borrado!");
    //this.Service.deleteSystems( this.data.id ).subscribe( () => {
      // this.cargarCentros();
      console.log(this.data.id);
    //});
    // this.onCloseConfirm();
  }

  // Cierre Modal
  cerrarModal(){
    this.dialogRef.close('Cierre de Modal Borrar!');
  }


}

