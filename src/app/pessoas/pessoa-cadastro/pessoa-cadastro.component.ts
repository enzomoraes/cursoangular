import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Contato, Pessoa } from 'src/app/core/model';
import { PessoaService } from '../pessoa.service';

@Component({
	selector: 'app-pessoa-cadastro',
	templateUrl: './pessoa-cadastro.component.html',
	styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent implements OnInit {

	exibindoFormularioContato = false;
	pessoa: Pessoa;
	contato!: Contato;

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

		if (codigoPessoa) {
			this.carregarPessoa(codigoPessoa);
		}
	}

	prepararNovoContato(): void {
		this.exibindoFormularioContato = true;

		this.contato = new Contato();
	}

	clonarContato(contato: Contato): Contato {
		return new Contato(contato.codigo, contato.nome, contato.email, contato.telefone)
	}

	get editando(): boolean {
		return Boolean(this.pessoa.codigo);
	}

	confirmarContato(form: NgForm): void {
		this.pessoa.contatos.push(this.clonarContato(this.contato));

		this.exibindoFormularioContato = false;

		form.reset();
	}

	carregarPessoa(codigo: number): void {

		this.pessoaService.pesquisarPorCodigo(codigo)
			.then(pessoa => {
				this.pessoa = pessoa;
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

}
