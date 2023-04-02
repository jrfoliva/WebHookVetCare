import Venda from "../Modelo/Venda.js";
import ItensVenda from "../Modelo/ItensVenda.js";


export default class VendaCTRL {

    gravar(requisicao, resposta) {
        resposta.type('application/json');
        //resposta.headers('Content-Type','application/json');
        // no cabeçalho da requisição a propriedade Content-Type: application/json
        if (requisicao.method === "POST" && requisicao.is("application/json")) {
            const dados = requisicao.body;
            let doc = 0;
            const clicodigo = dados.clicodigo;
            const data = dados.data;
            const vlrVenda = dados.vlrVenda;
            const formaPgto = dados.formaPgto;
            const numParcelas = dados.numParcelas;
            const diasIntervalo = dados.diasIntervalo;
            const listaItensVenda = dados.listaItensVenda;

            if (clicodigo && data && vlrVenda && formaPgto && listaItensVenda.length > 0) {
                const cabVenda = new Venda(0, clicodigo, data, vlrVenda, formaPgto, numParcelas, diasIntervalo);
                //doc = cabVenda.proxcab_vendoc().then(() => {
                cabVenda.gravar(cabVenda).then((doc) => { // retorna o insertId (cab_numdoc)
                    for (const produto of listaItensVenda) {
                        const item = new ItensVenda(doc, produto.codigo, produto.qtd, produto.vlrUnit);
                        item.gravar(item).then(() => {

                        }).catch((erro) => {
                            resposta.json({
                                status: false,
                                mensagem: "Não foi possível gravar os itens da venda." + erro.message
                            });
                        });
                    }
                    resposta.json({
                        status: true,
                        mensagem: "Cabeçalho e itens da venda gravados com sucesso!"
                    });
                }).catch((erro) => {
                    resposta.json({
                        status: false,
                        mensagem: "Não foi possível gravar o cabeçalho da venda." + erro.message
                    });
                });
                // }).catch((erro) => {
                //     resposta.json({
                //         status: false,
                //         mensagem: "Não foi possível recuperar o próximo número de documento" + erro.message
                //     });
                // });

            }
            else { //Faltam dados
                resposta.json({
                    status: false,
                    mensagem: "Informe todos os dados da venda. Verifique a documentação da API."
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
            const dados = requisicao.body;
            const doc = dados.doc;
            const clicodigo = dados.clicodigo;
            const data = dados.data;
            const vlrVenda = dados.vlrVenda;
            const formaPgto = dados.formaPgto;
            const numParcelas = dados.numParcelas;
            const diasIntervalo = dados.diasIntervalo;
            const listaItensVenda = dados.listaItensVenda;

            if (clicodigo && data && vlrVenda && formaPgto && listaItensVenda.length > 0) {
                const cabVenda = new Venda(doc, clicodigo, data, vlrVenda, formaPgto, numParcelas, diasIntervalo);
                produto.atualizar(cabVenda).then(() => {
                    for (item of listaItensVenda) {
                        const item = new ItensVenda(doc, item.codigo, item.qtd, item.vlrUnit);
                        item.atualizar(item).then(() => {

                        }).catch((erro) => {
                            resposta.json({
                                status: false,
                                mensagem: "Não foi possível atualizar este item da venda." + erro.message
                            });
                        });
                    }
                }).catch((erro) => { //funções de callback
                    resposta.json({
                        status: false,
                        mensagem: "Não foi possível atualizar a venda: " + erro.message
                    });
                });
            }
            else { //Faltam dados do produto
                resposta.json({
                    status: false,
                    mensagem: "Informe todos os dados da venda. Verifique a documentação da API."
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
            //const doc = dados.doc;
            const doc = requisicao.params['doc'];
            if (doc) {
                const cabVenda = new Venda(codigo);
                cabVenda.excluir(cabVenda).then(() => {
                    resposta.json({
                        status: true,
                        mensagem: "Cabeçalho da venda excluído com sucesso!"
                    });
                    const item = new ItensVenda(doc);
                    item.excluir(item).then(() => {

                    }).catch((erro) => {
                        resposta.json({
                            status: false,
                            mensagem: "Não foi possível excluir um item da venda." + erro.message
                        });

                    });
                }).catch((erro) => { //funções de callback
                    resposta.json({
                        status: false,
                        mensagem: "Não foi possível excluir venda: " + erro.message
                    });
                });
            }
            else { //Faltam dados para o medicamento
                resposta.json({
                    status: false,
                    mensagem: "Informe o documento para a exclusão da venda. Verifique a documentação da API."
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
        const doc = requisicao.params['doc'];
        if (requisicao.method === "GET") {
            const cabVenda = new Venda(doc);
            cabVenda.consultar(doc).then((cabecalho) => {
                const itensVenda = new ItensVenda(doc);
                itensVenda.consultar(doc).then((listaItens) => {
                    resposta.json({
                        cabecalho: cabecalho,
                        listaItens: listaItens,
                        status: true,
                        mensagem: "Cabeção e itens da venda recuperados com sucesso!"
                    });
                });
            }).catch((erro) => {
                resposta.json({
                    status: "false",
                    mensagem: "Falha ao obter o cabeçalho ou itens da venda: " + erro.message
                });
            })

        } else {
            resposta.json({
                status: false,
                mensagem: "Método não permitido. Verifique a documentação da API."
            });
        }
    }


}