import { describe, it, expect, vi } from "vitest";
import { BuscarLivroPorISBN } from "../application/usecases/BuscarLivroPorISBN";
import { RepositorioDeLivros } from "../application/ports/RepositorioDeLivros";
import { Livro } from "../domain/Livro";

describe("BuscarLivroPorISBN - Teste de Unidade", () => {
  it("deve retornar o livro ao encontrar ISBN correspondente", async () => {
    const repositorioMock: RepositorioDeLivros = {
      salvar: vi.fn(),
      listar: vi.fn(),
      buscarPorISBN: vi
        .fn()
        .mockResolvedValue(
          new Livro("Clean Code", "Robert C. Martin", "9780132350884", 2008)
        ),
      buscarPorTitulo: vi.fn(),
    };

    const casoDeUso = new BuscarLivroPorISBN(repositorioMock);

    const isbn = "9780132350884";
    const resultado = await casoDeUso.executar(isbn);

    expect(resultado).toBeInstanceOf(Livro);
    expect(resultado?.titulo).toBe("Clean Code");
  });

  it("deve retornar null se o ISBN não for encontrado", async () => {
    const repositorioMock: RepositorioDeLivros = {
      salvar: vi.fn(),
      listar: vi.fn(),
      buscarPorISBN: vi.fn().mockResolvedValue(null),
      buscarPorTitulo: vi.fn(),
    };

    const casoDeUso = new BuscarLivroPorISBN(repositorioMock);

    const resultado = await casoDeUso.executar("isbn-inexistente");
    expect(resultado).toBeNull();
  });
});
