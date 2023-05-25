
import express from "express";
import cors from "cors";
import rotaDlgFlow from "./Rotas/RotaDlgFlow.js";
import rotaProdutos from "./Rotas/RotaProdutos.js";
import rotaClientes from "./Rotas/RotaClientes.js";
import rotaVendas from "./Rotas/RotaVendas.js";
import rotaFuncionarios from "./Rotas/RotaFuncionarios.js";
import rotaFornecedores from "./Rotas/RotaFornecedores.js";
import rotaPerfis from "./Rotas/RotaPerfis.js";

const host = "0.0.0.0";
const port = 5001;

const app = express();

app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"]
}));

app.use(express.json());

// Rotas
app.use('/webhook', rotaDlgFlow);
app.use('/produtos', rotaProdutos);
app.use('/clientes', rotaClientes);
app.use('/vendas', rotaVendas);
app.use('/funcionarios', rotaFuncionarios);
app.use('/perfil', rotaPerfis);
app.use('/fornecedores', rotaFornecedores);
app.use(express.static("./Public"));

app.listen(port, host, () => {
    console.log(`WebHook-VetCare em execução na porta: ${port}`);
});