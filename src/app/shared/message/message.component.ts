import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-message',
	template: `
	<div *ngIf="temErro()" class="p-message p-message-error">
		{{ text }}
	</div>
  `,
	styles: [
	]
})
export class MessageComponent {

	@Input() error = '';
	@Input() control: any;
	@Input() text = '';

	temErro(): boolean {
		return this.control.hasError(this.error) && this.control.touched;
	}

}
