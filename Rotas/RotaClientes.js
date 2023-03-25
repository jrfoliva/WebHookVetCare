import { Router } from "express";
import ClienteCTRL from "../Controle/ClienteCTRL.js";
const rotaClientes = new Router();
const clienteCTRL = new ClienteCTRL();

//rotaClientes.get("/", clienteCTRL.consultar);
rotaClientes
.get("/:cpf?", clienteCTRL.consultar)
.post("/", clienteCTRL.gravar)
.put("/", clienteCTRL.atualizar)
.delete("/", clienteCTRL.excluir);

export default rotaClientes;