import { Component, OnInit } from '@angular/core';
import { Nota } from '../../../models/nota';
import { NotaService } from '../../../services/nota.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoriaService } from 'src/app/services/categoria.service';
import { Categoria } from 'src/app/models/categoria';

@Component({
  selector: 'app-criar-nota',
  templateUrl: './criar-nota.component.html',
  styleUrls: ['./criar-nota.component.css'],
})
export class CriarNotaComponent implements OnInit {
  nota: Nota;
  categorias: Categoria[] = [];
  categoriaSelecionada: string = '';

  constructor(
    private notaService: NotaService,
    private categoriaService: CategoriaService,
    private toastService: ToastrService,
    private router: Router
  ) {
    this.nota = new Nota('', '', 0, 'dark', 0);
  }

  ngOnInit(): void {
    this.categoriaService
      .selecionarTodos()
      .subscribe((categorias: Categoria[]) => {
        this.categorias = categorias;
        this.nota.categoriaId = categorias[0].id!;
      })
      .add(() => this.onCategoriaSelecionada(this.nota.categoriaId));
  }

  criarNota() {
    this.notaService.criar(this.nota).subscribe((nota) => {
      this.toastService.success(
        `Nota "${nota.titulo}" criada com sucesso.`,
        'Sucesso'
      );

      this.router.navigate(['/notas', 'listar']);
    });
  }

  onCategoriaSelecionada(categoriaId: number) {
    const categoria = this.categorias.find((c) => c.id == categoriaId);

    this.categoriaSelecionada = categoria?.titulo!;
  }
}
