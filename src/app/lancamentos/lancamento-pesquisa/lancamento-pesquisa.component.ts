import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';

import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { AuthService } from 'src/app/seguranca/auth.service';
import { LancamentoFiltro, LancamentoService } from '../lancamento.service';

@Component({
	selector: 'app-lancamento-pesquisa',
	templateUrl: './lancamento-pesquisa.component.html',
	styleUrls: ['./lancamento-pesquisa.component.css']
})
export class LancamentoPesquisaComponent implements OnInit {

	@ViewChild('tabela') grid: any;

	totalRegistros = 0;
	filtro = new LancamentoFiltro();
	lancamentos = [];

	constructor(
		private lancamentoService: LancamentoService,
		private messageService: MessageService,
		private confirmationService: ConfirmationService,
		private errorHandlerService: ErrorHandlerService,
		private title: Title,
		public auth: AuthService
	) { }

	ngOnInit(): void {
		this.title.setTitle('Pesquisa de Lançamentos');
		// this.pesquisar();
	}

	pesquisar(pagina = 0): void {
		this.filtro.pagina = pagina;

		this.lancamentoService.pesquisar(this.filtro)
			.then(resultado => {
				this.totalRegistros = resultado.totalElements;
				this.lancamentos = resultado.content;
			})
			.catch(erro => this.errorHandlerService.handle(erro));
	}

	aoMudarPagina(event: LazyLoadEvent): void {
		// tslint:disable-next-line: no-non-null-assertion
		const pagina = event ? event.first! / event.rows! : 0;
		this.pesquisar(pagina);
	}

	excluir(lancamento: any): void {

		this.lancamentoService.excluir(lancamento.codigo)
			.then(() => {
				this.grid.reset();
				this.messageService.add({ severity: 'success', detail: 'Lançamento excluído com sucesso!' });
			})
			.catch(erro => this.errorHandlerService.handle(erro));

	}

	confirmarExclusao(lancamento: any): void {

		this.confirmationService.confirm({
			message: 'Tem certeza que deseja excluir?',
			accept: () => {
				this.excluir(lancamento);
			}
		});
	}

}
