import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaginaNaoAutorizadaComponent } from './core/pagina-nao-autorizada.component';

import { PaginaNaoEncontradaComponent } from './core/pagina-nao-encontrada.component';
import { AuthGuard } from './seguranca/auth.guard';

const routes: Routes = [
	{ path: 'lancamentos', loadChildren: () => import('./lancamentos/lancamentos.module').then(m => m.LancamentosModule) },
	{ path: 'pessoas', loadChildren: () => import('./pessoas/pessoas.module').then(m => m.PessoasModule) },
	{ path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)},
	{ path: 'relatorios', loadChildren: () => import('./relatorios/relatorios.module').then(m => m.RelatoriosModule)},

	{ path: '', redirectTo: 'dashboard', pathMatch: 'full' },
	{ path: 'pagina-nao-autorizada', component: PaginaNaoAutorizadaComponent, canActivate: [AuthGuard] },
	{ path: 'pagina-nao-encontrada', component: PaginaNaoEncontradaComponent, canActivate: [AuthGuard] },
	{ path: '**', redirectTo: 'pagina-nao-encontrada' }
];


@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})

export class AppRoutingModule { }
