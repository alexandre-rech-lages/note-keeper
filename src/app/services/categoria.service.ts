import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Categoria } from '../models/categoria';
import { Nota } from '../models/nota';

@Injectable({
  providedIn: 'root',
})
export class CategoriaService {
  private API_URL = 'http://localhost:3000/categorias';

  constructor(private http: HttpClient) {}

  criar(categoria: Categoria): Observable<Categoria> {
    return this.http.post<Categoria>(this.API_URL, categoria);
  }

  editar(categoria: Categoria): Observable<Categoria> {
    const url = `${this.API_URL}/${categoria.id}`;

    return this.http.put<Categoria>(url, categoria);
  }

  excluir(categoria: Categoria): Observable<any> {
    const url = `${this.API_URL}/${categoria.id}`;

    return this.http.delete<Categoria>(url);
  }

  selecionarPorId(id: number): Observable<Categoria> {
    const url = `${this.API_URL}/${id}`;

    return this.http.get<Categoria>(url);
  }

  selecionarTodos(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.API_URL);
  }
}
