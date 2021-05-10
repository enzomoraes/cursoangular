import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { AuthService } from '../auth.service';

@Component({
	selector: 'app-login-form',
	templateUrl: './login-form.component.html',
	styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

	constructor(
		private auth: AuthService,
		private errorHandlerService: ErrorHandlerService,
		private router: Router
	) { }

	ngOnInit(): void {

	}

	login(usuario: string, senha: string): void {

		this.auth.login(usuario, senha)
			.then(() => {
				this.router.navigate(['/lancamentos']);
			})
			.catch(erro => {
				this.errorHandlerService.handle(erro);
			});
	}

}
