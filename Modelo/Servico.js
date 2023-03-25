import ServicoDAO from "../Persistencia/ServicoDAO.js";

export default class Servico {
    #id
    #descricao
    #preco

    constructor(id=0, descricao="", preco=0.0) {
        this.#id        = id;
        this.#descricao = descricao;
        this.#preco     = preco
    }

    // Inícios dos métodos Get e Set
    get id() { return this.#id; }

    set id(novoId) { this.#id = novoId; }

    get descricao() { return this.#descricao; }

    set descricao(novaDesc) { this.#descricao = novaDesc; }

    get preco() { return this.#preco; }

    set preco(novoPreco) { this.#preco = novoPreco; }
    // Fim dos métodos Get e Set

    toJSON(){
        return {
            id        : this.#id,
            descricao : this.#descricao,
            preco     : this.#preco,
        }
    } 
    
    consultar() {
        const servicoDAO = new ServicoDAO();
        return servicoDAO.consultar();
    }
}