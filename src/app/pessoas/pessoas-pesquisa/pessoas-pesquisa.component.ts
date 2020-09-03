import { Component, OnInit } from '@angular/core';
import { PessoasFiltro, PessoaService} from '../pessoa.service'
import { LazyLoadEvent } from 'primeng/api';
@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent implements OnInit {

  totalRegistros = 0;
  pessoas = []
  filtro = new PessoasFiltro();

  constructor(private pessoaService: PessoaService) { }

  ngOnInit(): void {
  }


  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;
    this.pessoaService.pesquisar(this.filtro)
    .then(resultado => {
      this.totalRegistros = resultado.total;
      this.pessoas = resultado.pessoas;
    });
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }
}
