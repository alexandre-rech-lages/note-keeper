import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Categoria } from 'src/app/models/categoria';
import { CategoriaService } from 'src/app/services/categoria.service';

@Component({
  selector: 'app-editar-categoria',
  templateUrl: './editar-categoria.component.html',
  styleUrls: ['./editar-categoria.component.css'],
})
export class EditarCategoriaComponent implements OnInit {
  categoria: Categoria;

  constructor(
    private categoriaService: CategoriaService,
    private toastService: ToastrService,
    private router: Router,
    private route: ActivatedRoute
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

  editarCategoria() {
    this.categoriaService.editar(this.categoria).subscribe((categoria) => {
      this.toastService.success(
        `Categoria "${categoria.titulo}" editada com sucesso.`,
        'Sucesso'
      );

      this.router.navigate(['/categorias', 'listar']);
    });
  }
}
