import { Injectable } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import { Lancamento } from '../core/model';
import * as moment from 'moment'
import { AuthHttp } from 'angular2-jwt';


export class LancamentoFiltro {
  descricao: string;
  dataVencimentoInicio: Date;
  dataVencimentoFim: Date;
  pagina = 0; 
  itensPorPagina = 5;
}

@Injectable({
  providedIn: 'root'
})
export class LancamentoService {

  lancamentosUrl = 'http://localhost:8080/lancamentos';

  constructor(private http: AuthHttp) { }

  pesquisar(filtro: LancamentoFiltro): Promise<any> {
    const params = new URLSearchParams;

    params.set('page', filtro.pagina.toString());
    params.set('size', filtro.itensPorPagina.toString());

    if (filtro.descricao) {
      params.set('descricao', filtro.descricao);
    }
    
    if (filtro.dataVencimentoInicio) {
      console.log(filtro.dataVencimentoInicio)
      params.set('dataVencimentoDe',  moment(filtro.dataVencimentoInicio).format('YYYY-MM-DD'));
      console.log(filtro.dataVencimentoInicio)
    }

    if (filtro.dataVencimentoFim) {
      console.log(filtro.dataVencimentoFim)
      params.set('dataVencimentoAte', moment(filtro.dataVencimentoFim).format('YYYY-MM-DD'));
      console.log(filtro.dataVencimentoFim)
    }

    return this.http.get(`${this.lancamentosUrl}?resumo`, { search: params })
    .toPromise()
    .then(response => {
      const responseJson = response.json(); 
      const lancamentos = responseJson.content;

      const resultado = {
        lancamentos: lancamentos,
        total: responseJson.totalElements
      };

      return resultado;
    });
  }

  adicionar(lancamento: Lancamento): Promise<Lancamento> {   
    console.log(lancamento);
    return this.http.post(this.lancamentosUrl, JSON.stringify(lancamento))
    .toPromise()
    .then(response => response.json());
  }

  atualizar(lancamento: Lancamento): Promise<Lancamento> {
    console.log(lancamento);

    return this.http.put(`${this.lancamentosUrl}/${lancamento.id}`, JSON.stringify(lancamento))
    .toPromise()
    .then(response => {
      const lancamento = response.json() as Lancamento;
      this.converterStringsParaDatas([lancamento]);

      return lancamento;
    });
  }

  excluir(id: number): Promise<void> {
    return this.http.delete(`${this.lancamentosUrl}/${id}`)
    .toPromise()
    .then(() => null);
  }

  buscarPeloId(id: number): Promise<Lancamento> {
    return this.http.get(`${this.lancamentosUrl}/${id}`)
    .toPromise()
    .then(response => {
      const lancamento = response.json() as Lancamento;
      this.converterStringsParaDatas([lancamento]);

      return lancamento;
    });
  }

  private converterStringsParaDatas(lancamentos: Lancamento[]) {
    for(const lancamento of lancamentos) {
      lancamento.dataVencimento = moment(lancamento.dataVencimento, 'YYYY-MM-DD').toDate();

      if(lancamento.dataPagamento) {
        lancamento.dataPagamento = moment(lancamento.dataPagamento,  'YYYY-MM-DD').toDate();
      }
    }
  }

}
