import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = 3000;

// Em módulos ES não existe __dirname, então ele é reconstruído a partir de import.meta.url
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuração do EJS e da pasta dos templates
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// "Banco de dados" inicial: um array em memória
const times = [
  { id: 1, nome: "Grêmio", estadio: "Arena do Grêmio", cidade: "Porto Alegre" },
  { id: 2, nome: "Peñarol", estadio: "Estádio Centenário", cidade: "Montevidéu" },
  { id: 3, nome: "Boca Juniors", estadio: "La Bombonera", cidade: "Buenos Aires" },
];

// GET / -> página inicial com mensagem de boas-vindas
app.get("/", (req, res) => {
  res.render("index", {
    mensagem: "Bem-vindo ao Catálogo de Times!",
  });
});

// GET /times -> lista de todos os times
app.get("/times", (req, res) => {
  res.render("times", { times });
});

// GET /times/:id -> detalhes de um time
app.get("/times/:id", (req, res) => {
  // req.params.id chega como texto, então é convertido para número
  const id = Number(req.params.id);
  const time = times.find((t) => t.id === id);

  if (!time) {
    return res.status(404).send("Time não encontrado");
  }

  res.render("detalhe", { time });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
