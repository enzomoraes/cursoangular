import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { environment } from './../../environments/environment';

@Injectable({
	providedIn: 'root'
})
export class DashboardService {

	lancamentosUrl: string;

	constructor(
		private http: HttpClient
	) {
		this.lancamentosUrl = `${environment.apiUrl}/lancamentos`;
	}

	lancamentosPorCategoria(): Promise<Array<any>> {
		return this.http.get<Array<any>>(`${this.lancamentosUrl}/estatisticas/por-categoria`)
			.toPromise()
			.then(response => response);
	}

	lancamentosPorDia(): Promise<Array<any>> {
		return this.http.get<Array<any>>(`${this.lancamentosUrl}/estatisticas/por-dia`)
			.toPromise()
			.then(response => {
				const dados = response;
				this.converterStringsParaDatas(dados);
				return dados;
			});
	}

	private converterStringsParaDatas(dados: Array<any>): void {
		for (const dado of dados) {
			dado.dia = moment(dado.dia, 'YYYY-MM-DD').toDate();
		}
	}

}
