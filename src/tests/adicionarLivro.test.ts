import { describe, it, expect, vi } from "vitest";
import { AdicionarLivro } from "../application/usecases/AdicionarLivro";
import { RepositorioDeLivros } from "../application/ports/RepositorioDeLivros";

describe("AdicionarLivro (Unit)", () => {
  it("deve adicionar um livro válido", async () => {
    const repositorioMock: RepositorioDeLivros = {
      salvar: vi.fn().mockResolvedValue(undefined),
      listar: vi.fn().mockResolvedValue([]),
      buscarPorISBN: vi.fn().mockResolvedValue(null),
      buscarPorTitulo: vi.fn().mockResolvedValue(null),
    };

    const casoDeUso = new AdicionarLivro(repositorioMock);

    const livro = {
      titulo: "Clean Code",
      autor: "Robert C. Martin",
      isbn: "9780132350884",
      ano: 2008,
    };

    await casoDeUso.executar(livro);

    expect(repositorioMock.salvar).toHaveBeenCalledWith(
      expect.objectContaining({
        titulo: "Clean Code",
        autor: "Robert C. Martin",
        isbn: "9780132350884",
        ano: 2008,
      })
    );
  });

  it("deve lançar um erro ao tentar adicionar um livro sem título", async () => {
    const repositorioMock: RepositorioDeLivros = {
      salvar: vi.fn().mockResolvedValue(undefined),
      listar: vi.fn().mockResolvedValue([]),
      buscarPorISBN: vi.fn().mockResolvedValue(null),
      buscarPorTitulo: vi.fn().mockResolvedValue(null),
    };
    const casoDeUso = new AdicionarLivro(repositorioMock);

    const livroInvalido = {
      titulo: "",
      autor: "Autor Teste",
      isbn: "1234567890",
      ano: 2023,
    };

    await expect(casoDeUso.executar(livroInvalido)).rejects.toThrow(
      "Título é obrigatório"
    );
  });
});
