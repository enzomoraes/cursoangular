export class Estado {
	codigo!: number;
	nome!: string;
}

export class Cidade {
	codigo!: number;
	nome!: string;
	estado = new Estado();
}

export class Endereco {
	logradouro: string | undefined;
	numero: number | undefined;
	complemento: string | undefined;
	bairro: string | undefined;
	cep: string | undefined;
	cidade = new Cidade();
}

export class Contato {
	codigo: number | undefined;
	nome: string | undefined;
	email: string | undefined;
	telefone: string | undefined;

	constructor(codigo?: number, nome?: string, email?: string, telefone?: string) {
		this.codigo = codigo;
		this.nome = nome;
		this.email = email;
		this.telefone = telefone;
	}
}

export class Pessoa {
	codigo: number | undefined;
	nome: string | undefined;
	endereco = new Endereco();
	ativo = true;
	contatos: Array<Contato> | any;
}

export class Categoria {
	codigo: number | undefined;
}

export class Lancamento {
	codigo: number | undefined;
	tipo = 'RECEITA';
	descricao: string | undefined;
	dataVencimento: Date | undefined;
	dataPagamento: Date | undefined;
	valor: number | undefined;
	observacao: string | undefined;
	pessoa = new Pessoa();
	categoria = new Categoria();
}
