import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Nota } from '../../../models/nota';

@Component({
  selector: 'app-nota',
  templateUrl: './card-nota.component.html',
  styleUrls: ['./card-nota.component.css'],
})
export class CardNotaComponent {
  @Input({ required: true }) nota: Nota;

  @Output() onArquivarClicado: EventEmitter<Nota>;

  constructor() {
    this.nota = new Nota('', '', 0, 'dark');
    this.onArquivarClicado = new EventEmitter();
  }

  arquivarNota(nota: Nota): void {
    this.onArquivarClicado.emit(nota);
  }
}
