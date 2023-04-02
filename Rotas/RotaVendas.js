import { Router } from "express";
import VendaCTRL from "../Controle/VendaCTRL.js";
const rotaVendas = new Router();
const vendaCTRL = new VendaCTRL();

rotaVendas
.get("/:doc?", vendaCTRL.consultar)
.post('/', vendaCTRL.gravar)
.put('/', vendaCTRL.atualizar)
.delete('/', vendaCTRL.excluir);

export default rotaVendas;