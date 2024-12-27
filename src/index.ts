import express from "express";
import { AdicionarLivro } from "./application/usecases/AdicionarLivro";
import { ListarLivros } from "./application/usecases/ListarLivros";
import { RepositorioDeLivrosPrisma } from "./infrastructure/RepositorioDeLivrosPrisma";

const app = express();
app.use(express.json());

const repositorio = new RepositorioDeLivrosPrisma();

app.post("/livros", async (req, res) => {
  try {
    const { titulo, autor, isbn, ano } = req.body;
    const casoDeUso = new AdicionarLivro(repositorio);
    await casoDeUso.executar({ titulo, autor, isbn, ano });
    res.status(201).send({ message: "Livro adicionado com sucesso!" });
  } catch (error) {
    res.status(400).send({ error: (error as Error).message });
  }
});

app.get("/livros", async (req, res) => {
  try {
    const casoDeUso = new ListarLivros(repositorio);
    const livros = await casoDeUso.executar();
    res.status(200).send(livros);
  } catch (error) {
    res.status(500).send({ error: (error as Error).message });
  }
});

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
