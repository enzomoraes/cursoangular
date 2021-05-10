import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	oauthTokenUrl = 'http://localhost:8080/oauth/token';
	revokeUrl = 'http://localhost:8080/tokens/revoke';
	jwtPayload: any;

	constructor(
		private http: HttpClient,
		private jwtHelper: JwtHelperService
	) {
		this.oauthTokenUrl = `${environment.apiUrl}/oauth/token`;
		this.revokeUrl = `${environment.apiUrl}/tokens/revoke`;
		this.carregarToken();
	}

	login(usuario: string, senha: string): Promise<void> {

		const headers = new HttpHeaders()
			.set('Authorization', 'Basic ' + btoa('angular:@ngul@r0'))
			.set('Content-Type', 'application/x-www-form-urlencoded');
		const body = `username=${usuario}&password=${senha}&grant_type=password`;

		return this.http.post<any>(`${this.oauthTokenUrl}`, body, { headers, withCredentials: true }).toPromise()
			.then(response => {
				this.armazenarToken(response.access_token);
			})
			.catch(response => {
				if (response.status === 400) {
					if (response.error.error === 'invalid_grant') {
						return Promise.reject('Usuário ou senha inválidos');
					}
				}
				return Promise.reject(response);
			});
	}

	obterNovoAccessToken(): Promise<void> {
		const body = 'grant_type=refresh_token';

		const headers = new HttpHeaders()
			.set('Authorization', 'Basic ' + btoa('angular:@ngul@r0'))
			.set('Content-Type', 'application/x-www-form-urlencoded');

		return this.http.post<any>(this.oauthTokenUrl, body, { headers, withCredentials: true }).toPromise()
			.then(response => {
				this.armazenarToken(response.access_token);

				console.log('Novo access token criado!');

				return Promise.resolve();

			})
			.catch(response => {
				console.log('Erro ao obter token', response);

				return Promise.resolve();
			});
	}

	logout(): Promise<void> {
		return this.http.delete(`${this.revokeUrl}`, { withCredentials: true }).toPromise()
			.then(() => {
				this.limparAcessToken();
			});
	}

	limparAcessToken(): void {
		localStorage.removeItem('token');
		this.jwtPayload = null;
	}

	isAccessTokenInvalido(): boolean {
		const token = localStorage.getItem('token');

		return !token || this.jwtHelper.isTokenExpired(token);
	}

	temPermissao(permissao: string): boolean {
		return this.jwtPayload && this.jwtPayload.authorities.includes(permissao);

	}

	temQualquerPermissao(roles: any): any {
		for (const role of roles) {
			if (this.temPermissao(role)) {
				return true;
			}
		}
		return false;
	}

	private armazenarToken(token: string): void {
		this.jwtPayload = this.jwtHelper.decodeToken(token);
		localStorage.setItem('token', token);
	}

	private carregarToken(): void {
		const token = localStorage.getItem('token');

		if (token) {
			this.armazenarToken(token);
		}
	}
}
