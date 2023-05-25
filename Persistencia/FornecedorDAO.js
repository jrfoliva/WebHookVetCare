import Conectar from "../Persistencia/Conexao.js";
import Fornecedor from "../Modelo/Fornecedor.js";

export default class FornecedorDAO {

    async incluir(fornecedor) {
        if (fornecedor instanceof Fornecedor) {
            const conexao = await Conectar();
            const sql = "INSERT INTO FORNECEDORES(fornome, forcnpj, forcep, \
                                                  forendereco, forcidade, forestado, forvendedor, forcontato) \
                                VALUES(?,?,?,?,?,?,?,?)";
            const valores = [fornecedor.nome, fornecedor.cnpj, fornecedor.cep, fornecedor.endereco, 
                             fornecedor.cidade, fornecedor.uf, fornecedor.vendedor, fornecedor.contato];
            try {
                await conexao.query(sql, valores);
            } catch (error) {
                throw new Error(error);
            }
        }

    }

    async alterar(fornecedor) {
        if (fornecedor instanceof Fornecedor) {
            const conexao = await Conectar();
            const sql = " UPDATE FUNCIONARIOS set fornome=?, forcnpj=?, \
                                                  forcep=?, forendereco=?, forcidade=?, forestado=?,\
                                                  forvendedor=?, forcontato=? \
                          WHERE forcodigo = ? ";
            const valores = [fornecedor.nome, fornecedor.cnpj, fornecedor.cep, fornecedor.endereco, 
                fornecedor.cidade, fornecedor.uf, fornecedor.vendedor, fornecedor.contato, fornecedor.codigo];
            try {
                await conexao.query(sql, valores);
            } catch (error) {
                throw new Error(error);
            }
        }
    }

    async excluir(fornecedor) {
        if (fornecedor instanceof Fornecedor) {
            const conexao = await Conectar();
            const sql = " DELETE FROM FORNECEDORES WHERE forcodigo = ? ";
            const valor = [fornecedor.codigo];
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
        if (!valor) {
            const sql = "SELECT * FROM FORNECEDORES"
            rows = await conexao.query(sql);
        }
        else if (valor.length = 14){
            const sql = "SELECT * FROM FORNECEDORES WHERE forcnpj = ?; "
            const cnpj = [valor];
            rows = await conexao.query(sql, cnpj);
        }
        else if (valor.length < 14 && !isNaN(valor)){
            const sql = "SELECT * FROM FUNCIONARIOS WHERE forcodigo = ?; "
            const codigo = [parseInt(valor)];
            rows = await conexao.query(sql, codigo);
        } 
        else if (isNaN(valor)) {
            const sql = "SELECT * FROM FUNCIONARIOS WHERE fornome like ?; "
            const nome = ['%'+valor+'%'];
            rows = await conexao.query(sql, nome);
        }

        let listaFornecedores = [];
        for (const row of rows[0]) {
            const fornecedor = new Fornecedor(row['forcodigo'], row['fornome'], row['forcnpj'], row['forcep'],
                                              row['forendereco'], row['forcidade'], row['forestado'], 
                                              row['forvendedor'], row['forcontato']);
            listaFornecedores.push(fornecedor);
        }
        return listaFornecedores;
    }
}