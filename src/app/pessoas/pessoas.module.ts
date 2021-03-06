import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { InputMaskModule } from 'primeng/inputmask';

import { PessoaCadastroComponent } from './pessoa-cadastro/pessoa-cadastro.component';
import { PessoaPesquisaComponent } from './pessoa-pesquisa/pessoa-pesquisa.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { PessoasRoutingModule } from './pessoas-routing.module';
import { PanelModule } from 'primeng/panel';
import { CoreModule } from '../core/core.module';
import { DialogModule } from 'primeng/dialog';
import { PessoaCadastroContatoComponent } from './pessoa-cadastro-contato/pessoa-cadastro-contato.component';
import { DropdownModule } from 'primeng/dropdown';

@NgModule({
	declarations: [
		PessoaCadastroComponent,
		PessoaPesquisaComponent,
		PessoaCadastroContatoComponent,
	],
	imports: [
		CommonModule,
		FormsModule,
		RouterModule,

		InputTextModule,
		ButtonModule,
		TableModule,
		TooltipModule,
		InputMaskModule,
		PanelModule,
		DialogModule,
		DropdownModule,

		SharedModule,
		PessoasRoutingModule

	],
	exports: []
})
export class PessoasModule { }
