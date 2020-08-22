import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  pessoas = [
    {nome: 'Sanji', cidade: 'Salvador', estado: 'BA', status: 'Ativo'},
    {nome: 'Zoro', cidade: 'Uberlândia', estado: 'MG', status: 'Inativo'}
  ]

}
