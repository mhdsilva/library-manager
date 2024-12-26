import express from "express";
import { RepositorioDeLivros } from "./infrastructure/RepositorioDeLivros";
import { AdicionarLivro } from "./application/usecases/AdicionarLivro";
import { ListarLivros } from "./application/usecases/ListarLivros";

const app = express();
app.use(express.json());

const repositorio = new RepositorioDeLivros();

app.post("/livros", (req, res) => {
  try {
    const { titulo, autor, isbn, ano } = req.body;
    const casoDeUso = new AdicionarLivro(repositorio);
    casoDeUso.executar({ titulo, autor, isbn, ano });
    res.status(201).send({ message: "Livro adicionado com sucesso!" });
  } catch (error) {
    res.status(400).send({ error: (error as Error).message });
  }
});

app.get("/livros", (req, res) => {
  const casoDeUso = new ListarLivros(repositorio);
  const livros = casoDeUso.executar();
  res.status(200).send(livros);
});

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
