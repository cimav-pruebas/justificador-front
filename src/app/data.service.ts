/**
 * Created by calderon on 10/27/16.
 */
import { Injectable } from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import 'rxjs/add/operator/map'
import { Observable } from 'rxjs/Observable';
import {Empleado, Justificacion, Tipo, Moneda, Partida} from './models';
import {isNullOrUndefined} from "util";
import 'rxjs/add/operator/catch';
import {AppConfig} from "./app.config";


/*
class ProveedoresDatabase extends Dexie {
  proveedores: Dexie.Table<Proveedor,number>;
  constructor() {
    super("ProveedorDatabase");
    this.version(1).stores({
      proveedores: "++id,name"
    });
  }
}
*/

@Injectable()
export class DataService {

//  public static EMPLEADOS: Empleado[];
  public static TIPOS: Tipo[];
//  public static MONEDAS: Moneda[];

  private headers: Headers;

  //private proveedoresDatabase: ProveedoresDatabase;
  //private proveedoresTable: Dexie.Table<Proveedor, number>;

  constructor(private _http: Http, private config: AppConfig) {

    this.headers = new Headers();
    this.headers.append('Authorization', 'QURNSU5fUk9MRTphZG1pbg=='); // 'Q0hJSFVBSFVBLk5PUlRFOmFkbWlu'); //QURNSU5fUk9MRTphZG1pbg //QURNSU5fUk9MRTphZG1pbg==
    this.headers.append('Content-Type', 'application/json');
//    this.headers.append('Accept', 'application/json');

      /*
    this.proveedoresDb = new AngularIndexedDB('proveedoresDb', 1);
    this.proveedoresDb.openDatabase(1, (evt) => {
      let proveedoresStore = evt.currentTarget.result.createObjectStore('proveedoresStore', { keyPath: "id", autoIncrement: true });
      proveedoresStore.createIndex("proveedorIdx", "proveedor", { unique: true });
    });
    */

      /*
    this.proveedoresDatabase = new ProveedoresDatabase();
    this.proveedoresTable = this.proveedoresDatabase.table('proveedores');
    */

  }

  public getEmpleados = (): Observable<Empleado[]> => {

    var url = this.config.apiUrl + "personas.json";
    return this._http.get(url,  { headers: this.headers })
      .map((response: Response) => {
        return <Empleado[]>response.json();
      })
    .catch(this.handleError);
  }

  public getJustificaciones = (idEmpleado: number): Observable<Justificacion[]> => {
    var url = this.config.apiUrl + 'justificaciones/all_by_id_empleado/' + idEmpleado + ".json";
    console.log('getJustificaciones(', idEmpleado, ')');
    return this._http.get(url ,  { headers: this.headers })
      .map((response: Response) => {
        let justis = <Justificacion[]>response.json();
        return  justis; //<Justificacion[]>response.json();
      })
    .catch(this.handleError);

  }

  public getEmpleado = (cuentaCimav: string): Observable<Empleado> => {
    var url = this.config.apiUrl + "personas/cuenta/" + cuentaCimav + ".json";
    return this._http.get(url, { headers: this.headers })
      .map((response: Response) => {
        let emp = <Empleado>response.json();
        return emp;
      })
      .catch(this.handleError);
  }

  public getMonedas = (): Observable<Moneda[]> => {
    var url = this.config.apiUrl + 'monedas.json';
    return this._http.get(url,  { headers: this.headers })
        .map((response: Response) => {
          return <Moneda[]>response.json();
        })
    .catch(this.handleError);
  }

  public getTipos = (): Observable<Tipo[]> => {
      var url = this.config.apiUrl + 'tipos.json';
      return this._http.get(url,  { headers: this.headers })
        .map((response: Response) => {
          return <Tipo[]>response.json();
        })
        .catch(this.handleError);
  }

  public getPartidas = (): Observable<Partida[]> => {
    var url = this.config.apiUrl + 'partidas.json';
    return this._http.get(url,  { headers: this.headers })
        .map((response: Response) => {
          return <Partida[]>response.json();
        })
        .catch(this.handleError);
  }

  public getJustificacion = (id: number): Observable<Justificacion> => {
    var url = this.config.apiUrl + "justificaciones/" + id + ".json";
    return this._http.get(url,  { headers: this.headers })
      .map((response: Response) => {
        return <Justificacion>response.json();
      })
    .catch(this.handleError);
  }

  public Add = (justificacion: Justificacion): Observable<Justificacion> => {
    let url = this.config.apiUrl + "justificaciones.json";

      // TODO Cambiar Fix
      justificacion.tipo_id = isNullOrUndefined(justificacion.tipo) ? null : justificacion.tipo.id;
      justificacion.moneda_id = isNullOrUndefined(justificacion.moneda) ? null : justificacion.moneda.id;
      justificacion.empleado_id = isNullOrUndefined(justificacion.empleado) ? null : justificacion.empleado.id;
      justificacion.empleado_autorizo_id = isNullOrUndefined(justificacion.autoriza) ? null : justificacion.autoriza.id;
      justificacion.empleado_elaboro_id = isNullOrUndefined(justificacion.elabora) ? null : justificacion.elabora.id;
      justificacion.partida_id = isNullOrUndefined(justificacion.partida) ? null : justificacion.partida.id;

    let toAdd = JSON.stringify(justificacion, this.replacer);
    return this._http.post(url, toAdd, { headers: this.headers })
      .map((response: Response) => {
        return <Justificacion>response.json()
    })
    .catch(this.handleError);
  }

  public Delete = (id: number): Observable<Response> => {
    var url = this.config.apiUrl + "justificaciones/" + id + ".json";
    return this._http.delete(url, { headers: this.headers })
      .catch(this.handleError);
  }

  replacer(key,value) {
    if (key=="type") {
      return undefined;
    }
    return value;
  }

  public updateJustificacion = (id: number, justificacion: Justificacion): Observable<Response> => {
    //console.log("ToUpdate1>> " + this.constants.JUSTIFICACION_UPDATE_URL + id);
   // console.log("ToUpdate2>> " + JSON.stringify(justificacion));


    //return this._http.put(this.constants.JUSTIFICACION_UPDATE_URL + id, JSON.stringify(itemToUpdate), { headers: this.headers });
      //.map((response: Response) => <Justificacion>response.json());
      //.catch(this.handleError);

    if (isNullOrUndefined(justificacion.monto_uno) || isNaN(justificacion.monto_uno) ) {
      justificacion.monto_uno = 0.00;
    }
    if (isNullOrUndefined(justificacion.subtotal) || isNaN(justificacion.subtotal) ) {
      justificacion.subtotal = justificacion.monto_uno;
    }
    if (isNullOrUndefined(justificacion.iva) || isNaN(justificacion.iva) ) {
      justificacion.iva = 0.00;
    }
    if (isNullOrUndefined(justificacion.motivo_seleccion)) {
      justificacion.motivo_seleccion = "";
    }

    // TODO Cambiar Fix
    justificacion.tipo_id = isNullOrUndefined(justificacion.tipo) ? null : justificacion.tipo.id;
    justificacion.moneda_id = isNullOrUndefined(justificacion.moneda) ? null : justificacion.moneda.id;
    justificacion.empleado_id = isNullOrUndefined(justificacion.empleado) ? null : justificacion.empleado.id;
    justificacion.empleado_autorizo_id = isNullOrUndefined(justificacion.autoriza) ? null : justificacion.autoriza.id;
    justificacion.empleado_elaboro_id = isNullOrUndefined(justificacion.elabora) ? null : justificacion.elabora.id;
    justificacion.partida_id = isNullOrUndefined(justificacion.partida) ? null : justificacion.partida.id;

     var url = this.config.apiUrl + "justificaciones/" + id + ".json";
    return this._http.put(url, JSON.stringify(justificacion), {headers: this.headers})
        .map((response: Response) => {
            this.addProveedor(justificacion.proveedor_uno);
            this.addProveedor(justificacion.proveedor_dos);
            this.addProveedor(justificacion.proveedor_tres);
        }).catch(this.handleError);
  }

  /*
  public Delete = (id: number): Observable<Response> => {
    return this._http.delete(this.actionUrl + id)
      .catch(this.handleError);
  }
*/
  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }

  /*
  public getProveedores = (empleado_id: number): Observable<Proveedor[]> => {
    var url = this.config.apiUrl + 'proveedores/' + empleado_id + '.json';
    return this._http.get(url,  { headers: this.headers })
        .map((response: Response) => {
          return <Proveedor[]>response.json();
        })
        .catch(this.handleError);
  }
  */

  /*
    public getProveedores = (): Promise<Proveedor[]> => {
        return this.proveedoresTable.toArray();
    }
    */

  /*
  downloadPDF = (id: number): any => {
    var pdf_headers: Headers;
    pdf_headers = new Headers();
    pdf_headers.append('Content-Type', 'application/pdf');
    pdf_headers.append('Accept', 'application/pdf');
    pdf_headers.append('Content-Disposition', `attachment; filename=people-export.pdf`);
    pdf_headers.append('x-filename', 'x-name.pdf');
    var url = this.config.apiUrl + "justificaciones/" + id + ".pdf";
    return this._http.get(url, { headers: pdf_headers, responseType: ResponseContentType.Blob }).map(
      (response: Response) => {
        var pdfBlob = new Blob([response.blob()], { type: 'application/pdf'});
        return pdfBlob
      });
  };
  */

  private addProveedor(provee_to_add: string) {
    provee_to_add = provee_to_add.replace(/\s+/g, ' ').trim();

    /*
      this.proveedoresTable.where("name").equalsIgnoreCase(provee_to_add).count().then((cuantos:number)=>{
         if (cuantos <= 0) {
             var id = this.proveedoresTable.add(new Proveedor(provee_to_add));
             console.log('Se agregó: ', id, ' > ', provee_to_add);
         } else {
             console.log('Ya existe: ', provee_to_add);
         }
      });
    */

    /*
    this.proveedoresDb.getByIndex('proveedoresStore', 'proveedorIdx', provee_to_add).then((encontrado) => {
      if (isNullOrUndefined(encontrado)) {
        this.proveedoresDb.add('proveedoresStore', { proveedor: provee_to_add}).then(() => {
          console.log('agregado: ', provee_to_add);
        }, (error) => {
          console.log(error);
        });
      }
    }, (error) => {
      console.log(error);
    });
    */

  }


}

/*

 client?93b6:42 [WDS] Disconnected!
 log @ client?93b6:42
 close @ client?93b6:91
 sock.onclose @ socket.js:15
 EventTarget.dispatchEvent @ eventtarget.js:51
 (anonymous) @ main.js:356
 ZoneDelegate.invokeTask @ zone.js:265
 Zone.runTask @ zone.js:154
 ZoneTask.invoke @ zone.js:335
 data.args.(anonymous function) @ zone.js:970
 setTimeout (async)
 scheduleTask @ zone.js:973
 ZoneDelegate.scheduleTask @ zone.js:245
 Zone.scheduleMacroTask @ zone.js:171
 (anonymous) @ zone.js:991
 setTimeout @ VM843:3
 SockJS._close @ main.js:344
 SockJS._transportClose @ main.js:303
 g @ emitter.js:30
 EventEmitter.emit @ emitter.js:50
 WebSocketTransport.ws.onclose @ websocket.js:49
 wrapFn @ zone.js:698
 ZoneDelegate.invokeTask @ zone.js:265
 Zone.runTask @ zone.js:154
 ZoneTask.invoke @ zone.js:335
 zone.js:1382 GET http://localhost:4200/sockjs-node/info?t=1506632664517 net::ERR_CONNECTION_REFUSED

 */