import Perfil from "../Modelo/Perfil.js";
import Conectar from "./Conexao.js";

export default class PerfilDAO {
    async incluir(perfil) {
        if (perfil instanceof Perfil) {
            const conexao = await Conectar();
            const sql = "INSERT INTO PERFIS (perfdescricao) \
                                VALUES(?)";
            const valores = [perfil.descricao];
            try {
                await conexao.query(sql, valores);
            } catch (error) {
                throw new Error(error);
            }
        }

    }

    async alterar(perfil) {
        if (perfil instanceof Perfil) {
            const conexao = await Conectar();
            const sql = " UPDATE PERFIS set perfdescricao=? WHERE perfcodigo = ? ";
            const valores = [perfil.descricao, perfil.codigo];
            try {
                await conexao.query(sql, valores);
            } catch (error) {
                throw new Error(error);
            }
        }
    }

    async excluir(perfil) {
        if (perfil instanceof Perfil) {
            const conexao = await Conectar();
            const sql = " DELETE FROM PERFIS WHERE perfcodigo = ? ";
            const valor = [perfil.codigo];
            try {
                await conexao.query(sql, valor);
            } catch (error) {
                throw new Error(error);
            }
        }
    }

    async consultar(valor = '') {
        const conexao = await Conectar()
        let rows = []
        if (isNaN(valor) || valor === "" ) {
            const sql = "SELECT * FROM PERFIS WHERE perfdescricao like ?; ";
            const desc = ['%'+valor+'%'];
            rows = await conexao.query(sql, desc);
        }
        else {
            const sql = " SELECT * FROM PERFIS WHERE perfcodigo = ? ";
            rows = await conexao.query(sql,[valor]);
        }

        let listaPerf = [];
        for (const row of rows[0]) {
            const perfil = new Perfil(row['perfcodigo'], row['perfdescricao']);
            listaPerf.push(perfil);
        }
        return listaPerf;
    }
}