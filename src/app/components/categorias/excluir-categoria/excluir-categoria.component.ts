import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Categoria } from 'src/app/models/categoria';
import { Nota } from 'src/app/models/nota';
import { CategoriaService } from 'src/app/services/categoria.service';

@Component({
  selector: 'app-excluir-categoria',
  templateUrl: './excluir-categoria.component.html',
  styleUrls: ['./excluir-categoria.component.css'],
})
export class ExcluirCategoriaComponent {
  categoria: Categoria;

  constructor(
    private categoriaService: CategoriaService,
    private route: ActivatedRoute,
    private router: Router,
    private toastService: ToastrService
  ) {
    this.categoria = new Categoria('');
  }

  ngOnInit(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!);

    this.categoriaService
      .selecionarPorId(id)
      .subscribe((categoria: Categoria) => {
        this.categoria = categoria;
      });
  }

  excluirCategoria() {
    this.categoriaService.excluir(this.categoria).subscribe(() => {
      this.toastService.success('Categoria excluída com sucesso.', 'Sucesso');

      this.router.navigate(['/categorias', 'listar']);
    });
  }
}
