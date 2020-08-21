import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  lancamentos = [
    { tipo: 'DESPESA', descricao: 'Compra de pão', dataVencimento: '30/06/2017', dataPagamento: null, valor: 4.55, pessoa: 'Padaria do José'},
    { tipo: 'RECEITA', descricao: 'Softwares', dataVencimento: '30/09/2017', dataPagamento: '30/03/2017', valor: 100000, pessoa: 'Time 7'}
  ]
  
}
