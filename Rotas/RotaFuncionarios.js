import { Router } from "express";
import FuncionarioCTRL from "../Controle/FuncionarioCTRL.js";
const rotaFuncionarios = new Router();
const funcionarioCTRL = new FuncionarioCTRL();

//rotaClientes.get("/", clienteCTRL.consultar);
rotaFuncionarios
.get("/:valor?", funcionarioCTRL.consultar)
.post("/", funcionarioCTRL.gravar)
.put("/", funcionarioCTRL.atualizar)
.delete("/", funcionarioCTRL.excluir);

export default rotaFuncionarios;