export class Endereco {
	logradouro: string | undefined;
	numero: number | undefined;
	complemento: string | undefined;
	bairro: string | undefined;
	cep: string | undefined;
	cidade: string | undefined;
	estado: string | undefined;
}

export class Pessoa {
	codigo: number | undefined;
	nome: string | undefined;
	endereco = new Endereco();
	ativo = true;
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
