import { Livro } from "../domain/Livro";

export class RepositorioDeLivros {
  private livros: Livro[] = [];

  salvar(livro: Livro): void {
    const livroExistente = this.livros.find((l) => l.isbn === livro.isbn);
    if (livroExistente) throw new Error("ISBN já cadastrado");

    this.livros.push(livro);
  }

  listar(): Livro[] {
    return this.livros;
  }
}
