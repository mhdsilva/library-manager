import { RepositorioDeLivros } from "../ports/RepositorioDeLivros";
import { Livro } from "../../domain/Livro";

export class BuscarLivroPorTitulo {
  constructor(private repositorio: RepositorioDeLivros) {}

  public async executar(parteTitulo: string): Promise<Livro[]> {
    return await this.repositorio.buscarPorTitulo(parteTitulo);
  }
}
