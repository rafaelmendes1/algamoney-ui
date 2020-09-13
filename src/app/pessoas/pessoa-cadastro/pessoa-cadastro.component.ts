import { Component, OnInit } from '@angular/core';
import { Pessoa } from 'src/app/core/model';
import { FormControl } from '@angular/forms';
import { PessoaService } from '../pessoa.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent implements OnInit {

  pessoa = new Pessoa();

  constructor(private pessoaService: PessoaService,
    private erroHandler: ErrorHandlerService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title) { }

  ngOnInit(): void {
    const idPessoa = this.route.snapshot.params['id'];

    this.title.setTitle('Nova Pessoa');

    if(idPessoa) {
      this.carregarPessoa(idPessoa);
    }

  }

  get editando() {
    return Boolean(this.pessoa.id);
  }

  carregarPessoa(id: number) {
    this.pessoaService.buscarPeloId(id)
    .then(pessoa => {
      this.pessoa = pessoa;

      this.atualizarTituloEdicao();
    }).catch(erro => this.erroHandler.handle(erro));
  }

  salvar(form: FormControl) {
    if(this.editando) {
      this.atualizarPessoa(form);
    }else {
      this.adicionandoPessoa(form);
    }
  }

  adicionandoPessoa(form: FormControl) {
    this.pessoa.ativo = true;
    this.pessoaService.adicionar(this.pessoa)
    .then(() => {

      this.messageService.add({key: 'aviso', severity: 'success', summary: 'Pessoa adicionada com sucesso!'});
    }).catch(erro => this.erroHandler.handle(erro));
  }

  atualizarPessoa(form: FormControl) {
    this.pessoaService.atualizar(this.pessoa)
    .then(pessoaAlterada => {
      this.pessoa = pessoaAlterada;

      this.messageService.add({key: 'aviso', severity: 'success', summary: 'Pessoa alterada com sucesso!'});
      this.atualizarTituloEdicao();
    }).catch(erro => this.erroHandler.handle(erro));
  }

  novo(form: FormControl) {
    form.reset();

    setTimeout(function() {
      this.pessoa = new Pessoa();
    }.bind(this), 1);

    this.router.navigate(['/pessoas/novo']);
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição da pessoa: ${this.pessoa.nome}`);
  }

}
