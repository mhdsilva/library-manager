import { RepositorioDeLivros } from "../ports/RepositorioDeLivros";
import { Livro } from "../../domain/Livro";

export class BuscarLivroPorISBN {
  private repositorio: RepositorioDeLivros;

  constructor(repositorio: RepositorioDeLivros) {
    this.repositorio = repositorio;
  }

  public async executar(isbn: string): Promise<Livro | null> {
    const livro = await this.repositorio.buscarPorISBN(isbn);
    return livro;
  }
}
