import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../../categorias/categoria.service';
import { PessoaService } from '../../pessoas/pessoa.service'
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
  

@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent implements OnInit {

  constructor(private categoriaService: CategoriaService,
    private pessoasService: PessoaService,
    private erroHandler: ErrorHandlerService) { }

  ngOnInit(): void {
    this.carregarCategorias();
    this.carregarPessoas();
  }

  tipos = [
    { label: 'Receita', value: 'RECEITA' },
    { label: 'Despesa', value: 'DESPESA' },
  ]

  categorias = []

  pessoas = []

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
