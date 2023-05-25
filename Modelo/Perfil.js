import PerfilDAO from "../Persistencia/PerfilDAO.js";

export default class Perfil {
    #codigo;
    #descricao;

    constructor(codigo=0, descricao=""){
        this.#codigo    = codigo;
        this.#descricao = descricao
    }

    get codigo() {return this.#codigo;}
    set codigo(novoCod) {this.#codigo = novoCod;}

    get descricao() {return this.#descricao;}
    set descricao(novaDesc) {this.#descricao = novaDesc;}

    toJSON(){
        return {
            codigo    : this.#codigo,
            descricao : this.#descricao
        }
    }

    consultar(valor) {
        const perfilDAO = new PerfilDAO();
        return perfilDAO.consultar(valor);
    }

    gravar(perfil) {
        const perfilDAO = new PerfilDAO();
        return perfilDAO.incluir(perfil);
    }

    atualizar(perfil) {
        const perfilDAO = new PerfilDAO();
        return perfilDAO.alterar(perfil);
    }

    excluir(perfil) {
        const perfilDAO = new PerfilDAO();
        return perfilDAO.excluir(perfil);
    }
}

