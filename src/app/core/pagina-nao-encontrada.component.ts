import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-pagina-nao-encontrada',
	template: `
    <div class="container p-col-12">
      <h1 class="text-center">Página não encontrada!</h1>
    </div>
  `,
	styles: [
	]
})
export class PaginaNaoEncontradaComponent implements OnInit {

	constructor() { }

	ngOnInit(): void {
	}

}
