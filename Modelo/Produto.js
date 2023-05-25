import ProdutoDAO from "../Persistencia/ProdutoDAO.js";

export default class Produtos {
    // 
    #codigo
    #descricao
    #ean
    #imagem
    #grupocod
    #unmedida
    #vlrcusto
    #margem
    #vlrvenda
    #estoque
    #lote
    #dtvenc
    #ativo

    constructor(codigo = 0, descricao = "", ean = "", imagem="", grupocod = 0, unmedida = "", vlrcusto = 0.0,
                margem = 0.0, vlrvenda = 0.0, estoque = 0, lote="", dtvenc = "", ativo = true) {

        this.#codigo    = codigo;
        this.#descricao = descricao;
        this.#ean       = ean;
        this.#imagem    = imagem;
        this.#grupocod  = grupocod;
        this.#unmedida  = unmedida;
        this.#vlrcusto  = vlrcusto;
        this.#margem    = margem;
        this.#vlrvenda  = vlrvenda;
        this.#estoque   = estoque;
        this.#lote      = lote
        this.#dtvenc    = dtvenc;
        this.#ativo     = ativo;
    }

    // métodos get e set
    get codigo() { return this.#codigo; }
    set codigo(novoCodigo) { this.#codigo = novoCodigo; }

    get descricao() { return this.#descricao; }
    set descricao(novaDesc) { this.#descricao = novaDesc; }

    get ean() { return this.#ean; }
    set ean(novoEAN) { this.#ean = novoEAN; }

    get imagem() { return this.#imagem; }
    set imagem(novaImg) { this.#imagem = novaImg; }

    get grupocod() { return this.#grupocod; }
    set grupocod(novoGrupo) { this.#grupocod = novoGrupo; }

    get unmedida() { return this.#unmedida; }
    set unmedida(novaMedida) { this.#unmedida = novaMedida; }

    get vlrcusto() { return this.#vlrcusto; }
    set vlrcusto(novoVlr) { this.#vlrcusto = novoVlr; }

    get margem() { return this.#margem; }
    set margem(novaMargem) { this.#margem = novaMargem; }

    get vlrvenda() { return this.#vlrvenda; }
    set vlrvenda(novoVlr) { this.#vlrvenda = novoVlr; }

    get estoque() { return this.#estoque; }
    set estoque(novoEstoque) { this.#estoque = novoEstoque; }

    get lote() {return this.#lote;}
    set lote(novoLote) {this.#lote = novoLote;}
    
    get dtvenc() { return this.#dtvenc; }
    set dtvenc(novaData) { this.#dtvenc = novaData; }

    get ativo() { return this.#ativo; }
    set ativo(atiDes) { this.#ativo = atiDes; }

    // Fim métodos get e set

    toJSON() {
        return {
            codigo    : this.#codigo,
            descricao : this.#descricao,
            ean       : this.#ean,
            grupocod  : this.#grupocod,
            unmedida  : this.#unmedida,
            vlrcusto  : this.#vlrcusto,
            margem    : this.#margem,
            vlrvenda  : this.#vlrvenda,
            estoque   : this.#estoque,
            lote      : this.#lote,
            dtvenc    : this.#dtvenc,
            ativo     : this.#ativo
        }    
    }

    consultar(valor) {
        const produtoDAO = new ProdutoDAO();
        return produtoDAO.consultar(valor);   
    }

    gravar(produto){
        const produtoDAO = new ProdutoDAO();
        return produtoDAO.incluir(produto);
    }

    atualizar(produto){
        const produtoDAO = new ProdutoDAO();
        return produtoDAO.alterar(produto); 
    }

    excluir(produto){
        const produtoDAO = new ProdutoDAO();
        return produtoDAO.excluir(produto); 
    }

}