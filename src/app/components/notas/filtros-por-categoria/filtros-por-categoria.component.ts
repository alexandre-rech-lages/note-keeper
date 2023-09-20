import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Categoria } from 'src/app/models/categoria';

@Component({
  selector: 'app-filtros-por-categoria',
  templateUrl: './filtros-por-categoria.component.html',
  styleUrls: ['./filtros-por-categoria.component.css'],
})
export class FiltrosPorCategoriaComponent {
  @Input({ required: true }) categorias: Categoria[] = [];

  @Output() onFiltroSelecionado: EventEmitter<Categoria | null>;

  constructor() {
    this.onFiltroSelecionado = new EventEmitter();
  }

  selecionarTodas() {
    this.onFiltroSelecionado.emit(null);
  }

  selecionarComFiltro(categoria: Categoria) {
    this.onFiltroSelecionado.emit(categoria);
  }
}
