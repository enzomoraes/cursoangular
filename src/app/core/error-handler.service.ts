import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { NotAuthenticatedError } from '../seguranca/money-http-interceptor';

@Injectable({
	providedIn: 'root'
})
export class ErrorHandlerService {

	constructor(
		private messageService: MessageService,
		private router: Router
	) { }

	handle(errorResponse: any): void {
		let msg: string;

		msg = 'Ocorreu um erro';

		if (typeof errorResponse === 'string') {
			msg = errorResponse;

		} else if (errorResponse instanceof NotAuthenticatedError) {

			msg = 'Sua sessão expirou. Faça login novamente.';

			this.router.navigate(['/login']);


		} else if (errorResponse?.status?.toString().startsWith('4')) {

			if (errorResponse.status === 403) {
				msg = 'Você não tem permissão para executar esta ação!';
			}
			try {
				msg = errorResponse[0].mensagemUsuario;
			} catch (e) {
				console.log('Não foi possivel captar a mensagem de erro do usuário', errorResponse);
			}
		} else {
			msg = 'Erro ao processar serviço remoto. Tente novamente.';
		}

		this.messageService.add({ severity: 'error', detail: msg });

	}
}
