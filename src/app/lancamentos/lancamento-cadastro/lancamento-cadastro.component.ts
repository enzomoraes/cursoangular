import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

import { MessageService } from 'primeng/api';

import { CategoriaService } from 'src/app/categorias/categoria.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
// import { Lancamento } from 'src/app/core/model';
import { PessoaService } from 'src/app/pessoas/pessoa.service';
import { LancamentoService } from '../lancamento.service';

@Component({
	selector: 'app-lancamento-cadastro',
	templateUrl: './lancamento-cadastro.component.html',
	styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent implements OnInit {

	tipos = [
		{ label: 'Receita', value: 'RECEITA' },
		{ label: 'Despesa', value: 'DESPESA' }
	];

	categorias = [];
	pessoas = [];

	// lancamento = new Lancamento();

	formulario: FormGroup | any;

	constructor(
		private categoriaService: CategoriaService,
		private errorHandlerService: ErrorHandlerService,
		private pessoasService: PessoaService,
		private lancamentoService: LancamentoService,
		private messageService: MessageService,
		private route: ActivatedRoute,
		private router: Router,
		private title: Title,
		private formBuilder: FormBuilder
	) { }

	ngOnInit(): void {
		this.configurarFormulario();

		const codigoLancamento = this.route.snapshot.params.codigo;

		this.title.setTitle('Novo Lançamento');

		if (codigoLancamento) {
			this.carregarLancamento(codigoLancamento);
		}


		this.carregarPessoas();

		this.carregarCategorias();
	}

	get editando(): boolean {
		return Boolean(this.formulario.get('codigo').value);
	}

	configurarFormulario(): void {
		this.formulario = this.formBuilder.group({
			codigo: [],
			tipo: ['RECEITA', Validators.required],
			dataVencimento: [null, Validators.required],
			dataPagamento: [],
			descricao: [null, [this.validarObrigatoriedade, this.validarTamanhoMinimo(5)]],
			valor: [null, Validators.required],
			pessoa: this.formBuilder.group({
				codigo: [null, Validators.required],
				nome: []
			}),
			categoria: this.formBuilder.group({
				codigo: [null, Validators.required],
				nome: []
			}),
			observacao: []
		});

	}

	validarObrigatoriedade(input: FormControl): any {
		return (input.value ? null : { obrigatoriedade: true });
	}

	validarTamanhoMinimo(tamanho: number): any {
		return (input: FormControl) => {
			return (!input.value || input.value.length >= tamanho) ? null : { tamanhoMinimo: { tamanho } };
		};
	}

	carregarLancamento(codigo: number): void {

		this.lancamentoService.pesquisarPorCodigo(codigo)
			.then(lancamento => {
				// this.lancamento = lancamento;
				this.formulario.patchValue(lancamento);
				this.title.setTitle('Edição de Lançamento');
			})
			.catch(erro => this.errorHandlerService.handle(erro));

	}

	salvar(/*form: NgForm*/): void {
		if (this.editando) {
			this.atualizarLancamento(/*form*/);
		} else {
			this.adicionarLancamento(/*form*/);
		}
	}

	adicionarLancamento(/*form: NgForm*/): void {
		this.lancamentoService.adicionar(this.formulario.value)
			.then(lancamentoAdicionado => {
				this.messageService.add({ severity: 'success', detail: 'Lançamento adicionado com sucesso!' });

				// form.reset();
				// this.lancamento = new Lancamento();
				this.router.navigate(['lancamentos', lancamentoAdicionado.codigo]);
			})
			.catch(erro => this.errorHandlerService.handle(erro));

	}

	atualizarLancamento(/*form: NgForm*/): void {
		this.lancamentoService.atualizar(this.formulario.value)
			.then(lancamento => {
				// this.lancamento = lancamento;
				this.formulario.patchValue(lancamento);

				this.messageService.add({ severity: 'success', detail: 'Lancamento atualizado com sucesso!' });
			})
			.catch(erro => this.errorHandlerService.handle(erro));
	}

	carregarCategorias(): Promise<void> {
		return this.categoriaService.listarTodas()
			.then(categorias => {
				this.categorias = categorias.map((categoria: { nome: any; codigo: any; }) => ({ label: categoria.nome, value: categoria.codigo }));
			})
			.catch(erro => this.errorHandlerService.handle(erro));

	}

	carregarPessoas(): Promise<void> {
		return this.pessoasService.listarTodas()
			.then(pessoas => {
				this.pessoas = pessoas.content.map((pessoa: { nome: any; codigo: any; }) => ({ label: pessoa.nome, value: pessoa.codigo }));
			})
			.catch(erro => this.errorHandlerService.handle(erro));

	}

	novo(/*form: NgForm*/): void {
		// form.reset();
		this.formulario.reset();

		// setTimeout(() => {
		// 	this.formulario = new Formulario();
		// }, 1);

		this.router.navigate(['lancamentos', 'novo']);
	}

}
