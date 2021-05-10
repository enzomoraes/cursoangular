import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';

import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { AuthService } from 'src/app/seguranca/auth.service';
import { PessoaFiltro, PessoaService } from '../pessoa.service';

@Component({
	selector: 'app-pessoa-pesquisa',
	templateUrl: './pessoa-pesquisa.component.html',
	styleUrls: ['./pessoa-pesquisa.component.css']
})
export class PessoaPesquisaComponent implements OnInit {

	totalRegistros = 0;
	filtro: PessoaFiltro = new PessoaFiltro();
	pessoas = [];

	@ViewChild('tabela') grid: any;

	constructor(
		private pessoaService: PessoaService,
		private messageService: MessageService,
		private confirmationService: ConfirmationService,
		private errorHandlerService: ErrorHandlerService,
		private title: Title,
		public auth: AuthService
	) { }

	ngOnInit(): void {
		this.title.setTitle('Pesquisa de Pessoas');
	}

	pesquisar(pagina = 0): void {
		this.filtro.pagina = pagina;

		this.pessoaService.pesquisar(this.filtro)
			.then(resultado => {
				this.totalRegistros = resultado.totalElements;
				this.pessoas = resultado.content;
			})
			.catch(erro => this.errorHandlerService.handle(erro));
	}

	aoMudarPagina(event: LazyLoadEvent): void {
		// tslint:disable-next-line: no-non-null-assertion
		const pagina = event ? event.first! / event.rows! : 0;
		this.pesquisar(pagina);
	}

	excluir(pessoa: any): void {

		this.pessoaService.excluir(pessoa.codigo)
			.then(() => {
				this.grid.reset();
				this.messageService.add({ severity: 'success', detail: 'Pessoa excluída com sucesso!' });
			})
			.catch(erro => this.errorHandlerService.handle(erro));

	}

	confirmarExclusao(pessoa: any): void {
		this.confirmationService.confirm({
			message: 'Tem certeza que deseja excluir?',
			accept: () => {
				this.excluir(pessoa);
			}
		});
	}

	mudarStatus(pessoa: any): void {
		this.pessoaService.mudarStatus(pessoa)
			.then(() => {
				pessoa.ativo = !pessoa.ativo;
				this.messageService.add({ severity: 'success', detail: 'Status alterado com sucesso!' });
			})
			.catch(erro => this.errorHandlerService.handle(erro));
	}

}
