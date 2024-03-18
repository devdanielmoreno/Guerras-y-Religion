import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DatosService {
  private url = '../assets/guerras.json';

  constructor(private http: HttpClient) {}

getPaisesPorContinente(continente: string): Observable<any[]> {
  return this.http.get<any[]>(this.url).pipe(
    map((data: any) => {
      if (continente === 'Todos') {
        const todosPaises: any[] = [];
        data.continentes.forEach((cont: any) => {
          cont.paises.forEach((pais: any) => {
            todosPaises.push(pais);
            
          });
        });
        return todosPaises;
      } else {
        const continenteData = data.continentes.find((cont: any) => cont.nombre === continente);
        return continenteData ? continenteData.paises : [];
      }
    })
  );
}

getInformacionCompleta(): Observable<any[]> {
  return this.http.get<any[]>(this.url).pipe(
    map((data: any) => {
      const informacionCompleta: any[] = [];
      data.continentes.forEach((cont: any) => {
        cont.paises.forEach((pais: any) => {
          pais.guerras.forEach((guerra: any) => {
            informacionCompleta.push({
              continente: cont.nombre,
              pais: pais.nombre,
              guerra: guerra.nombre,
              year: guerra.year,
              muertes: guerra.muertes,
              religiones: guerra.religiones.join(', ')
            });
          });
        });
      });
      return informacionCompleta;
    })
  );
}
}
