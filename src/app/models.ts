import {Timestamp} from "rxjs";
/**
 * Created by calderon on 10/26/16.
 */

export class Empleado {
  id: number;
  nombre: string;
  cuenta_cimav: string;
}


export class Tipo {
  id: number;
  code: string;
  fraccion: number;
  romano: string;
  texto: string;
}
/*
export const TIPOS: Tipo[] = [
  { id: 0, value: 'Accesorios y material de laboratorio' },
  { id: 1, value: 'Subcontratación por honorarios' },
  { id: 2, value: 'Mantenimiento de equipo' },
  { id: 3, value: 'Equipo especializado' }
];
*/
export class Moneda {
  id: number;
  code: string;
  descripcion: string;
  simbolo: string;
}
/*
export const MONEDAS: Moneda[] = [
  { id: 0, value: 'MXN Pesos mexicanos' },
  { id: 1, value: 'USD Dolar americano' },
  { id: 2, value: 'EUR Euro' },
  { id: 3, value: 'CHF Franco suizo' }
];
*/

export class Partida {
  id: number;
  nombre: string;
  texto: string;
}

export class Justificacion {
  id: number;

  tipo: Tipo;
  empleado: Empleado;
  autoriza: Empleado;
  elabora: Empleado;
  moneda: Moneda;
  partida: Partida;

  tipo_id: number;
  empleado_id: number;
  empleado_elaboro_id: number;
  empleado_autorizo_id: number;
  moneda_id: number;
  partida_id: number;

  identificador: string;

  requisicion: string;
  proyecto: string;
  proveedor_uno: string;
  proveedor_dos: string;
  proveedor_tres: string;
  bien_servicio: number;
  subtotal: number;
  iva: number;
  importe: number;
  condiciones_pago: string;
  datosbanco: string;
  razoncompra: string;
  terminos_entrega: string;
  plazo_entrega: string;
  es_unico: boolean;
  rfc: string;
  curp: string;
  telefono: string;
  email: string;
  fecha_inicio:  Date
  fecha_termino: Date;
  fecha_elaboracion: Date;
  descripcion: string;
  monto_dos: number;
  monto_tres: number;
  monto_uno: number;
  domicilio: string;
  plazo:number;
  num_dias_plazo: number;
  num_pagos: number;
  porcen_anticipo:number;
  autoriza_cargo: string;
  forma_pago: string;
  motivo_seleccion: string;
  es_nacional: boolean;

  constructor(){
    this.requisicion = '';
    this.proyecto = '';
    this.proveedor_uno = '';
    this.proveedor_dos = '';
    this.proveedor_tres = '';
    this.condiciones_pago = '';
    this.datosbanco = '';
    this.razoncompra = '';
    this.terminos_entrega = '';
    this.plazo_entrega = '';
    this.subtotal = 0.00;
    this.iva = 0.00;
    this.importe = 0.00;
    this.bien_servicio = 0;
    this.es_unico = false;
    this.rfc = '';
    this.curp = '';
    this.telefono = '';
    this.email = '';

    this.fecha_inicio =  new Date(); //.toLocaleString("en-US", {timeZone: "America/New_York"}) "es-MX" : "dd/MM/yyyy",
    this.fecha_termino = new Date();
    this.fecha_elaboracion = new Date();

    this.descripcion = '';
    this.monto_uno = 0.00;
    this.monto_dos = 0.00;
    this.monto_tres = 0.00;
    this.domicilio = '';
    this.plazo = 0;
    this.num_dias_plazo = 1;
    this.num_pagos = 1;
    this.porcen_anticipo = 0;
    this.autoriza_cargo = '';
    this.forma_pago = '';

    this.motivo_seleccion = '';

    this.es_nacional = true;
  }

}
