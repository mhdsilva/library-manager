import { PrismaClient } from "@prisma/client";
import { Livro } from "../domain/Livro";
import { RepositorioDeLivros } from "../application/ports/RepositorioDeLivros";

export class RepositorioDeLivrosPrisma implements RepositorioDeLivros {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  public async salvar(livro: Livro): Promise<void> {
    const livroExistente = await this.prisma.book.findUnique({
      where: { isbn: livro.isbn },
    });
    if (livroExistente) {
      throw new Error("ISBN já cadastrado");
    }

    await this.prisma.book.create({
      data: {
        titulo: livro.titulo,
        autor: livro.autor,
        isbn: livro.isbn,
        ano: livro.ano,
      },
    });
  }

  public async listar(): Promise<Livro[]> {
    const livrosDB = await this.prisma.book.findMany();
    return livrosDB.map((livroDB) => {
      return new Livro(
        livroDB.titulo,
        livroDB.autor,
        livroDB.isbn,
        livroDB.ano
      );
    });
  }
}
