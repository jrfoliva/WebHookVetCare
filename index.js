/*
    Api que tem como objetivo oferecer ao nosso agente de de conversação:
    - apresentar cards de produtos exibindo as informações dos mesmos,
*/

import express from "express";
import cors from "cors";
import rotaDlgFlow from "./Rotas/RotaDlgFlow.js";
import rotaProdutos from "./Rotas/RotaProdutos.js";
import rotaClientes from "./Rotas/RotaClientes.js";

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

app.listen(port, host, () => {
    console.log(`WebHook-VetCare em execução na porta: ${port}`);
});