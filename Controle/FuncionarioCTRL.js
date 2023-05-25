import Funcionario from "../Modelo/Funcionario.js";
//a nossa camada de controle tem a responsabilidade
// de traduzir requisições HTTP em comandos da API

export default class FuncionarioCTRL {

    gravar(requisicao, resposta) {
        resposta.type('application/json');
        //resposta.headers('Content-Type','application/json');
        //no cabeçalho da requisição a propriedade Content-Type: application/json
        if (requisicao.method === "POST" && requisicao.is("application/json")) {
            const dados = requisicao.body;
            const nome = dados.nome;
            const cpf = dados.cpf;
            const nascimento = dados.nascimento;
            const perfcodigo = dados.perfcodigo;
            const senha = dados.senha;
            const cep = dados.cep;
            const endereco = dados.endereco;
            const cidade = dados.cidade;
            const uf = dados.uf;
            const contato = dados.contato;
            const crmv = dados.crmv;

            if (nome && cpf && perfcodigo && endereco && cidade && uf) {
                const funcionario = new Funcionario(0, nome, cpf, nascimento, perfcodigo, senha, cep, endereco, cidade, uf, contato, crmv);
                funcionario.gravar(funcionario).then(() => {
                    resposta.json({
                        status: true,
                        mensagem: "Funcionário cadastrado com sucesso!"
                    });
                }).catch((erro) => { //funções de callback
                    resposta.json({
                        status: false,
                        mensagem: "Não foi possível gravar os dados do funcionario: " + erro.message
                    });
                });
            }
            else { //Faltam dados para o remédio
                resposta.json({
                    status: false,
                    mensagem: "Informe todos os dados do funcionario. Verifique a documentação da API."
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
            const cpf = dados.cpf;
            const nascimento = dados.nascimento;
            const perfcodigo = dados.perfcodigo;
            const senha = dados.senha;
            const cep = dados.cep;
            const endereco = dados.endereco;
            const cidade = dados.cidade;
            const uf = dados.uf;
            const contato = dados.contato;
            const crmv = dados.crmv;
            
            if (codigo && nome  && cpf && perfcodigo && senha && endereco && cidade && uf) {
                const funcionario = new Funcionario(codigo,nome,cpf,nascimento,perfcodigo,senha,cep,endereco,cidade,uf,contato,crmv);
                funcionario.atualizar(funcionario).then(() => {
                    resposta.json({
                        status: true,
                        mensagem: "Dados do funcionario atualizados com sucesso!"
                    });
                }).catch((erro) => { //funções de callback
                    resposta.json({
                        status: false,
                        mensagem: "Não foi possível atualizar os dados do funcionario: " + erro.message
                    });
                });
            }
            else { //Faltam dados para o medicamento
                resposta.json({
                    status: false,
                    mensagem: "Informe todos os dados do funcionario. Verifique a documentação da API."
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

    //Ficou decidido que um funcionario será excluído se
    // o codigo dele for informado por meio de um objeto json
    excluir(requisicao, resposta) {
        resposta.type('application/json');
        //resposta.headers('Content-Type','application/json');
        //no cabeçalho da requisição a propriedade Content-Type: application/json
        if (requisicao.method === "DELETE" && requisicao.is("application/json")) {
            const codigo = requisicao.body['codigo'];
            if (codigo) {
                const funcionario = new Funcionario(codigo);
                funcionario.excluir(funcionario).then(() => {
                    resposta.json({
                        status: true,
                        mensagem: "Funcionário excluído com sucesso!"
                    });
                }).catch((erro) => { //funções de callback
                    resposta.json({
                        status: false,
                        mensagem: "Não foi possível excluir os dados do funcionario: " + erro.message
                    });
                });
            }
            else { //Faltam dados para o medicamento
                resposta.json({
                    status: false,
                    mensagem: "Informe o código para a exclusão do funcionario. Verifique a documentação da API."
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
            const funcionario = new Funcionario();           
            funcionario.consultar(valor).then((listaFunc) => {
                resposta.json(listaFunc);

            }).catch((erro) => {
                resposta.json({
                    status: "false",
                    mensagem: "Falha ao obter funcionario(s) : " + erro.message
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