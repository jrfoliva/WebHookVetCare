import Fornecedor from "../Modelo/Fornecedor.js";
//a nossa camada de controle tem a responsabilidadeFuncionario
// de traduzir requisições HTTP em comandos da API

export default class FornecedorCTRL {

    gravar(requisicao, resposta) {
        resposta.type('application/json');
        //resposta.headers('Content-Type','application/json');
        //no cabeçalho da requisição a propriedade Content-Type: application/json
        if (requisicao.method === "POST" && requisicao.is("application/json")) {
            const dados = requisicao.body;
            const nome = dados.nome;
            const cnpj = dados.cnpj;
            const cep = dados.cep;
            const endereco = dados.endereco;
            const cidade = dados.cidade;
            const uf = dados.uf;
            const vendedor = dados.vendedor;
            const contato = dados.contato;

            if (nome && cnpj && vendedor && contato) {
                const fornecedor = new Fornecedor(0, nome, cnpj, cep, endereco, cidade, uf, vendedor, contato);
                fornecedor.gravar(fornecedor).then(() => {
                    resposta.json({
                        status: true,
                        mensagem: "Fornecedor cadastrado com sucesso!"
                    });
                }).catch((erro) => { //funções de callback
                    resposta.json({
                        status: false,
                        mensagem: "Não foi possível gravar os dados do fornecedor: " + erro.message
                    });
                });
            }
            else { //Faltam dados para o remédio
                resposta.json({
                    status: false,
                    mensagem: "Informe todos os dados do fornecedor. Verifique a documentação da API."
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
            const codigo = dados.codigo;
            const nome = dados.nome;
            const cnpj = dados.cnpj;
            const cep = dados.cep;
            const endereco = dados.endereco;
            const cidade = dados.cidade;
            const uf = dados.uf;
            const vendedor = dados.vendedor;
            const contato = dados.contato;
            
            if (codigo && nome  && cnpj && vendedor && contato) {
                const fornecedor = new Fornecedor(codigo,nome,cnpj,cep,endereco,cidade,uf,vendedor,contato);
                fornecedor.atualizar(fornecedor).then(() => {
                    resposta.json({
                        status: true,
                        mensagem: "Dados do fornecedor atualizados com sucesso!"
                    });
                }).catch((erro) => { //funções de callback
                    resposta.json({
                        status: false,
                        mensagem: "Não foi possível atualizar os dados do fornecedor: " + erro.message
                    });
                });
            }
            else { //Faltam dados para o medicamento
                resposta.json({
                    status: false,
                    mensagem: "Informe todos os dados do fornecedor. Verifique a documentação da API."
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

    //Ficou decidido que um fornecedor será excluído se
    // o codigo dele for informado por meio de um objeto json
    excluir(requisicao, resposta) {
        resposta.type('application/json');
        //resposta.headers('Content-Type','application/json');
        //no cabeçalho da requisição a propriedade Content-Type: application/json
        if (requisicao.method === "DELETE" && requisicao.is("application/json")) {
            const codigo = requisicao.body['codigo'];
            if (codigo) {
                const fornecedor = new Fornecedor(codigo);
                fornecedor.excluir(fornecedor).then(() => {
                    resposta.json({
                        status: true,
                        mensagem: "Fornecedor excluído com sucesso!"
                    });
                }).catch((erro) => { //funções de callback
                    resposta.json({
                        status: false,
                        mensagem: "Não foi possível excluir os dados do fornecedor: " + erro.message
                    });
                });
            }
            else { //Faltam dados para o medicamento
                resposta.json({
                    status: false,
                    mensagem: "Informe o código para a exclusão do fornecedor. Verifique a documentação da API."
                });
            }
        } 
        else {
            resposta.json({
                status: false,
                mensagem: "Método não permitido. Verifique a documentação da API."
            })
        }
    }

    consultar(requisicao, resposta) {
        //params armazena os parâmetros informados na url
        //          requisicao.params['codigo']
        const valor = requisicao.params['valor'];
        if (requisicao.method === "GET") {
            const fornecedor = new Fornecedor();
            fornecedor.consultar(valor).then((listaForn) => {
                resposta.json(listaForn);
            }).catch((erro) => {
                resposta.json({
                    status: "false",
                    mensagem: "Falha ao obter fornecedor(es) : " + erro.message
                });
            });
        } else {
            resposta.json({
                status: false,
                mensagem: "Método não permitido. Verifique a documentação da API."
            });
        }
    }
}