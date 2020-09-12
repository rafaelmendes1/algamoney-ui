import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';


import { MessageService } from 'primeng/api'
import { ConfirmationService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

import { NavbarComponent } from './navbar/navbar.component';
import { PessoaService } from '../pessoas/pessoa.service'
import { LancamentoService } from '../lancamentos/lancamento.service'
import { ErrorHandlerService } from './error-handler.service'
import { RouterModule } from '@angular/router';
import { CategoriaService } from '../categorias/categoria.service';

registerLocaleData(localePt);
@NgModule({
  declarations: [
    NavbarComponent
  ],
  imports: [
    CommonModule, 
    ToastModule,
    ConfirmDialogModule,
    RouterModule
  ],
  exports: [
    NavbarComponent,
    ToastModule,
    ConfirmDialogModule
  ],
  providers: [
    LancamentoService,
    PessoaService,
    CategoriaService,
    MessageService,
    ConfirmationService,
    ErrorHandlerService,
    { provide: LOCALE_ID, useValue: 'pt-BR'}  
  ]
})
export class CoreModule { }
