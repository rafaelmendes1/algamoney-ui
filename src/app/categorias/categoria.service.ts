import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor(private http: Http) { }

  categoriasUrl = 'http://localhost:8080/categorias';

  listarTodas(): Promise<any> {
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    return this.http.get(this.categoriasUrl, { headers })
    .toPromise()
    .then(response => {
      const categorias = response.json();
      return categorias;
    })
  }
}
