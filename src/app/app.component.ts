import {Component, OnInit} from '@angular/core';
import { Auth } from './auth.service';
import {DataService} from "./data.service";
import {Justificacion, Empleado, Tipo, Moneda, Partida} from "./models";
import {isNullOrUndefined} from "util";
import {Observable} from "rxjs";
import {AppConfig} from "./app.config";
import {NgForm} from "@angular/forms";

@Component({
  //moduleId: module.id + "",
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements  OnInit {
  isDbConnected: boolean = false;

  empleado: Empleado;
  justificaciones: Justificacion[];
  selectedJustificacion: Justificacion;

  esAsistente: boolean = false;

  constructor(public auth: Auth, private dataService: DataService, public config:AppConfig) {
  }

  ngOnInit() {

    if(this.auth.nickName.length > 2) {
      this.loggedAs = this.auth.nickName;
      // sucede cuando se ingresa y ya esta logeado
      this.cargarEmpleadoLogeado();
    }

    this.auth.nickNameChange.subscribe(value => {
      this.loggedAs = this.auth.nickName;
      // sucede cuando cambia de NickName
      this.cargarEmpleadoLogeado();
    });

  }

  loggedAs: string;
  logearseAs() {
    this.cargarEmpleadoLogeado();
  }
  private cargarEmpleadoLogeado() {
    // busca empleado por cuenta.cimav
    this.dataService.getEmpleado(this.loggedAs).subscribe( (responseEmpleado:Empleado) => {
      if (responseEmpleado == null) {
        this.isDbConnected = false;
      } else {
        this.isDbConnected = true;
        // si el empleado existe, jala sus justificaciones
        this.empleado = responseEmpleado;
        this.loadJustificaciones(-1);
      }
    }, error => {
      console.log("DB NO CONECTADA " + this.auth.nickName + " :::  "+ error);
    }, () => {
      console.log("Get Single Empleado:" + this.auth.nickName);
    });
  }

  loadJustificaciones(idxSel: number): void {

    if (isNullOrUndefined(this.empleado)) {
      //BUG FIX la 1era vez no carga al empleado
      window.location.reload();
    } else {
      this.dataService.getJustificaciones(this.empleado.id).subscribe(
          (response: Justificacion[]) => {

            this.justificaciones = response;

            if (!isNullOrUndefined(this.justificaciones)) {
              this.esAsistente = this.justificaciones.filter(jus => jus.empleado.id !== this.empleado.id).length > 0;
              console.log('EsAsistente? ' + this.esAsistente + ' - ' + this.justificaciones.filter(jus => jus.id != this.empleado.id).length + ' - ' + this.empleado.id);
            }

            this.selectedJustificacion = null;
            if (idxSel == 1) {
              //this.selectedJustificacion = this.justificaciones[this.justificaciones.length - 1];
              this.selectedJustificacion = this.justificaciones[0];
            }

            /*
             if (!isNullOrUndefined(this.justificaciones) && this.justificaciones.length > 0 && idxSel >= 0) {
             switch (idxSel) {
             case (0):
             this.selectedJustificacion = this.justificaciones[0];
             break;
             case (1):
             this.selectedJustificacion = this.justificaciones[this.justificaciones.length - 1];
             break; //agregado
             default :
             this.selectedJustificacion = this.justificaciones[idxSel];
             }
             } else {
             this.selectedJustificacion = null;
             }
             */
          },
          error => console.log(error),
          () => console.log("Get Justificaciones:" + (this.justificaciones).length)
      );
    }
  }

  _idx: number;

  onClickJustificacion(justifi: Justificacion, idx: number): void {
    this.dataService.getJustificacion(justifi.id).subscribe(
        (response:Justificacion) => {
          this.selectedJustificacion = response;

          this._idx = this.justificaciones.findIndex(justi => justi.id == this.selectedJustificacion.id);
          this.justificaciones[this._idx] = this.selectedJustificacion;
        },
        error => console.log(error),
        () => console.log("Get Justificacion >> " + justifi.id )
    );
  }

  onAgregar(): void {
    var nuevaJustificacion: Justificacion = new Justificacion();
    nuevaJustificacion.empleado = this.empleado;
    nuevaJustificacion.elabora = this.empleado;
    nuevaJustificacion.autoriza = this.empleado;
    var tipo1:Tipo = new Tipo();
    tipo1.id = 1 ;
    nuevaJustificacion.tipo = tipo1;
    var mon1:Moneda = new Moneda();
    mon1.id = 1;
    nuevaJustificacion.moneda = mon1;
    var partida22104 =  new Partida();
    partida22104.id = 22104;
    nuevaJustificacion.partida = partida22104;
    nuevaJustificacion.autoriza_cargo = "RESPONSABLE DEL PROYECTO";
    this.dataService.Add(nuevaJustificacion).subscribe((responseCreada: Justificacion) => {
          this.loadJustificaciones(1);
        },
        error => console.log("Error agregando! " +error),
        () => console.log("Add Single Justificacion:" )
    );
  }

  onEliminarJustificacion():void {

    let idJ = this.selectedJustificacion.id;
    this.dataService.Delete(this.selectedJustificacion.id).subscribe(
        data => {
          this.selectedJustificacion = null;
          this.loadJustificaciones(0);
        },
        error => {
          console.error("Error deleting! " + idJ);
          return Observable.throw(error);
        });

  }

  onClonarJustificacion():void {
    var justificacionClonada: Justificacion = Object.assign({}, this.selectedJustificacion);
    justificacionClonada.id = null;

    this.dataService.Add(justificacionClonada).subscribe((responseClonada: Justificacion) => {
          this.loadJustificaciones(1);
        },
        error => console.log("Error clonando! " +error),
        () => console.log("Clone Single Justificacion:" )
    );
  }

  setStyleSelected(j: Justificacion){
    if(this.selectedJustificacion == null) {
      return false;
    }
    return j.id == this.selectedJustificacion.id;
  }

  logout() {
    this.selectedJustificacion = null;
    this.auth.logout();
  }

  clearSelected(event: any) {
    this.selectedJustificacion = null;
  }

}
