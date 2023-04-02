import ItensVendaDAO from "../Persistencia/ItensVendaDAO.js";

class ItensVenda {
    #cab_vendoc
    #procodigo
    #ite_venqtd
    #ite_venvlrunit

    constructor(cab_vendoc=0, procodigo=0, ite_venqtd=0, ite_venvlrunit=0){
        this.#cab_vendoc = cab_vendoc;
        this.#procodigo = procodigo;
        this.#ite_venqtd = ite_venqtd;
        this.#ite_venvlrunit = ite_venvlrunit;
    }

    // Início dos métodos get and set
    
    get cab_vendoc() { return this.#cab_vendoc };
    set cab_vendoc(doc) { this.#cab_vendoc = doc };

    get procodigo() { return this.#procodigo };
    set procodigo(codigo) { this.#procodigo = codigo };

    get ite_venqtd() { return this.#ite_venqtd };
    set ite_venqtd(qtd) { this.#ite_venqtd = qtd};

    get ite_venvlrunit() { return this.#ite_venvlrunit };
    set ite_venvlrunit(valor) { this.#ite_venvlrunit = valor };
    
    // Fim dos métodos get and set

    toJSON(){
        return {
            cab_vendoc     : this.cab_vendoc,
            procodigo      : this.#procodigo,
            ite_venqtd     : this.#ite_venqtd,
            ite_venvlrunit : this.#ite_venvlrunit
        }
    }

    consultar(codigo) {
        const itensVendaDAO = new ItensVendaDAO();
        return itensVendaDAO.consultar(codigo);   
    }

    gravar(itensVenda){
        const itensVendaDAO = new ItensVendaDAO();
        return itensVendaDAO.incluir(itensVenda);
    }

    atualizar(itensVenda){
        const itensVendaDAO = new ItensVendaDAO();
        return itensVendaDAO.alterar(itensVenda); 
    }

    excluir(itensVenda){
        const itensVendaDAO = new ItensVendaDAO();
        return itensVendaDAO.excluir(itensVenda); 
    }
}

export default ItensVenda;