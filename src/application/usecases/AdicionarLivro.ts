import { RepositorioDeLivros } from "../../infrastructure/RepositorioDeLivros";
import { Livro } from "../../domain/Livro";

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
