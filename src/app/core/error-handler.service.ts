import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(private messageService: MessageService) { }

  handle(errorResponse: any) {
    let msg: string;
    console.log(errorResponse)
    if(typeof errorResponse === 'string') {
      msg = errorResponse;
    }else if(errorResponse.status >= 400 && errorResponse.status <= 499) {
      
      let errors;
      msg = 'Ocorreu um erro ao processar a sua solicitação.'

      if(errorResponse.status === 403) {
        msg = 'Você não tem permissão para executar essa ação';
      }

      try {
        errors = errorResponse.json();
        msg = errors[0].mensagemUsuario;
      } catch(error){

      };

    }else {
      msg = 'Erro ao processar serviço remoto. Tente novamente.';
    }
    
    this.messageService.add({key: 'aviso', severity: 'error', summary: msg});
  }
}
