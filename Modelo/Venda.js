import VendaDAO from "../Persistencia/VendaDAO.js";

class Venda {
    // Atributos
    #cab_vendoc
    #clicodigo
    #cab_vendata
    #cab_venvalor
    #for_pagcodigo
    #cab_vennumparcelas
    #cab_vendiasinter
    #procodigo
    #ite_venqtd
    #ite_venvlrunit

    constructor(cab_vendoc=0, clicodigo=0, cab_vendata='', cab_venvalor=0, for_pagcodigo=0, cab_vennumparcelas=0,
                cab_vendiasinter=[]) {
        this.#cab_vendoc = cab_vendoc;
        this.#clicodigo = clicodigo;
        this.#cab_vendata = cab_vendata;
        this.#cab_venvalor = cab_venvalor;
        this.#for_pagcodigo = for_pagcodigo;
        this.#cab_vennumparcelas = cab_vennumparcelas;
        this.#cab_vendiasinter = cab_vendiasinter;
        
    }

    // Metodos get and set
    get cab_vendoc() { return this.#cab_vendoc };
    set cab_vendoc(doc) { this.#cab_vendoc = doc };

    get clicodigo() { return this.#clicodigo };
    set clicodigo(cod) { this.#clicodigo = cod };

    get cab_vendata() { return this.#cab_vendata };
    set cab_vendata(data) { this.#cab_vendata = data };

    get cab_venvalor() { return this.#cab_venvalor };
    set cab_venvalor(valor) { this.#cab_venvalor = valor };

    get for_pagcodigo() { return this.#for_pagcodigo };
    set for_pagcodigo(cod) { this.#for_pagcodigo = cod };

    get cab_vennumparcelas() { return this.#cab_vennumparcelas };
    set cab_vennumparcelas(nParcelas) { this.#cab_vennumparcelas = nParcelas };

    get cab_vendiasinter() { return this.#cab_vendiasinter };
    set cab_vendiasinter(listaDias) { this.#cab_vendiasinter = listaDias };
    // Fim métodos get an set

    toJSON() {
        return {
            cab_vendoc         : this.#cab_vendoc,
            clicodigo          : this.#clicodigo,
            cab_vendata        : this.#cab_vendata,
            cab_venvalor       : this.#cab_venvalor,
            for_pagcodigo      : this.#for_pagcodigo,
            cab_vennumparcelas : this.#cab_vennumparcelas,
            cab_vendiasinter   : this.#cab_vendiasinter
        }
    }
    
    consultar(doc) {
        const vendaDAO = new VendaDAO();
        return vendaDAO.consultar(doc);   
    }

    gravar(venda){
        const vendaDAO = new VendaDAO();
        return vendaDAO.incluir(venda);
    }

    atualizar(venda){
        const vendaDAO = new VendaDAO();
        return vendaDAO.alterar(venda); 
    }

    excluir(venda){
        const vendaDAO = new VendaDAO();
        return vendaDAO.excluir(venda); 
    }

    proxcab_vendoc() { //próximo incremento da tabela.
        const vendaDAO = new VendaDAO();
        return vendaDAO.proximoCab_VenDoc();   
    }

}

export default Venda;