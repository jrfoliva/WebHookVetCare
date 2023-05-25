import Conectar from "../Persistencia/Conexao.js";
import Funcionario from "../Modelo/Funcionario.js";

export default class FuncionarioDAO {

    async incluir(funcionario) {
        if (funcionario instanceof Funcionario) {
            const conexao = await Conectar();
            const sql = "INSERT INTO FUNCIONARIOS(funnome, funcpf, funnascimento, perfcodigo, funsenha, funcep, \
                                                  funendereco, funcidade, funestado, funcontato, funcrmv) \
                                VALUES(?,?,?,?,MD5(?),?,?,?,?,?,?)";
            const valores = [funcionario.nome, funcionario.cpf, funcionario.nascimento, funcionario.perfcodigo, 
                funcionario.senha, funcionario.cep, funcionario.endereco, funcionario.cidade, funcionario.uf,
                funcionario.contato, funcionario.crmv];
            try {
                await conexao.query(sql, valores);
            } catch (error) {
                throw new Error(error);
            }
        }

    }

    async alterar(funcionario) {
        if (funcionario instanceof Funcionario) {
            const conexao = await Conectar();
            const sql = " UPDATE FUNCIONARIOS set funnome=?, funcpf=?, funnascimento=?, perfcodigo=?, funsenha=MD5(?), \
                                                  funcep=?, funendereco=?, funcidade=?, funestado=?, funcontato=?, funcrmv=? \
                          WHERE funcodigo = ? ";
            const valores = [funcionario.nome, funcionario.cpf, funcionario.nascimento, funcionario.perfcodigo, 
                funcionario.senha, funcionario.cep, funcionario.endereco, funcionario.cidade, funcionario.uf,
                funcionario.contato, funcionario.crmv, funcionario.codigo];
            try {
                await conexao.query(sql, valores);
            } catch (error) {
                throw new Error(error);
            }

        }
    }

    async excluir(funcionario) {
        if (funcionario instanceof Funcionario) {
            const conexao = await Conectar();
            const sql = " DELETE FROM FUNCIONARIOS WHERE funcodigo = ? ";
            const valor = [funcionario.codigo];
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
            const sql = "SELECT * FROM FUNCIONARIOS"
            rows = await conexao.query(sql);
        }
        else if (valor.length >= 11){
            const sql = "SELECT * FROM FUNCIONARIOS WHERE funcpf = ?; "
            const cpf = [valor];
            rows = await conexao.query(sql, cpf);
        }
        else if (valor.length < 11 && !isNaN(valor)){
            const sql = "SELECT * FROM FUNCIONARIOS WHERE funcodigo = ?; "
            const codigo = [parseInt(valor)];
            rows = await conexao.query(sql, codigo);
        } 
        else if (isNaN(valor)) {
            const sql = "SELECT * FROM FUNCIONARIOS WHERE funnome like ?; "
            const nome = ['%'+valor+'%'];
            rows = await conexao.query(sql, nome);
        }

        let listaFuncionarios = [];
        for (const row of rows[0]) {
            const funcionario = new Funcionario(row['funcodigo'], row['funnome'], row['funcpf'], row['funnascimento'],
                                                row['perfcodigo'], row['funsenha'], row['funcep'], row['funendereco'], 
                                                row['funcidade'], row['funestado'], row['funcontato'], row['funcrmv']);
            listaFuncionarios.push(funcionario);
        }
        return listaFuncionarios;
    }
}