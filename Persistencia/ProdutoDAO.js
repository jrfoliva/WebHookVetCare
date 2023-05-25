import Produto from "../Modelo/Produto.js";
import Conectar from "../Persistencia/Conexao.js";

export default class ProdutoDAO {

    async incluir(produto) {
        if (produto instanceof Produto) {
            const conexao = await Conectar();
            const sql = "INSERT INTO PRODUTOS(prodescricao, proean, proimagem, grucodigo, promedida, procusto,\
                                              promargem, provenda, proestoque, prolote, provencimento, proativo)\
                                VALUES(?,?,?,?,?,?,?,?,?,?,?,?)";
            const valores = [produto.descricao, produto.ean, produto.imagem, produto.grupocod, produto.unmedida, produto.vlrcusto,
            produto.margem, produto.vlrvenda, produto.estoque, produto.lote, produto.dtvenc, produto.ativo];
            try {
                await conexao.query(sql, valores);
            } catch (error) {
                throw new Error(error);
            }

        }

    }

    async alterar(produto) {
        if (produto instanceof Produto) {
            const conexao = await Conectar();
            const sql = " UPDATE PRODUTOS set prodescricao=?, proean=?, proimagem=?, grucodigo=?, promedida=?, procusto=?,\
                                             promargem=?, provenda=?, proestoque=?, prolote=?, provencimento=?, proativo=?\
                          WHERE procodigo = ?; ";
            const valores = [produto.descricao, produto.ean, produto.imagem, produto.grupocod, produto.unmedida, produto.vlrcusto,
            produto.margem, produto.vlrvenda, produto.estoque, produto.lote, produto.dtvenc, produto.ativo, produto.codigo];
            try {
                await conexao.query(sql, valores);
            } catch (error) {
                throw new Error(error);
            }

        }
    }

    async excluir(produto) {
        const conexao = await Conectar();
        const sql = " DELETE FROM PRODUTOS WHERE procodigo = ? ";
        const valor = [produto.codigo];
        try {
            await conexao.query(sql, valor);
        } catch (error) {
            throw new Error(error);
        }
    }

    async consultar(valor) {
        const conexao = await Conectar();
        let rows = [];
        if (isNaN(valor)) {
            const sql = " SELECT * FROM PRODUTOS WHERE PRODESCRICAO LIKE ? \
                                   ORDER BY PRODESCRICAO; "; //pesquisa por parte da descrição
            if (typeof(valor) === "undefined"){
                valor = '';
            } 
            const desc = ['%'+valor+'%'];
            rows = await conexao.query(sql, desc);
        }
        else {
            try {
                const numValor = parseInt(valor);
                const sql = " SELECT * FROM PRODUTOS WHERE PROCODIGO = ?; "
                const vlr = [valor];
                rows = await conexao.query(sql, vlr);
            } catch (error) {
                throw new Error(error);
            }
        }

        let listaProdutos = [];
        for (const row of rows[0]){
            const produto = new Produto(row['procodigo'], row['prodescricao'], row['proean'],
                    row['proimagem'], row['grucodigo'], row['promedida'], row['procusto'], row['promargem'], 
                    row['provenda'], row['proestoque'], row['prolote'], row['provencimento'], row['proatvio']);
            listaProdutos.push(produto);       
        }
        return listaProdutos;
    }
}