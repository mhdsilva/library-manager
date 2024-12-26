export class Livro {
  titulo: string;
  autor: string;
  isbn: string;
  ano: number;

  constructor(titulo: string, autor: string, isbn: string, ano: number) {
    if (!titulo) throw new Error("Título é obrigatório");
    if (!isbn) throw new Error("ISBN é obrigatório");
    if (ano > new Date().getFullYear()) throw new Error("Ano inválido");

    this.titulo = titulo;
    this.autor = autor;
    this.isbn = isbn;
    this.ano = ano;
  }
}
