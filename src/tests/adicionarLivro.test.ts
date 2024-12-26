import { describe, it, expect, vi } from "vitest";
import { AdicionarLivro } from "../application/usecases/AdicionarLivro";
import { RepositorioDeLivros } from "../infrastructure/RepositorioDeLivros";

describe("AdicionarLivro", () => {
  it("deve adicionar um livro válido", () => {
    const repositorio = new RepositorioDeLivros();
    const casoDeUso = new AdicionarLivro(repositorio);

    const livro = {
      titulo: "Clean Code",
      autor: "Robert C. Martin",
      isbn: "9780132350884",
      ano: 2008,
    };

    casoDeUso.executar(livro);

    expect(repositorio.salvar).toHaveBeenCalledWith(livro);
  });

  it("deve lançar um erro ao tentar adicionar um livro sem título", () => {
    const repositorio = new RepositorioDeLivros();
    const casoDeUso = new AdicionarLivro(repositorio);

    const livroInvalido = {
      titulo: "",
      autor: "Autor Teste",
      isbn: "1234567890",
      ano: 2023,
    };

    expect(() => casoDeUso.executar(livroInvalido)).toThrow(
      "Título é obrigatório"
    );
  });
});
