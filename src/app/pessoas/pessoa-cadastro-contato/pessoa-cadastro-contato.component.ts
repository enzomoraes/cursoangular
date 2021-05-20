import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Contato } from 'src/app/core/model';

@Component({
	selector: 'app-pessoa-cadastro-contato',
	templateUrl: './pessoa-cadastro-contato.component.html',
	styleUrls: ['./pessoa-cadastro-contato.component.css']
})
export class PessoaCadastroContatoComponent implements OnInit {

	@Input() contatos!: Array<Contato>;
	contato!: Contato;
	contatoIndex!: number;

	exibindoFormularioContato = false;

	constructor() { }

	ngOnInit(): void {
	}

	prepararNovoContato(): void {
		this.exibindoFormularioContato = true;

		this.contato = new Contato();
		this.contatoIndex = this.contatos.length;
	}

	prepararEdicaoContato(contato: Contato, index: number): void {
		this.contato = this.clonarContato(contato);
		this.exibindoFormularioContato = true;
		this.contatoIndex = index;
	}

	clonarContato(contato: Contato): Contato {
		return new Contato(contato.codigo, contato.nome, contato.email, contato.telefone);
	}

	confirmarContato(form: NgForm): void {
		this.contatos[this.contatoIndex] = this.clonarContato(this.contato);

		this.exibindoFormularioContato = false;

		form.reset();
	}

	removerContato(index: number): void {
		this.contatos.splice(index, 1);
	}

	get editando(): boolean {
		return Boolean(this.contato && this.contato.codigo);
	}
}
