import { Component, OnInit, ViewChild } from '@angular/core';
import { PessoasFiltro, PessoaService} from '../pessoa.service'
import { LazyLoadEvent, MessageService, ConfirmationService } from 'primeng/api';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent implements OnInit {

  totalRegistros = 0;
  pessoas = []
  filtro = new PessoasFiltro();
  @ViewChild('tabela') grid;

  constructor(private pessoaService: PessoaService,
    private messageService: MessageService,
    private confirmacaoService: ConfirmationService,
    private errorHandler: ErrorHandlerService) { }

  ngOnInit(): void {
  }


  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;
    this.pessoaService.pesquisar(this.filtro)
    .then(resultado => {
      this.totalRegistros = resultado.total;
      this.pessoas = resultado.pessoas;
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  confirmarExclusao(pessoa: any) {
    this.confirmacaoService.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(pessoa);
      }
    });
    
  }

  excluir(pessoa: any) {
    this.pessoaService.excluir(pessoa.id)
    .then(() => {
      this.grid.first = 0;
      this.pesquisar();
      this.messageService.add({key: 'aviso', severity: 'success', summary: 'Pessoa excluída com sucesso!'});
    })
    .catch(error => this.errorHandler.handle(error));
  }

  mudarStatus(pessoa: any) {
    
    if (pessoa.ativo) {
     pessoa.ativo = false;
    }else {
      pessoa.ativo = true;
    }

    this.pessoaService.mudarStatus(pessoa.id, pessoa.ativo)
    .then(() => {
      
      this.messageService.add({key: 'aviso', severity: 'success', summary: `Pessoa ${pessoa.ativo ? 'ativada' : 'desativada'} com sucesso!`});
    });
  }
}
