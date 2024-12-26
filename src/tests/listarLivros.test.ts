import { describe, it, expect } from "vitest";
import { RepositorioDeLivros } from "../infrastructure/RepositorioDeLivros";
import { ListarLivros } from "../application/usecases/ListarLivros";
import { Livro } from "../domain/Livro";

describe("ListarLivros", () => {
  it("deve listar todos os livros cadastrados", () => {
    const repositorio = new RepositorioDeLivros();
    const casoDeUso = new ListarLivros(repositorio);

    const livro1 = new Livro("Livro 1", "Autor 1", "123", 2020);
    const livro2 = new Livro("Livro 2", "Autor 2", "456", 2021);
    repositorio.salvar(livro1);
    repositorio.salvar(livro2);

    const resultado = casoDeUso.executar();

    expect(resultado).toEqual([livro1, livro2]);
  });
});
