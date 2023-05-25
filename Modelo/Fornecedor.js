import FornecedorDAO from "../Persistencia/FornecedorDAO.js";

export default class Fornecedor {
    #codigo
    #nome
    #cnpj
    #cep
    #endereco
    #cidade
    #uf
    #vendedor
    #contato

    constructor(codigo=0, nome="", cnpj="", cep="", endereco="", cidade="",
                uf="", vendedor="", contato=""){
        this.#codigo = codigo;
        this.#nome = nome;
        this.#cnpj = cnpj;
        this.#cep = cep;
        this.#endereco = endereco;
        this.#cidade = cidade;
        this.#uf = uf;
        this.#vendedor = vendedor;
        this.#contato = contato;
    }

    get codigo() {return this.#codigo;}
    set codigo(novoCodigo) { this.#codigo = novoCodigo;}

    get nome() {return this.#nome;}
    set nome(novoNome) {this.#nome = novoNome;}

    get cnpj() {return this.#cnpj;}
    set cnpj(novoCNPJ) {this.#cnpj = novoCNPJ;}

    get cep() {return this.#cep;}
    set cep(novoCep) {this.#cep = novoCep;}

    get endereco() {return this.#endereco;}
    set endereco(novoEnd) {this.#endereco = novoEnd;}

    get cidade() {return this.#cidade;}
    set cidade(novaCidade) {this.#cidade = novaCidade;}
    
    get uf() {return this.#uf;}
    set uf(novaUf) { this.#uf = novaUf;}

    get vendedor() {return this.#vendedor;}
    set vendedor(novoVen) {this.#vendedor = novoVen;}

    get contato() {return this.#contato;}
    set contato(novoContato) {this.#contato = novoContato;}
    
    toJSON() {
        return {
            codigo : this.#codigo,
            nome : this.#nome,
            cnpj : this.#cnpj,
            cep : this.#cep,
            endereco : this.#endereco,
            cidade : this.#cidade,
            uf : this.#uf,
            vendedor : this.#vendedor,
            contato: this.#contato
        }
    }

    consultar(valor) {
        const fornecedorDAO = new FornecedorDAO();
        return fornecedorDAO.consultar(valor);
    }

    gravar(fornecedor) {
        const fornecedorDAO = new FornecedorDAO();
        return fornecedorDAO.incluir(fornecedor);
    }

    atualizar(fornecedor) {
        const fornecedorDAO = new FornecedorDAO();
        return fornecedorDAO.alterar(fornecedor);
    }

    excluir(fornecedor) {
        const fornecedorDAO = new FornecedorDAO();
        return fornecedorDAO.excluir(fornecedor);
    }

}