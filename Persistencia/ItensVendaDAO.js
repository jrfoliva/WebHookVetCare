import Conectar from "../Persistencia/Conexao.js";
import ItensVenda from "../Modelo/ItensVenda.js";

class ItensVendaDAO {

    async incluir(itensVenda) {
        if (itensVenda instanceof ItensVenda) {
            const conexao = await Conectar();
            const sql = "INSERT INTO ITENS_VENDA(cab_vendoc, procodigo, ite_venqtd, ite_venvlrunit)\
                                         VALUES(?,?,?,?)";
            const valores = [itensVenda.cab_vendoc, itensVenda.procodigo, itensVenda.ite_venqtd, itensVenda.ite_venvlrunit];
            await conexao.query(sql, valores);
        }

    }

    async alterar(itensVenda) {
        if (itensVenda instanceof ItensVenda) {
            const conexao = await Conectar();
            const sql = " UPDATE ITENS_VENDA set procodigo=?, ite_venqtd=?, ite_venvlrunit=? \
                                 WHERE cab_vendoc = ?";
            const valores = [itensVenda.procodigo, itensVenda.ite_venqtd, itensVenda.ite_venvlrunit, itensVenda.cab_vendoc];
            await conexao.query(sql, valores);
        }
    }

    async excluir(itensVenda) {
        if (itensVenda instanceof ItensVenda) {
            const conexao = await Conectar();
            const sql = "DELETE FROM ITENS_VENDA WHERE cab_vendoc = ?";
            const valor = [itensVenda.cab_vendoc];
            await conexao.query(sql, valor);
        }
    }

    async consultar(doc=0) {
        const conexao = await Conectar();
        let sql = '';
        if (doc = 0) {
            sql = "SELECT * FROM ITENS_VENDA WHERE cab_vendoc > ? Order by cab_vendata";    
        } else {
            sql = "SELECT * FROM ITENS_VENDA WHERE cab_vendoc = ?";
        }
        const [rows] = await conexao.query(sql, [doc]);
        let listaItens = [];
        for(let row of rows) {
            const itensVenda = new ItensVenda(row['cab_vendoc'], row['procodigo'], row['ite_venqtd'], row['ite_venvlrunit']);
            listaServicos.push(itensVenda);
        }
        return listaItens;
    }
}

export default ItensVendaDAO;