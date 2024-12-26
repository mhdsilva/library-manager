import { RepositorioDeLivros } from "../../infrastructure/RepositorioDeLivros";
import { Livro } from "../../domain/Livro";

export class ListarLivros {
  private repositorio: RepositorioDeLivros;

  constructor(repositorio: RepositorioDeLivros) {
    this.repositorio = repositorio;
  }

  executar(): Livro[] {
    return this.repositorio.listar();
  }
}
