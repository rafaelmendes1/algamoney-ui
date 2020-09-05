import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { PessoasModule } from './pessoas/pessoas.module';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LancamentosModule } from './lancamentos/lancamentos.module';
import { CoreModule } from './core/core.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    CoreModule,
    LancamentosModule,
    PessoasModule,
    AppRoutingModule,
    
  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
