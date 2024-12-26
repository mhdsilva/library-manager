import { describe, it, expect, vi } from "vitest";
import { AdicionarLivro } from "../application/usecases/AdicionarLivro";

describe("AdicionarLivro", () => {
  it("deve adicionar um livro válido", () => {
    const repositorioMock = {
      salvar: vi.fn(),
    };
    const casoDeUso = new AdicionarLivro(repositorioMock);

    const livro = {
      titulo: "Clean Code",
      autor: "Robert C. Martin",
      isbn: "9780132350884",
      ano: 2008,
    };

    casoDeUso.executar(livro);

    expect(repositorioMock.salvar).toHaveBeenCalledWith(livro);
  });

  it("deve lançar um erro ao tentar adicionar um livro sem título", () => {
    const repositorioMock = {
      salvar: vi.fn(),
    };
    const casoDeUso = new AdicionarLivro(repositorioMock);

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
