import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { ConfirmationService, MessageService } from 'primeng/api';

import { NavbarComponent } from './navbar/navbar.component';
import { ErrorHandlerService } from './error-handler.service';
import { LancamentoService } from '../lancamentos/lancamento.service';
import { PessoaService } from '../pessoas/pessoa.service';
import { AuthService } from '../seguranca/auth.service';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada.component';
import { PaginaNaoAutorizadaComponent } from './pagina-nao-autorizada.component';
import { DashboardService } from '../dashboard/dashboard.service';
import { RelatoriosService } from '../relatorios/relatorios.service';

@NgModule({
	declarations: [
		NavbarComponent,
		PaginaNaoEncontradaComponent,
		PaginaNaoAutorizadaComponent
	],
	imports: [
		CommonModule,
		RouterModule,
		ToastModule,
		ConfirmDialogModule,
		DialogModule,
	],
	exports: [
		NavbarComponent,
		ToastModule,
		ConfirmDialogModule,
		DialogModule
	],
	providers: [
		LancamentoService,
		PessoaService,
		MessageService,
		{ provide: LOCALE_ID, useValue: 'pt-BR' },
		ConfirmationService,
		ErrorHandlerService,
		Title,
		AuthService,
		DashboardService,
		RelatoriosService
	]
})
export class CoreModule { }
