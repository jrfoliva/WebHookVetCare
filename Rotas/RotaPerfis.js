import { Router } from "express";
import PerfilCTRL from "../Controle/PerfilCTRL.js";
const rotaPerfis = new Router();
const perfilCTRL = new PerfilCTRL();


rotaPerfis
.get("/:valor?", perfilCTRL.consultar);
//.post("/", perfilCTRL.gravar)
//.put("/", perfilCTRL.atualizar)
//.delete("/", perfilCTRL.excluir);

export default rotaPerfis;