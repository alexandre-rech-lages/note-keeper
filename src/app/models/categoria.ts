export class Categoria {
  id?: number;
  titulo: string;

  constructor(titulo: string, id?: number) {
    this.titulo = titulo;
    this.id = id;
  }
}
