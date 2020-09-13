import { Component, OnInit } from '@angular/core';
import { Pessoa } from 'src/app/core/model';
import { FormControl } from '@angular/forms';
import { PessoaService } from '../pessoa.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent implements OnInit {

  pessoa = new Pessoa();

  constructor(private pessoaService: PessoaService,
    private erroHandler: ErrorHandlerService,
    private messageService: MessageService) { }

  ngOnInit(): void {
  }


  salvar(form: FormControl) {
    this.pessoa.ativo = true;
    this.pessoaService.adicionar(this.pessoa)
    .then(() => {

      this.messageService.add({key: 'aviso', severity: 'success', summary: 'Pessoa adicionada com sucesso!'});
    }).catch(erro => this.erroHandler.handle(erro)); 
  }
}
