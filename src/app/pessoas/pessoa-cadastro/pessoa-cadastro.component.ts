import { Component, OnInit } from '@angular/core';
import { Pessoa } from 'src/app/core/model';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  pessoa = new Pessoa();

  salvar(form: FormControl) {
    console.log(this.pessoa)
  }
}
