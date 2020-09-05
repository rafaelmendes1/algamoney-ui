import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { PessoasModule } from './pessoas/pessoas.module';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LancamentoService } from './lancamentos/lancamento.service'
import { LancamentosModule } from './lancamentos/lancamentos.module';
import { CoreModule } from './core/core.module';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api'


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    LancamentosModule,
    PessoasModule,
    AppRoutingModule,
    HttpClientModule,
    HttpModule,
    ToastModule
    
  ],
  providers: [LancamentoService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
