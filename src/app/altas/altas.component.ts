import { NgForOf } from '@angular/common';
import { i18nMetaToJSDoc } from '@angular/compiler/src/render3/view/i18n/meta';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';


export interface Persona {
  id: number,
  nombres: string,
  apellidos: string,
  edad: string,
  correo: string
}

@Component({
  selector: 'app-altas',
  templateUrl: './altas.component.html',
  styleUrls: ['./altas.component.css']
})


export class AltasComponent implements OnInit {

  Global_Id: number = 0;
  nombres: string = "";
  apellidos: string = "";
  edad: string = "";
  correo: string = "";
  registrado = false;

  personas: Persona[] = [];

  constructor() { }

  @Output() EnvioPadre = new EventEmitter<Persona[]>();
  ngOnInit(): void {
  }

  registrarUsuario() {

    var alerta = 0;

    //VALIDACION DE LOS DATOS
    if (this.nombres == "") {
      alert("Llena el  campo de nombres");
      alerta++;
  }
  if (this.apellidos == "") {
      alert("Llena el  campo de apellidos");
      alerta++;
  }
  if (this.edad == "") {
      alert("Llena el campo de Edad");
      alerta++;

  } else {
    var edad : number =+this.edad;
      if (edad % 1 != 0) {
          alert("Solo se aceptan numeros enteros");
          alerta++;
      }
  }

  if (this.correo == "") {
      alerta++;
      alert("Llena el  campo de correo");
  }
  else {
      var ExpresionRegular = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
      var isValid = ExpresionRegular.test(this.correo);
      if (isValid == false) {

          alert("El correo es invalido");
          alerta++;
      }
  }
  if (alerta > 0) {
    console.log("Campos no aceptados");
      return
  }
  console.log("CAMPOS VALIDADOS");
    //AUMENTO EL ID SI PASA LA VALIDACION DE DATOS
    this.Global_Id++;
    //CREO LA NUEVA PERSONA CON LOS CAMPOS DE ALTAS
    var NuevaPersona: Persona = {
      id: this.Global_Id,
      nombres: this.nombres,
      apellidos: this.apellidos,
      edad: this.edad,
      correo: this.correo
    }

    //AGREGO LA NUEVA PERSONA A LA LISTA
    this.personas.push(NuevaPersona);
    //ENVIO LA LISTA AL PADRE
    this.EnvioPadre.emit(this.personas);

   /* 
    for(var i = 0; i<this.personas.length;i++)
    {
      console.log(this.personas[i]);
    }*/

  }

}
