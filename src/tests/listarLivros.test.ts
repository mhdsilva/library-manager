import { describe, it, expect, vi } from "vitest";
import { ListarLivros } from "../application/usecases/ListarLivros";
import { RepositorioDeLivros } from "../application/ports/RepositorioDeLivros";
import { Livro } from "../domain/Livro";

describe("ListarLivros - Teste de Unidade", () => {
  it("deve listar todos os livros cadastrados (mock)", async () => {
    const repositorioMock: RepositorioDeLivros = {
      salvar: vi.fn(),
      listar: vi
        .fn()
        .mockResolvedValue([
          new Livro("Livro 1", "Autor 1", "123", 2020),
          new Livro("Livro 2", "Autor 2", "456", 2021),
        ]),
      buscarPorISBN: vi.fn(),
      buscarPorTitulo: vi.fn(),
    };

    const casoDeUso = new ListarLivros(repositorioMock);

    const resultado = await casoDeUso.executar();

    expect(resultado).toHaveLength(2);
    expect(resultado[0].titulo).toBe("Livro 1");
    expect(resultado[1].titulo).toBe("Livro 2");
  });
});
