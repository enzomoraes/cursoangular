import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RelatoriosRoutingModule } from './relatorios-routing.module';
import { SharedModule } from '../shared/shared.module';
import { RelatorioLancamentosComponent } from './relatorio-lancamentos/relatorio-lancamentos.component';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { ButtonModule } from 'primeng/button';


@NgModule({
	declarations: [
		RelatorioLancamentosComponent
	],
	imports: [
		CommonModule,
		FormsModule,

		CalendarModule,
		ButtonModule,

		SharedModule,
		RelatoriosRoutingModule
	]
})
export class RelatoriosModule { }
