import Cliente from "../Modelo/Cliente.js";
//import HospedeBD from "../Persistencia/HospedeBD.js";
//a nossa camada de controle tem a responsabilidade
// de traduzir requisições HTTP em comandos da API

export default class ClienteCTRL {

    gravar(requisicao, resposta) {
        resposta.type('application/json');
        //resposta.headers('Content-Type','application/json');
        //no cabeçalho da requisição a propriedade Content-Type: application/json
        if (requisicao.method === "POST" && requisicao.is("application/json")) {
            const dados = requisicao.body;
            const nome = dados.nome;
            const rg = dados.rg;
            const cpf = dados.cpf;
            const nascimento = dados.nascimento;
            const cep = dados.cep;
            const endereco = dados.endereco;
            const cidade = dados.cidade;
            const estado = dados.estado;
            const contato = dados.contato;
            const historico = dados.historico;

            if (nome && rg && cpf && endereco && cidade && estado) {
                const cliente = new Cliente(0, nome, rg, cpf, nascimento, cep, endereco, cidade, estado, contato, historico);
                cliente.gravar(cliente).then(() => {
                    resposta.json({
                        status: true,
                        mensagem: "Cliente cadastrado com sucesso!"
                    });
                }).catch((erro) => { //funções de callback
                    resposta.json({
                        status: false,
                        mensagem: "Não foi possível gravar os dados do cliente: " + erro.message
                    });
                });
            }
            else { //Faltam dados para o remédio
                resposta.json({
                    status: false,
                    mensagem: "Informe todos os dados do cliente. Verifique a documentação da API."
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
            const rg = dados.rg;
            const cpf = dados.cpf;
            const nascimento = dados.nascimento;
            const cep = dados.cep;
            const endereco = dados.endereco;
            const cidade = dados.cidade;
            const estado = dados.estado;
            const contato = dados.contato;
            const historico = dados.historico;
            if (codigo && nome && rg && cpf && endereco && cidade && estado) {
                const cliente = new Cliente(codigo,nome,rg,cpf,nascimento,cep,endereco,cidade,estado,contato,historico);
                cliente.atualizar(cliente).then(() => {
                    resposta.json({
                        status: true,
                        mensagem: "Dados do cliente atualizados com sucesso!"
                    });
                }).catch((erro) => { //funções de callback
                    resposta.json({
                        status: false,
                        mensagem: "Não foi possível atualizar os dados do cliente: " + erro.message
                    });
                });
            }
            else { //Faltam dados para o medicamento
                resposta.json({
                    status: false,
                    mensagem: "Informe todos os dados do cliente. Verifique a documentação da API."
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

    //Ficou decidido que um cliente será excluído se
    // o codigo dele for informado por meio de um objeto json
    excluir(requisicao, resposta) {
        resposta.type('application/json');
        //resposta.headers('Content-Type','application/json');
        //no cabeçalho da requisição a propriedade Content-Type: application/json
        if (requisicao.method === "DELETE" && requisicao.is("application/json")) {
            const codigo = requisicao.body['codigo'];
            if (codigo) {
                const cliente = new Cliente(codigo);
                cliente.excluir(cliente).then(() => {
                    resposta.json({
                        status: true,
                        mensagem: "Cliente excluído com sucesso!"
                    });
                }).catch((erro) => { //funções de callback
                    resposta.json({
                        status: false,
                        mensagem: "Não foi possível excluir os dados do cliente: " + erro.message
                    });
                });
            }
            else { //Faltam dados para o medicamento
                resposta.json({
                    status: false,
                    mensagem: "Informe o código para a exclusão do cliente. Verifique a documentação da API."
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

    consultar(requisicao, resposta) {
        //params armazena os parâmetros informados na url
        //          requisicao.params['codigo']
        const cpf = requisicao.params['cpf'];
        if (requisicao.method === "GET") {
            const cliente = new Cliente();
            cliente.consultar(cpf).then((listaClientes) => {
                resposta.json(listaClientes);
            }).catch((erro) => {
                resposta.json({
                    status: "false",
                    mensagem: "Falha ao obter cliente(s) : " + erro.message
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