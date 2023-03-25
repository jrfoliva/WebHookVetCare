import Conectar from "../Persistencia/Conexao.js";
import Cliente from "../Modelo/Cliente.js";

export default class ClienteDAO {

    async incluir(cliente) {
        if (cliente instanceof Cliente) {
            const conexao = await Conectar();
            const sql = "INSERT INTO CLIENTES(clinome, clirg, clicpf, clinascimento, clicep, cliendereco, clicidade,\
                                              cliestado, clicontato, clihistorico)\
                                VALUES(?,?,?,?,?,?,?,?,?,?)";
            const valores = [cliente.nome, cliente.rg, cliente.cpf, cliente.nascimento, cliente.cep,
            cliente.endereco, cliente.cidade, cliente.estado, cliente.contato, cliente.historico];
            try {
                await conexao.query(sql, valores);
            } catch (error) {
                throw new Error(error);
            }

        }

    }

    async alterar(cliente) {
        if (cliente instanceof Cliente) {
            const conexao = await Conectar();
            const sql = " UPDATE CLIENTES set clinome=?, clirg=?, clicpf=?, clinascimento=?, clicep=?, cliendereco=?,\
                                              clicidade=?, cliestado=?, clicontato=?, clihistorico=? \
                          WHERE clicodigo = ? ";
            const valores = [cliente.nome, cliente.rg, cliente.cpf, cliente.nascimento, cliente.cep,
            cliente.endereco, cliente.cidade, cliente.estado, cliente.contato, cliente.historico,
            cliente.codigo];
            try {
                await conexao.query(sql, valores);
            } catch (error) {
                throw new Error(error);
            }

        }
    }

    async excluir(cliente) {
        if (cliente instanceof Cliente) {
            const conexao = await Conectar();
            const sql = " DELETE FROM CLIENTES WHERE clicodigo = ? ";
            const valor = [cliente.codigo];
            try {
                await conexao.query(sql, valor);
            } catch (error) {
                throw new Error(error);
            }
        }
    }

    async consultar(cpf = '') {
        const conexao = await Conectar()
        let rows = []
        if (!cpf) {
            const sql = "SELECT * FROM CLIENTES;"
            rows = await conexao.query(sql);
        }
        else {
            const sql = "SELECT * FROM CLIENTES WHERE clicpf = ?; "
            const valor = [cpf];
            rows = await conexao.query(sql, valor);
        }

        let listaClientes = [];
        for (const row of rows[0]) {
            const cliente = new Cliente(row['clicodigo'], row['clinome'], row['clirg'], row['clicpf'], row['clinascimento'], row['clicep'],
                row['cliendereco'], row['clicidade'], row['cliestado'], row['clicontato'], row['clihistorico']);
            listaClientes.push(cliente);
        }
        return listaClientes;
    }
}