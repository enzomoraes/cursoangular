import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Pessoa } from '../core/model';


export class PessoaFiltro {
	nome: any;
	pagina: any = 0;
	itensPorPagina: any = 5;
}

@Injectable({
	providedIn: 'root'
})
export class PessoaService {

	pessoasUrl: string;

	constructor(private http: HttpClient) {
		this.pessoasUrl = `${environment.apiUrl}/pessoas`;
	}


	pesquisar(filtro: PessoaFiltro): Promise<any> {

		let params = new HttpParams();

		params = params.set('page', filtro.pagina);
		params = params.set('size', filtro.itensPorPagina);

		if (filtro.nome) {
			params = params.set('nome', filtro.nome);
		}

		return this.http.get(`${this.pessoasUrl}`, { params }).toPromise()
			.then(response => {
				return response;
			});
	}

	listarTodas(): Promise<any> {

		return this.http.get(this.pessoasUrl).toPromise()
			.then(response => response);
	}

	excluir(codigo: number): Promise<void> {

		return this.http.delete(`${this.pessoasUrl}/${codigo}`).toPromise()
			.then(() => { });
	}

	mudarStatus(pessoa: any): Promise<void> {

		const headers = new HttpHeaders().append('Content-Type', 'application/json');

		return this.http.put(`${this.pessoasUrl}/${pessoa.codigo}/ativo`, !pessoa.ativo, { headers }).toPromise()
			.then();
	}

	adicionar(pessoa: Pessoa): Promise<Pessoa> {

		return this.http.post<Pessoa>(`${this.pessoasUrl}`, pessoa).toPromise();
	}

	atualizar(pessoa: Pessoa): Promise<Pessoa> {

		return this.http.put<Pessoa>(`${this.pessoasUrl}/${pessoa.codigo}`, pessoa).toPromise()
			.then(response => {
				const pessoaAtualizada = response as Pessoa;

				return pessoaAtualizada;
			});
	}

	pesquisarPorCodigo(codigo: number): Promise<Pessoa> {

		return this.http.get(`${this.pessoasUrl}/${codigo}`).toPromise()
			.then(response => {
				const pessoa = response as Pessoa;

				return pessoa;
			});
	}
}
