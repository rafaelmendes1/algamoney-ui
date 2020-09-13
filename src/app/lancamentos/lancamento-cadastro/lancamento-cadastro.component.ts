import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { CategoriaService } from '../../categorias/categoria.service';
import { PessoaService } from '../../pessoas/pessoa.service'
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { LancamentoService } from '../lancamento.service';
import { Lancamento } from '../../core/model';
import { MessageService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent implements OnInit {

  categorias = []
  pessoas = []
  lancamento = new Lancamento;

  tipos = [
    { label: 'Receita', value: 'RECEITA' },
    { label: 'Despesa', value: 'DESPESA' },
  ]

  constructor(private lancamentoService: LancamentoService,
    private categoriaService: CategoriaService,
    private pessoasService: PessoaService,
    private erroHandler: ErrorHandlerService,
    private messageService: MessageService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {

    const idLancamento = this.route.snapshot.params['id'];

    if(idLancamento) {
      this.carregarLancamento(idLancamento);
    }
    this.carregarCategorias();
    this.carregarPessoas();
  }

  get editando() {
    return Boolean(this.lancamento.id);
  }

  salvar(form: FormControl) {
    if(this.editando) {
      this.atualizarLancamento(form);
    }else {
      this.adicionarLancamento(form);
    }
  }

  adicionarLancamento(form: FormControl) {
    this.lancamentoService.adicionar(this.lancamento)
    .then(lancamentoAdicionado => {
      this.messageService.add({key: 'aviso', severity: 'success', summary: 'Lançamento adicionado com sucesso!'});
    })
    .catch(erro => this.erroHandler.handle(erro));
  }

  atualizarLancamento(form: FormControl) {
    this.lancamentoService.atualizar(this.lancamento)
    .then(lancamentoAtualizado => {
      this.lancamento = lancamentoAtualizado;
      this.messageService.add({key: 'aviso', severity: 'success', summary: 'Lançamento alterado com sucesso!'});
    })
    .catch(erro => this.erroHandler.handle(erro));
  }

  carregarLancamento(id: number) {
    this.lancamentoService.buscarPeloId(id)
    .then(lancamento => {
      this.lancamento = lancamento;
    })
    .catch(erro => this.erroHandler.handle(erro));
  } 

  carregarCategorias() {
    return this.categoriaService.listarTodas()
    .then(categorias => {
      this.categorias = categorias.map(c => ({ label: c.nome, value: c.id}));
    })
    .catch(erro => this.erroHandler.handle(erro));
  }

  carregarPessoas() {
    return this.pessoasService.listarTodas()
    .then(pessoas => {
      this.pessoas = pessoas.map(p => ({ label: p.nome, value: p.id}));
    })
    .catch(erro => this.erroHandler.handle(erro));
  }
}
