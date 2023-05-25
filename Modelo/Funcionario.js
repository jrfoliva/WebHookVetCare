import FuncionarioDAO from "../Persistencia/FuncionarioDAO.js";

export default class Funcionario {
    #codigo
    #nome
    #cpf
    #nascimento
    #perfcodigo
    #senha
    #cep
    #endereco
    #cidade
    #uf
    #contato
    #crmv

    constructor(codigo=0, nome="", cpf="", nascimento="", perfcodigo=0, senha="", cep="", endereco="", cidade="",
                uf="", contato="", crmv=""){
        this.#codigo     = codigo;
        this.#nome       = nome;
        this.#cpf        = cpf;
        this.#nascimento = nascimento;
        this.#perfcodigo = perfcodigo;
        this.#senha      = senha;
        this.#cep        = cep;
        this.#endereco   = endereco;
        this.#cidade     = cidade;
        this.#uf         = uf;
        this.#contato    = contato;
        this.#crmv       = crmv;
    }

    get codigo() {return this.#codigo;}
    set codigo(novoCodigo) { this.#codigo = novoCodigo;}

    get nome() {return this.#nome;}
    set nome(novoNome) {this.#nome = novoNome;}

    get cpf() {return this.#cpf;}
    set cpf(novoCpf) {this.#cpf = novoCpf;}

    get nascimento() {return this.#nascimento;}
    set nascimento(novoNasc) {this.#nascimento = novoNasc;}

    get perfcodigo() {return this.#perfcodigo;}
    set perfcodigo(novoPerf) {this.#perfcodigo = novoPerf;}

    get senha() {return this.#senha;}
    set senha(novaSenha) {this.#senha = novaSenha;}

    get cep() {return this.#cep;}
    set cep(novoCep) {this.#cep = novoCep;}

    get endereco() {return this.#endereco;}
    set endereco(novoEnd) {this.#endereco = novoEnd;}

    get cidade() {return this.#cidade;}
    set cidade(novaCidade) {this.#cidade = novaCidade;}
    
    get uf() {return this.#uf;}
    set uf(novaUf) { this.#uf = novaUf;}

    get contato() {return this.#contato;}
    set contato(novoContato) {this.#contato = novoContato;}

    get crmv() {return this.#crmv;}
    set crmv(novoCRMV) {this.#crmv = novoCRMV;}
    
    toJSON() {
        return {
            codigo     : this.#codigo,
            nome       : this.#nome,
            cpf        : this.#cpf,
            nascimento : this.#nascimento,
            perfcodigo : this.#perfcodigo,
            senha      : this.#senha,
            cep        : this.#cep,
            endereco   : this.#endereco,
            cidade     : this.#cidade,
            uf         : this.#uf,
            contato    : this.#contato,
            crmv       : this.#crmv
        }
    }

    consultar(valor) {
        const funcionarioDAO = new FuncionarioDAO();
        return funcionarioDAO.consultar(valor);
    }

    gravar(funcionario) {
        const funcionarioDAO = new FuncionarioDAO();
        return funcionarioDAO.incluir(funcionario);
    }

    atualizar(funcionario) {
        const funcionarioDAO = new FuncionarioDAO();
        return funcionarioDAO.alterar(funcionario);
    }

    excluir(funcionario) {
        const funcionarioDAO = new FuncionarioDAO();
        return funcionarioDAO.excluir(funcionario);
    }
}