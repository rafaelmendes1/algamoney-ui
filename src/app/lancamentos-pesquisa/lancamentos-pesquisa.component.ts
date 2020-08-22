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
    { tipo: 'DESPESA', descricao: 'Compra de pão', dataVencimento: new Date(2017, 6, 30), dataPagamento: null, valor: 4.55, pessoa: 'Padaria do José'},
    { tipo: 'RECEITA', descricao: 'Softwares', dataVencimento: new Date(2018, 3 ,6), dataPagamento: new Date(2017, 12, 6), valor: 100000, pessoa: 'Time 7'}
  ]
  
}
