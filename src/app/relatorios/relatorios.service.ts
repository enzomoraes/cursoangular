import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class RelatoriosService {

	lancamentosUrl: string;

	constructor(
		private http: HttpClient
	) {
		this.lancamentosUrl = `${environment.apiUrl}/lancamentos`;
	}

	relatorioLancamentosPorPessoa(inicio: Date, fim: Date): Promise<any> {
		const params = new HttpParams()
			.set('inicio', moment(inicio).format('YYYY-MM-DD'))
			.set('fim', moment(fim).format('YYYY-MM-DD'));

		return this.http.get(`${this.lancamentosUrl}/relatorios/por-pessoa`, { params, responseType: 'blob' }).toPromise();
	}

}
