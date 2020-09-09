import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../../categorias/categoria.service';
import { PessoaService } from '../../pessoas/pessoa.service'
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Lancamento } from '../../core/model';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent implements OnInit {

  constructor(private categoriaService: CategoriaService,
    private pessoasService: PessoaService,
    private erroHandler: ErrorHandlerService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    console.log(this.route.snapshot.params['id']);
    this.carregarCategorias();
    this.carregarPessoas();
  }

  tipos = [
    { label: 'Receita', value: 'RECEITA' },
    { label: 'Despesa', value: 'DESPESA' },
  ]

  categorias = []
  pessoas = []
  lancamento = new Lancamento;

  salvar(form: FormControl) {
    console.log(this.lancamento);
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
