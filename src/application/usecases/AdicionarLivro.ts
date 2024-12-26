interface Livro {
  titulo: string;
  autor: string;
  isbn: string;
  ano: number;
}

interface RepositorioDeLivros {
  salvar(livro: Livro): void;
}

export class AdicionarLivro {
  private repositorio: RepositorioDeLivros;

  constructor(repositorio: RepositorioDeLivros) {
    this.repositorio = repositorio;
  }

  executar(livro: Livro): void {
    if (!livro.titulo) throw new Error("Título é obrigatório");
    this.repositorio.salvar(livro);
  }
}
