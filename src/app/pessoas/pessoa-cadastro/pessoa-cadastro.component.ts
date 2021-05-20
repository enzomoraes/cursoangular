import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Estado, Pessoa } from 'src/app/core/model';
import { PessoaService } from '../pessoa.service';

@Component({
	selector: 'app-pessoa-cadastro',
	templateUrl: './pessoa-cadastro.component.html',
	styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent implements OnInit {

	pessoa: Pessoa;

	estados!: any[];
	estadoSelecionado!: any;

	cidades!: any[];

	constructor(
		private pessoaService: PessoaService,
		private errorHandlerService: ErrorHandlerService,
		private messageService: MessageService,
		private title: Title,
		private router: Router,
		private route: ActivatedRoute,

		) {
			this.pessoa = new Pessoa();
		}

	ngOnInit(): void {

		const codigoPessoa = this.route.snapshot.params.codigo;

		this.title.setTitle('Nova Pessoa');

		this.carregarEstados();

		if (codigoPessoa) {
			this.carregarPessoa(codigoPessoa);
		}
	}

	get editando(): boolean {
		return Boolean(this.pessoa.codigo);
	}

	carregarPessoa(codigo: number): void {

		this.pessoaService.pesquisarPorCodigo(codigo)
			.then(pessoa => {
				this.pessoa = pessoa;

				this.estadoSelecionado = (this.pessoa.endereco.cidade) ? this.pessoa.endereco.cidade.estado.codigo : null;

				if (this.estadoSelecionado) {
					this.carregarCidades();
				}

				this.title.setTitle('Edição de Pessoa');
			})
			.catch(erro => this.errorHandlerService.handle(erro));

	}

	salvar(form: NgForm): void {
		if (this.editando) {
			this.atualizarPessoa(form);
		} else {
			this.adicionarPessoa(form);
		}
	}

	adicionarPessoa(form: NgForm): void {

		this.pessoaService.adicionar(this.pessoa)
			.then(pessoaAdicionada => {
				this.messageService.add({ severity: 'success', detail: 'Pessoa adicionada com sucesso!' });

				// form.reset();
				// this.pessoa = new Pessoa();

				this.router.navigate(['pessoas', pessoaAdicionada.codigo]);

			})
			.catch(error => this.errorHandlerService.handle(error));
	}

	atualizarPessoa(form: NgForm): void {

		this.pessoaService.atualizar(this.pessoa)
			.then(() => {
				this.messageService.add({ severity: 'success', detail: 'Pessoa atualizada com sucesso!' });

			})
			.catch(erro => this.errorHandlerService.handle(erro));


	}

	novo(form: NgForm): void {
		form.reset();

		setTimeout(() => {
			this.pessoa = new Pessoa();
		}, 1);

		this.router.navigate(['pessoas', 'nova']);
	}

	private carregarEstados(): void {
		this.pessoaService.listarEstados()
			.then(lista => {
				this.estados = lista.map(uf => ({ label: uf.nome, value: uf.codigo }));
			})
			.catch(erro => this.errorHandlerService.handle(erro));
	}

	carregarCidades(): void {
		this.pessoaService.pesquisarCidades(this.estadoSelecionado)
			.then(lista => {
				this.cidades = lista.map(c => ({ label: c.nome, value: c.codigo }));
			})
			.catch(erro => this.errorHandlerService.handle(erro));
	}
}
