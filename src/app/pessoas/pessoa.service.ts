import { Injectable } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { Pessoa } from '../core/model';

export class PessoasFiltro {
  nome: string;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  constructor(private http: AuthHttp) { }
  
  pessoasUrl = 'http://localhost:8080/pessoas';

  pesquisar(filtro: PessoasFiltro): Promise<any> {
    const params = new URLSearchParams;

    params.set('size', filtro.itensPorPagina.toString())
    params.set('page', filtro.pagina.toString());

    if(filtro.nome) {
      params.set('nome', filtro.nome);
    }

    return this.http.get(this.pessoasUrl, { search: params })
    .toPromise()
    .then(response => {
      const responseJson = response.json();
      const pessoas = responseJson.content;

      const resultado = {
        pessoas: pessoas,
        total: responseJson.totalElements
      };

      return resultado;
    });
  }

  listarTodas(): Promise<any> {
    return this.http.get(this.pessoasUrl)
    .toPromise()
    .then(respose => respose.json().content);
  }

  adicionar(pessoa: Pessoa): Promise<Pessoa> {
    return this.http.post(this.pessoasUrl, JSON.stringify(pessoa))
    .toPromise()
    .then(response => response.json());
  }

  atualizar(pessoa: Pessoa): Promise<Pessoa> {
    return this.http.put(`${this.pessoasUrl}/${pessoa.id}`, JSON.stringify(pessoa))
    .toPromise()
    .then(response => response.json());
  }

  buscarPeloId(id: number): Promise<Pessoa> {
    return this.http.get(`${this.pessoasUrl}/${id}`)
    .toPromise()
    .then(response => response.json());
  }

  excluir(id: number): Promise<void> {
    return this.http.delete(`${this.pessoasUrl}/${id}`)
    .toPromise()
    .then(response => null)
  }

  mudarStatus(id: number, ativo: boolean): Promise<void> {
    return this.http.put(`${this.pessoasUrl}/${id}/ativo`, ativo)
    .toPromise()
    .then(response => null);
  }
}
