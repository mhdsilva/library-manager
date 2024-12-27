import { Livro } from "../../domain/Livro";

export interface RepositorioDeLivros {
  salvar(livro: Livro): Promise<void>;
  listar(): Promise<Livro[]>;
}
