import { Component, OnInit } from '@angular/core';
import { Nota } from '../../../models/nota';
import { ActivatedRoute, Router } from '@angular/router';
import { NotaService } from '../../../services/nota.service';
import { ToastrService } from 'ngx-toastr';
import { CategoriaService } from 'src/app/services/categoria.service';
import { Categoria } from 'src/app/models/categoria';

@Component({
  selector: 'app-editar-nota',
  templateUrl: './editar-nota.component.html',
  styleUrls: ['./editar-nota.component.css'],
})
export class EditarNotaComponent implements OnInit {
  nota: Nota;
  categorias: Categoria[] = [];
  categoriaSelecionada: string = '';

  constructor(
    private notaService: NotaService,
    private categoriaService: CategoriaService,
    private toastService: ToastrService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.nota = new Nota('', '', 0, 'dark', 0);
  }

  ngOnInit(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!);

    this.notaService.selecionarPorId(id).subscribe((nota: Nota) => {
      this.nota = nota;
    });

    this.categoriaService
      .selecionarTodos()
      .subscribe((categorias: Categoria[]) => {
        this.categorias = categorias;
      })
      .add(() => this.onCategoriaSelecionada(this.nota.categoriaId));
  }

  editarNota() {
    this.notaService.editar(this.nota).subscribe((nota: Nota) => {
      this.toastService.success(
        `Nota "${nota.titulo}" editada com sucesso.`,
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
