import Produto from "../Modelo/Produto.js";
// import ProdutoDAO from "../Persistencia/ProdutoDAO.js";
import { obterCardsProdutos } from "../DialogFlow/funcoes.js";

export default class ProdutoCTRL {
    
    gravar(requisicao, resposta) {
        resposta.type('application/json');
        //resposta.headers('Content-Type','application/json');
        // no cabeçalho da requisição a propriedade Content-Type: application/json
        if (requisicao.method === "POST" && requisicao.is("application/json")) {
            const dados      = requisicao.body;
            const descricao  = dados.descricao;
            const ean        = dados.ean;
            const imagem     = dados.imagem;
            const grupo      = dados.grupo;
            const medida     = dados.medida;
            const custo      = dados.custo;
            const margem     = dados.margem;
            const venda      = dados.venda;
            const estoque    = dados.estoque;
            const vencimento = dados.vencimento;
            const ativo      = dados.ativo;
            
            if (descricao && grupo && custo && margem && venda && ativo) {
                const produto = new Produto(0,descricao,ean,imagem,grupo,medida,custo,margem,venda,estoque,vencimento,ativo);
                produto.gravar(produto).then(() => {
                    resposta.json({
                        status: true,
                        mensagem: "Produto cadastrado com sucesso!"
                    });
                }).catch((erro) => { //funções de callback
                    resposta.json({
                        status: false,
                        mensagem: "Não foi possível gravar os dados do produto: " + erro.message
                    });
                });
            }
            else { //Faltam dados para o remédio
                resposta.json({
                    status: false,
                    mensagem: "Informe todos os dados do produto. Verifique a documentação da API."
                });
            }
        } //requisição não é POST ou não possui dados no formato json
        else {
            resposta.json({
                status: false,
                mensagem: "Método não permitido. Verifique a documentação da API."
            })
        }
    }

    atualizar(requisicao, resposta) {
        resposta.type('application/json');
        //resposta.headers('Content-Type','application/json');
        //no cabeçalho da requisição a propriedade Content-Type: application/json
        if (requisicao.method === "PUT" && requisicao.is("application/json")) {
            const dados      = requisicao.body;
            const codigo     = dados.codigo;   
            const descricao  = dados.descricao;
            const ean        = dados.ean;
            const imagem     = dados.imagem;
            const grupo      = dados.grupo;
            const medida     = dados.medida;
            const custo      = dados.custo;
            const margem     = dados.margem;
            const venda      = dados.venda;
            const estoque    = dados.estoque;
            const vencimento = dados.vencimento;
            const ativo      = dados.ativo;
            if (codigo && descricao && grupo && custo && margem && venda && ativo) {
                const produto = new Produto(codigo,descricao,ean,imagem,grupo,medida,custo,margem,venda,estoque,vencimento,ativo);
                produto.atualizar(produto).then(() => {
                    resposta.json({
                        status: true,
                        mensagem: "Dados do produto atualizados com sucesso!"
                    });
                }).catch((erro) => { //funções de callback
                    resposta.json({
                        status: false,
                        mensagem: "Não foi possível atualizar os dados do produto: " + erro.message
                    });
                });
            }
            else { //Faltam dados do produto
                resposta.json({
                    status: false,
                    mensagem: "Informe todos os dados do produto. Verifique a documentação da API."
                });
            }
        } //requisição não é PUT ou não possui dados no formato json
        else {
            resposta.json({
                status: false,
                mensagem: "Método não permitido. Verifique a documentação da API."
            })
        }
    }

    //Ficou decidido que um produto será excluído se
    // o codigo dele for informado por meio de um objeto json
    excluir(requisicao, resposta) {
        resposta.type('application/json');
        //resposta.headers('Content-Type','application/json');
        //no cabeçalho da requisição a propriedade Content-Type: application/json
        if (requisicao.method === "DELETE" && requisicao.is("application/json")) {
            const dados = requisicao.body;
            const codigo = dados.codigo;
            //const codigo = requisicao.params['codigo'];
            if (codigo) {
                const produto = new Produto(codigo);
                produto.excluir(produto).then(() => {
                    resposta.json({
                        status: true,
                        mensagem: "Produto excluído com sucesso!"
                    });
                }).catch((erro) => { //funções de callback
                    resposta.json({
                        status: false,
                        mensagem: "Não foi possível excluir os dados do produto: " + erro.message
                    });
                });
            }
            else { //Faltam dados para o medicamento
                resposta.json({
                    status: false,
                    mensagem: "Informe o código para a exclusão do produto. Verifique a documentação da API."
                });
            }
        } //requisição não é PUT ou não possui dados no formato json
        else {
            resposta.json({
                status: false,
                mensagem: "Método não permitido. Verifique a documentação da API."
            })
        }
    }


    //Ficou decidido que será possível obter um produto
    //informando seu ean na url, por exemplo:
    consultar(requisicao, resposta) {
        //params armazena os parâmetros informados na url
        //          requisicao.params['codigo']
        const ean = requisicao.params['ean'];
        if (requisicao.method === "GET") {
            const produto = new Produto(0, '', ean);
            produto.consultar(ean).then((listaProdutos) => {
                resposta.json(listaProdutos);
            }).catch((erro) => {
                resposta.json({
                    status: "false",
                    mensagem: "Falha ao obter ao pesquisar produto: " + erro.message
                });
            });
            
        } else {
            resposta.json({
                status: false,
                mensagem: "Método não permitido. Verifique a documentação da API."
            });
        }
    }

    // Processar inteções vindas do DialogFlow ao consumir a API
    async processarIntents(requisicao, resposta) {
        const payload = requisicao.body;
        const intencao = payload['queryResult']['intent']
        if (intencao) {
            if (intencao['displayName'] === 'VendaProdutos - yes') {
                const source = payload["originalDetectIntentRequest"]["source"];
                // resp é a estrutura da resposta
                let resp = { fulfillmentMessages: [] };
                let produtosCards = [];
                if (source) { //ambiente de integração é custom
                    if (source === "DIALOGFLOW_CONSOLE" || source === "telegram") {
                        produtosCards = await obterCardsProdutos('custom');
                        for (const card of produtosCards) {
                            resp['fulfillmentMessages'].push(card);
                        }
                    }

                } else { //ambiente de integração é DialogFlow Messenger
                    produtosCards = await obterCardsProdutos('messenger');
                    resp['fulfillmentMessages'].push({
                       "payload": {
                            "richContent": []
                        }
                    });    
                    resp['fulfillmentMessages'][0]['payload']['richContent'].push(produtosCards); 
                }
                return resposta.json(resp);
            }
        }
    }

}