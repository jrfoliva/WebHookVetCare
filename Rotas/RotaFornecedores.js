import { Router } from "express";
import FornecedorCTRL from "../Controle/FornecedorCTRL.js";
const rotaFornecedores = new Router();
const fornecedorCTRL = new FornecedorCTRL();

//rotaClientes.get("/", clienteCTRL.consultar);
rotaFornecedores
.get("/:valor?", fornecedorCTRL.consultar)
.post("/", fornecedorCTRL.gravar)
.put("/", fornecedorCTRL.atualizar)
.delete("/", fornecedorCTRL.excluir);

export default rotaFornecedores;