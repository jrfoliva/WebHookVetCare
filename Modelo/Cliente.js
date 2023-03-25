import ClienteDAO from "../Persistencia/ClienteDAO.js";

export default class Cliente {
    // atributos da classe cliente
    #codigo
    #nome
    #rg
    #cpf
    #nascimento
    #cep
    #endereco
    #cidade
    #estado
    #contato
    #historico

    constructor(codigo = 0, nome = "", rg = "", cpf = "", nascimento = "", cep = "", endereco = "",
        cidade = "", estado = "", contato = "", historico = "") {
        this.#codigo = codigo;
        this.#nome = nome;
        this.#rg = rg;
        this.#cpf = cpf;
        this.#nascimento = nascimento;
        this.#cep = cep;
        this.#endereco = endereco;
        this.#cidade = cidade;
        this.#estado = estado;
        this.#contato = contato;
        this.#historico = historico;
    }

    get codigo() { return this.#codigo; };
    set codigo(novoCod) { this.#codigo = novoCod; };

    get nome() { return this.#nome; };
    set nome(novoNome) { this.#nome = novoNome; };

    get rg() { return this.#rg; };
    set rg(novoRg) { this.#rg = novoRg; };

    get cpf() { return this.#cpf; };
    set cpf(novoCpf) { this.#cpf = novoCpf; };

    get nascimento() { return this.#nascimento; };
    set nascimento(novoNasc) { this.#nascimento = novoNasc; };

    get cep() { return this.#cep; };
    set cep(novoCep) { this.#cep = novoCep; };

    get endereco() { return this.#endereco; };
    set endereco(novoEnd) { this.#endereco = novoEnd };

    get cidade() { return this.#cidade; };
    set cidade(novaCidade) { this.#cidade = novaCidade; };

    get estado() { return this.#estado; };
    set estado(novoEstado) { this.#estado = novoEstado; };

    get contato() { return this.#contato; };
    set contato(novoContato) { this.#contato = novoContato };

    get historico() { return this.#historico; };
    set historico(novoHist) { this.#historico = novoHist; };
    // Fim dos métodos get and set 

    toJSON() {
        return {
            codigo: this.#codigo,
            nome: this.#nome,
            rg: this.#rg,
            cpf: this.#cpf,
            nascimento: this.#nascimento,
            cep: this.#cep,
            endereco: this.#endereco,
            cidade: this.#cidade,
            estado: this.#estado,
            contato: this.#contato,
            historico: this.#historico
        }
    }

    consultar(cpf) {
        const clienteDAO = new ClienteDAO();
        return clienteDAO.consultar(cpf);
    }

    gravar(cliente) {
        const clienteDAO = new ClienteDAO();
        return clienteDAO.incluir(cliente);
    }

    atualizar(cliente) {
        const clienteDAO = new ClienteDAO();
        return clienteDAO.alterar(cliente);
    }

    excluir(cliente) {
        const clienteDAO = new ClienteDAO();
        return clienteDAO.excluir(cliente);
    }

}