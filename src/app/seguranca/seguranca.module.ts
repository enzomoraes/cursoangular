import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';

import { SegurancaRoutingModule } from './seguranca-routing.module';
import { LoginFormComponent } from './login-form/login-form.component';
import { MoneyHttpInterceptor } from './money-http-interceptor';

export function tokenGetter(): string | null {
	return localStorage.getItem('token');
}

@NgModule({

	declarations: [
		LoginFormComponent
	],
	imports: [

		JwtModule.forRoot({
			config: {
				tokenGetter,
				allowedDomains: ['localhost:8080'],
				disallowedRoutes: ['http://localhost:8080/oauth/token']
			}
		}),

		CommonModule,
		FormsModule,

		InputTextModule,
		ButtonModule,

		SegurancaRoutingModule,
	],
	exports: [],
	providers: [
		JwtHelperService,
		{
			provide: HTTP_INTERCEPTORS,
			useClass: MoneyHttpInterceptor,
			multi: true
		}
	]
})
export class SegurancaModule { }
