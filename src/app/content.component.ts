/**
 * Created by calderon on 10/26/16.
 */

import {Component, Input, ViewChild, OnInit} from '@angular/core';
import {Justificacion, Empleado, Tipo, Moneda, Partida} from './models';
import {DataService} from "./data.service";
import {Response} from "@angular/http";
import {isNullOrUndefined} from "util";
import * as $ from 'jquery';
import {NgForm} from "@angular/forms";
import {AppConfig} from "./app.config";

@Component({
 selector: 'main-content',
  templateUrl: 'content.component.html',
  styleUrls: ['content.component.css']
})

export class ContentComponent implements OnInit {

  _justificacion: Justificacion;
  empleados: Empleado[] =[];
  tipos: Tipo[] = [];
  monedas: Moneda[] = [];
  partidas: Partida[] = [];

  show: boolean = false;

  @ViewChild('justificacionForm') justificacionForm: NgForm;

  //@Output() deleteJustificacionEvent = new EventEmitter();

  constructor(private dataService: DataService, private config: AppConfig) {
  }

  @Input() public set justificacion(justificacion: Justificacion) {
    this._justificacion = justificacion;

    if (this.justificacionForm) {
        this.forceValidation();
    }
  }

  public get justificacion(): Justificacion {
    return this._justificacion;
  }

  ngOnInit(): void {

    this.dataService.getEmpleados().subscribe(
      (response:Empleado[]) => {
          this.empleados = response;
      },
      error => console.log(error),
      () => console.log("Get Empleados:" + (this.empleados).length)
    );

    this.dataService.getTipos().subscribe(
        (response: Tipo[]) => {
            this.tipos = response;
        },
        error => console.log(error),
        () => console.log("Get Tipos:" + (this.tipos).length)
    );

    this.dataService.getMonedas().subscribe(
        (response:Moneda[]) => {
          this.monedas = response;
        },
        error => console.log(error),
        () => console.log("Get Monedas:" + (this.monedas).length)
    );

    this.dataService.getPartidas().subscribe(
        (response:Partida[]) => {
          this.partidas = response;
        },
        error => console.log(error),
        () => console.log("Get Partidas:" + (this.partidas).length)
    );

  }

  setEsUnico(justi:Justificacion) {

  }

  selectedTipoChange(event) {

//      if (isNullOrUndefined(event)) return;

      this._justificacion.tipo = event; // se requiere; de lo contrario solo cambia el value pero no el Id

//     this._justificacion.tipo_id = isNullOrUndefined(this._justificacion.tipo) ? null :  this._justificacion.tipo.id;

      if (!isNullOrUndefined(event)) {
          // OJO: revisar si provoca Bug
          /*
          let that =  this;
          setTimeout(function() {
              if (event.fraccion == 14 ) {
                  that._justificacion.es_unico = false;
              } else if (event.fraccion == 1) {
                  that._justificacion.es_unico = true;
              }
          }, 50);
          */
      }

      if (false && this._justificacion.tipo.id == 2) {

//      this._justificacion.esUnico = false;  // Super Bug::: TODO BUG si lo activo, lanza Bug
//      $('#toastHonorariosNoUnicos').trigger('open');



      //this.$.toast.open();
//        $('#file-upload').trigger('click');
    }

  }

  selectedMonedaChange(event) {
    this._justificacion.moneda = event;
    /*
     if (this._justificacion) {
     this._justificacion.idMoneda = this.moneda.id;
     }
     */
  }
  selectedPartidaChange(event) {
    this._justificacion.partida = event;
  }
  selectedElaboraChange(event) {
    this._justificacion.elabora = event;
  }

  selectedAutorizaChange(event) {
    this._justificacion.autoriza = event;
  }

  selectedBienOServicioChange(event) {
    this._justificacion.bien_servicio = event.target.value;
  }

  selectedPlazoChange(event) {
    this._justificacion.plazo = event.target.value;
  }
  setPlazo(plazoSel: number) {
    return 'plazo' + plazoSel;
  }

    selectedProv1FuenteChange(event) {
        this._justificacion.prov1_fuente = event.target.value;
    }
    setProv1Fuente(fuenteSel: number) {
        return 'prov1_fuente' + fuenteSel;
    }
    selectedProv2FuenteChange(event) {
        this._justificacion.prov2_fuente = event.target.value;
    }
    setProv2Fuente(fuenteSel: number) {
        return 'prov2_fuente' + fuenteSel;
    }
    selectedProv3FuenteChange(event) {
        this._justificacion.prov3_fuente = event.target.value;
    }
    setProv3Fuente(fuenteSel: number) {
        return 'prov3_fuente' + fuenteSel;
    }

    setDecision(decisionSel: number) {
        return 'decision' + decisionSel;
    }
    selectedDecisionChange(event) {
        this._justificacion.eficiencia_eficacia = event.target.value;
        console.log('Dec> ', this._justificacion.eficiencia_eficacia);
    }

  forceValidation() {
      // requerido pq Angular2-Polymer todavía no estan al 100%
      for (let inner in this.justificacionForm.controls) {
          /*
           this.justificacionForm.form.get(inner).updateValueAndValidity();
           this.justificacionForm.form.get(inner).markAsTouched();
           this.justificacionForm.form.get(inner).markAsDirty();
           */
          $("[name='" + inner + "']").trigger('validate');
      }
  }

  onSubmit(updated:any) {

      if ( isNullOrUndefined(this._justificacion.tipo)) {
          $('#errorUpdateTxt').text('Debe capturar Tipo');
          $('#errorUpdateDlg').trigger('open');
      } else if (isNullOrUndefined(this._justificacion.elabora)) {
          $('#errorUpdateTxt').text('Debe capturar Solicitante');
          $('#errorUpdateDlg').trigger('open');
      } else if (isNullOrUndefined(this._justificacion.autoriza)) {
          $('#errorUpdateTxt').text('Debe capturar quien Autoriza');
          $('#errorUpdateDlg').trigger('open');
      } else if (isNullOrUndefined(this._justificacion.moneda)) {
          $('#errorUpdateTxt').text('Debe capturar la moneda');
          $('#errorUpdateDlg').trigger('open');
      } else if (isNullOrUndefined(this._justificacion.partida)) {
          $('#errorUpdateTxt').text('Debe capturar la partida');
          $('#errorUpdateDlg').trigger('open');
      } else this.dataService.updateJustificacion(this._justificacion.id, this._justificacion).subscribe((response:Response) => {
          $('#toastUpdated').trigger('open');
      }, error => {
          $('#toastUpdatedError').trigger('show');
          console.log(error);},
      () => {
        console.log("Update Single Justificacion:" + this._justificacion.requisicion);
        this.forceValidation();
      }
    );

  }

  onMontoUno() {
    this._justificacion.monto_uno = Number(this._justificacion.monto_uno);
    this._justificacion.subtotal = this._justificacion.monto_uno;
    this.sumarTotal();
  }

    onMonto() {
        this._justificacion.monto_dos = Number(this._justificacion.monto_dos);
        this._justificacion.monto_tres = Number(this._justificacion.monto_tres);
    }

  sumarTotal() {
    this._justificacion.monto_uno = Number(this._justificacion.monto_uno);
    this._justificacion.iva = Number(this._justificacion.iva);

    this._justificacion.subtotal = this._justificacion.monto_uno;

    this._justificacion.importe = this._justificacion.subtotal + this._justificacion.iva;
  }

    anticipo(){
        this._justificacion.porcen_anticipo = Number(this._justificacion.porcen_anticipo);
    }

    parcialidades() {
        this._justificacion.num_pagos = Number(this._justificacion.num_pagos);
        if (this._justificacion.num_pagos <= 0) {
            this._justificacion.num_pagos = 1;
        }
    }

  //@Input() public
  /*
  pdficar() {
    this.dataService.updateJustificacion(this._justificacion.id, this._justificacion).subscribe(
      (response:Response) => {
        console.log("msg> " + response)
      },
      error => console.log(error),
      () => {
        let pdfname = this.justificacion.empleado.cuenta_cimav + this.justificacion.requisicion;
        this.dataService.downloadPDF(this._justificacion.id).subscribe(
          (response) => {
            console.log('>>>> ' + getFileNameFromHeader(response))
            var fileURL = URL.createObjectURL(response);
            window.open(fileURL);
          } ,
          error => console.log(error + " <<< " + this._justificacion.id),
          () => console.log("Get PDF:" + this._justificacion.id)
        );
        console.log("Update Single Justificacion:" + this._justificacion.requisicion);
      }
    );
  }
  */

  pdf_mercado() {
    this.dataService.updateJustificacion(this._justificacion.id, this._justificacion).subscribe(
        (response:Response) => {
          console.log("pdficar> " + response)
        },
        error => console.log(error),
        () => {
          var newTab = window.open(this.config.apiUrl + 'mercado/' + this._justificacion.id + '.pdf');
        }
    );
  }

    pdficar() {
        this.dataService.updateJustificacion(this._justificacion.id, this._justificacion).subscribe(
            (response:Response) => {
                console.log("pdficar> " + response)
            },
            error => console.log(error),
            () => {
                var newTab = window.open(this.config.apiUrl + 'justificaciones/' + this._justificacion.id + '.pdf');
            }
        );
    }

  cotizar(num_provee: number) {
    this.dataService.updateJustificacion(this._justificacion.id, this._justificacion).subscribe(
        (response:Response) => {
          console.log("cotizar> " + response)
        },
        error => console.log(error),
        () => {
          var newTab = window.open(this.config.apiUrl + 'cotizaciones/' + this._justificacion.id + '/' + num_provee + '.pdf');
        }
    );
  }
  sincronizar() {
    this.dataService.getJustificacion(this._justificacion.id).subscribe(
        (response:Justificacion) => {
          this._justificacion.requisicion = response.requisicion;
          this.justificacion = response;
        },
        error => console.log(error),
        () => {
          console.log("Syncronize Single Justificacion:" + this._justificacion.requisicion);
        }
    );
  }

  getUrlPDF() {
    return this.config.apiUrl + 'justificaciones/' + this._justificacion.id + '.pdf';
  }

  getCodeNotEmpty(tipo: Tipo):String   {
      //                             [value]="_justificacion.tipo !== null ? '' : _justificacion.tipo.code"

      const result = isNullOrUndefined(tipo) ? '' : tipo.code;
    return result;
  };

  getMonedaNotEmpty(moneda: Moneda):String   {
    let result = isNullOrUndefined(moneda) ? '' : moneda.code;
    return result;
  };


  getNameNotEmpty(empleado: Empleado):String   {
    let result = isNullOrUndefined(empleado) ? '' : empleado.nombre;
    return result;
  };
  getPartidaNotEmpty(partida: Partida):String   {
    let result = isNullOrUndefined(partida) ? '' : partida.nombre;
    return result;
  };

  /*
  eliminarCall() {
      this.deleteJustificacionEvent.emit();
  }
  */

  onFocus(event) {
    if (event.target.inputElement) {
      event.target.inputElement.select();
    }
  }

}

