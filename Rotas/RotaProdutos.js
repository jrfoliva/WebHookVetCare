import { Router } from "express";
import ProdutoCTRL from "../Controle/ProdutoCTRL.js";
const rotaProdutos = new Router();
const produtoCTRL = new ProdutoCTRL();

rotaProdutos
.get("/:valor?", produtoCTRL.consultar)
.post('/', produtoCTRL.gravar)
.put('/',produtoCTRL.atualizar)
.delete('/',produtoCTRL.excluir);

export default rotaProdutos;