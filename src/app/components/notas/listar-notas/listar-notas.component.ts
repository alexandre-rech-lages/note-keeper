import { Component, OnInit } from '@angular/core';
import { Nota } from '../../../models/nota';
import { NotaService } from '../../../services/nota.service';
import { Categoria } from 'src/app/models/categoria';
import { CategoriaService } from 'src/app/services/categoria.service';
import { switchMap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-listar-notas',
  templateUrl: './listar-notas.component.html',
  styleUrls: ['./listar-notas.component.css'],
})
export class ListarNotasComponent implements OnInit {
  notas: Nota[] = [];
  categorias: Categoria[] = [];

  constructor(
    private notaService: NotaService,
    private categoriaService: CategoriaService,
    private toastService: ToastrService
  ) {}

  ngOnInit(): void {
    this.selecionarTodasNotas();

    this.categoriaService
      .selecionarTodos()
      .subscribe((categorias: Categoria[]) => {
        this.categorias = categorias;
      });
  }

  filtrarNotasPorCategoria(categoria: Categoria | null): void {
    if (categoria == null) {
      this.selecionarTodasNotas();
      return;
    }

    this.selecionarNotasPorCategoria(categoria);
  }

  selecionarTodasNotas(): void {
    this.notaService.selecionarTodos().subscribe((notas: Nota[]) => {
      this.notas = notas;
    });
  }

  selecionarNotasPorCategoria(categoria: Categoria): void {
    this.notaService
      .selecionarNotasPorCategoria(categoria)
      .subscribe((notas: Nota[]) => {
        this.notas = notas;
      });
  }

  arquivarNota(nota: Nota): void {
    nota.arquivada = true;

    this.notaService
      .arquivar(nota)
      .pipe(switchMap(() => this.notaService.selecionarTodos()))
      .subscribe((notasAtualizadas: Nota[]) => {
        this.notas = notasAtualizadas;

        this.toastService.success(
          `Nota ${nota.titulo} arquivada com sucesso.`,
          'Nota Arquivada'
        );
      });
  }
}
