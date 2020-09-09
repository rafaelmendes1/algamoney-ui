import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../../categorias/categoria.service';
import { PessoaService } from '../../pessoas/pessoa.service'
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Lancamento } from '../../core/model';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LancamentoService } from '../lancamento.service';

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
    console.log(this.lancamento);
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
