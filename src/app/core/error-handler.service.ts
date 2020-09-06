import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(private messageService: MessageService) { }

  handle(errorResponse: any) {
    let msg: string;

    if (errorResponse.status >= 400 || errorResponse.status <= 499) {
      msg = JSON.parse(errorResponse._body)[0].mensagemUsuario;
    }else {
      msg = 'Erro ao processar serviço remoto. Tente novamente.';
    }

    this.messageService.add({key: 'aviso', severity: 'error', summary: msg});
  }
}
