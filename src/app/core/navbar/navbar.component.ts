import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/seguranca/auth.service';
import { ErrorHandlerService } from '../error-handler.service';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

	constructor(
		public auth: AuthService,
		private errorHandler: ErrorHandlerService,
		private router: Router
	) { }

	exibindoMenu = false;

	logout(): void {
		this.auth.logout()
			.then(() => {
				this.router.navigate(['/login']);
			})
			.catch(erro => {
				this.errorHandler.handle(erro);
			});
	}

}
