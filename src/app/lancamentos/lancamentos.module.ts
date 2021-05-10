import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { CalendarModule } from 'primeng/calendar';
import { SelectButtonModule } from 'primeng/selectbutton';
import { DropdownModule } from 'primeng/dropdown';
import { CurrencyMaskModule } from 'ng2-currency-mask';

import { LancamentoCadastroComponent } from './lancamento-cadastro/lancamento-cadastro.component';
import { LancamentoPesquisaComponent } from './lancamento-pesquisa/lancamento-pesquisa.component';
import { SharedModule } from '../shared/shared.module';
import { LancamentosRoutingModule } from './lancamentos-routing.module';


@NgModule({
	declarations: [
		LancamentoCadastroComponent,
		LancamentoPesquisaComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,

		InputTextModule,
		ButtonModule,
		TableModule,
		TooltipModule,
		CalendarModule,
		SelectButtonModule,
		DropdownModule,
		CurrencyMaskModule,

		SharedModule,
		LancamentosRoutingModule
	],
	exports: []
})
export class LancamentosModule { }
