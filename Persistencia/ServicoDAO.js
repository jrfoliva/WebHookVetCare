import Servico from "../Modelo/Servico.js";
import Conectar from "../Persistencia/Conexao.js";

export default class ServicoDAO {

    async incluir(servico) {
        if (servico instanceof Servico) {
            const conexao = await Conectar();
            const sql = "INSERT INTO SERVICOS(serdesc, serpreco)\
                                     VALUES(?, ?)";
            const valores = [servico.descricao, servico.preco];
            await conexao.query(sql, valores);
        }

    }

    async alterar(servico) {
        if (servico instanceof Servico) {
            const conexao = await Conectar();
            const sql = " UPDATE SERVICOS set serdesc=?, serpreco=? \
                         WHERE serid = ? ";
            const valores = [servico.descricao, servico.preco, servico.id];
            await conexao.query(sql, valores);
        }
    }

    async excluir(servico) {
        if (servico instanceof Servico) {
            const conexao = await Conectar();
            const sql = "DELETE FROM SERVICOS WHERE serid = ?";
            const valor = [servico.id];
            await conexao.query(sql, valor);
        }
    }

    async consultar() {
        const conexao = await Conectar();
        const sql = "SELECT * FROM SERVICOS"
        const [rows] = await conexao.query(sql);    
        let listaServicos = [];
        rows.array.forEach(row => {
            const servico = new Servico(row['serid'], row['serdesc'], row['serpreco']);
            listaServicos.push(servico);
        });
        return listaServicos;
    }        

}