import { Router } from "express";
import ProdutoCTRL from "../Controle/ProdutoCTRL.js";
const rotaDlgFlow = new Router();
const produtoCTRL = new ProdutoCTRL();

rotaDlgFlow.post("/", produtoCTRL.processarIntents);

export default rotaDlgFlow;