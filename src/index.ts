import express, { Request, Response, RequestHandler } from "express";
import { AdicionarLivro } from "./application/usecases/AdicionarLivro";
import { ListarLivros } from "./application/usecases/ListarLivros";
import { BuscarLivroPorISBN } from "./application/usecases/BuscarLivroPorISBN";
import { RepositorioDeLivrosPrisma } from "./infrastructure/RepositorioDeLivrosPrisma";

const app = express();
app.use(express.json());

const repositorio = new RepositorioDeLivrosPrisma();

interface AddLivroRequest {
  titulo: string;
  autor: string;
  isbn: string;
  ano: number;
}

interface IsbnParams {
  isbn: string;
}

const adicionarLivroHandler: RequestHandler<{}, {}, AddLivroRequest> = async (
  req,
  res
) => {
  try {
    const { titulo, autor, isbn, ano } = req.body;
    const casoDeUso = new AdicionarLivro(repositorio);
    await casoDeUso.executar({ titulo, autor, isbn, ano });
    res.status(201).send({ message: "Livro adicionado com sucesso!" });
  } catch (error) {
    res.status(400).send({ error: (error as Error).message });
  }
};

const listarLivrosHandler: RequestHandler = async (req, res) => {
  try {
    const casoDeUso = new ListarLivros(repositorio);
    const livros = await casoDeUso.executar();
    res.status(200).send(livros);
  } catch (error) {
    res.status(500).send({ error: (error as Error).message });
  }
};

const buscarLivroPorIsbnHandler: RequestHandler<IsbnParams> = async (
  req,
  res
) => {
  try {
    const { isbn } = req.params;
    const casoDeUso = new BuscarLivroPorISBN(repositorio);
    const livro = await casoDeUso.executar(isbn);
    if (!livro) {
      res.status(404).send({ message: "Livro não encontrado" });
      return;
    }
    res.status(200).send(livro);
  } catch (error) {
    res.status(500).send({ error: (error as Error).message });
  }
};

app.post("/livros", adicionarLivroHandler);
app.get("/livros", listarLivrosHandler);
app.get("/livros/:isbn", buscarLivroPorIsbnHandler);

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
