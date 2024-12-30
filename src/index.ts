import express, { Request, Response, RequestHandler } from "express";
import { AdicionarLivro } from "./application/usecases/AdicionarLivro";
import { ListarLivros } from "./application/usecases/ListarLivros";
import { BuscarLivroPorISBN } from "./application/usecases/BuscarLivroPorISBN";
import { BuscarLivroPorTitulo } from "./application/usecases/BuscarLivroPorTitulo";
import { AutenticarUsuario } from "./application/usecases/AutenticarUsuario";
import { RepositorioDeLivrosPrisma } from "./infrastructure/RepositorioDeLivrosPrisma";
import { RepositorioDeUsuariosPrisma } from "./infrastructure/RepositorioDeUsuariosPrisma";
import { authMiddleware } from "../src/infrastructure/middleware/authMiddleware";

const app = express();
app.use(express.json());

const repositorioLivros = new RepositorioDeLivrosPrisma();
const repositorioUsuarios = new RepositorioDeUsuariosPrisma();

interface AddLivroRequest {
  titulo: string;
  autor: string;
  isbn: string;
  ano: number;
}

const loginHandler: RequestHandler = async (req, res) => {
  try {
    const { email, password } = req.body;
    const casoDeUso = new AutenticarUsuario(repositorioUsuarios);
    const token = await casoDeUso.executar(email, password);
    res.status(200).send({ token });
  } catch (error) {
    res.status(400).send({ error: (error as Error).message });
  }
};

const adicionarLivroHandler: RequestHandler<{}, {}, AddLivroRequest> = async (
  req,
  res
) => {
  try {
    const { titulo, autor, isbn, ano } = req.body;
    const casoDeUso = new AdicionarLivro(repositorioLivros);
    await casoDeUso.executar({ titulo, autor, isbn, ano });
    res.status(201).send({ message: "Livro adicionado com sucesso!" });
  } catch (error) {
    res.status(400).send({ error: (error as Error).message });
  }
};

const listarLivrosHandler: RequestHandler = async (req, res) => {
  try {
    const { q } = req.query;
    if (q) {
      const casoDeUso = new BuscarLivroPorTitulo(repositorioLivros);
      const livros = await casoDeUso.executar(q as string);
      res.status(200).send(livros);
      return;
    }
    const casoDeUso = new ListarLivros(repositorioLivros);
    const livros = await casoDeUso.executar();
    res.status(200).send(livros);
  } catch (error) {
    res.status(500).send({ error: (error as Error).message });
  }
};

const buscarLivroPorIsbnHandler: RequestHandler<{ isbn: string }> = async (
  req,
  res
) => {
  try {
    const { isbn } = req.params;
    const casoDeUso = new BuscarLivroPorISBN(repositorioLivros);
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

app.post("/login", loginHandler);
app.post("/livros", authMiddleware(["admin"]), adicionarLivroHandler);
app.get("/livros", authMiddleware(["admin", "reader"]), listarLivrosHandler);
app.get(
  "/livros/:isbn",
  authMiddleware(["admin", "reader"]),
  buscarLivroPorIsbnHandler
);

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
