import { RepositorioDeLivros } from "../ports/RepositorioDeLivros";
import { Livro } from "../../domain/Livro";

export class ListarLivros {
  private repositorio: RepositorioDeLivros;

  constructor(repositorio: RepositorioDeLivros) {
    this.repositorio = repositorio;
  }

  public async executar(): Promise<Livro[]> {
    return this.repositorio.listar();
  }
}
