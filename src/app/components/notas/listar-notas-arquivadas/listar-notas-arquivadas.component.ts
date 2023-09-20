import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { switchMap } from 'rxjs';
import { Categoria } from 'src/app/models/categoria';
import { Nota } from 'src/app/models/nota';
import { CategoriaService } from 'src/app/services/categoria.service';
import { NotaService } from 'src/app/services/nota.service';

@Component({
  selector: 'app-listar-notas-arquivadas',
  templateUrl: './listar-notas-arquivadas.component.html',
  styleUrls: ['./listar-notas-arquivadas.component.css'],
})
export class ListarNotasArquivadasComponent {
  notas: Nota[] = [];
  categorias: Categoria[] = [];

  constructor(
    private notaService: NotaService,
    private categoriaService: CategoriaService,
    private toastService: ToastrService
  ) {}

  ngOnInit(): void {
    this.selecionarNotasArquivadas();

    this.categoriaService
      .selecionarTodos()
      .subscribe((categorias: Categoria[]) => {
        this.categorias = categorias;
      });
  }

  filtrarNotasPorCategoria(categoria: Categoria | null): void {
    if (categoria == null) {
      this.selecionarNotasArquivadas();
      return;
    }

    this.selecionarNotasPorCategoria(categoria);
  }

  selecionarNotasArquivadas(): void {
    this.notaService.selecionarNotasArquivadas().subscribe((notas: Nota[]) => {
      this.notas = notas;
    });
  }

  selecionarNotasPorCategoria(categoria: Categoria): void {
    this.notaService
      .selecionarArquivadasNotasPorCategoria(categoria)
      .subscribe((notas: Nota[]) => {
        this.notas = notas;
      });
  }

  reativarNota(nota: Nota): void {
    nota.arquivada = false;

    this.notaService
      .reativar(nota)
      .pipe(switchMap(() => this.notaService.selecionarNotasArquivadas()))
      .subscribe((notasAtualizadas: Nota[]) => {
        this.notas = notasAtualizadas;

        this.toastService.success(
          `Nota ${nota.titulo} reativada com sucesso.`,
          'Nota Reativar'
        );
      });
  }
}
