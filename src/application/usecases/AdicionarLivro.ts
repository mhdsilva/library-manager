import { Livro } from "../../domain/Livro";
import { RepositorioDeLivros } from "../ports/RepositorioDeLivros";

interface DadosLivro {
  titulo: string;
  autor: string;
  isbn: string;
  ano: number;
}

export class AdicionarLivro {
  private repositorio: RepositorioDeLivros;

  constructor(repositorio: RepositorioDeLivros) {
    this.repositorio = repositorio;
  }

  public async executar(dados: DadosLivro): Promise<void> {
    const novoLivro = new Livro(
      dados.titulo,
      dados.autor,
      dados.isbn,
      dados.ano
    );
    await this.repositorio.salvar(novoLivro);
  }
}
