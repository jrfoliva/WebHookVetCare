import Conectar from "../Persistencia/Conexao.js";
import Venda from "../Modelo/Venda.js";

class VendaDAO {

    async incluir(venda) {
        if (venda instanceof Venda) {
            const conexao = await Conectar();
            
            const sql = "INSERT INTO CABECALHO_VENDA(clicodigo, cab_vendata, cab_venvalor, for_pagcodigo, \
                                                     cab_vennumparcelas, cab_vendiasinter) \
                                         VALUES(?,?,?,?,?,?)";
            const valores = [venda.clicodigo, venda.cab_vendata, venda.cab_venvalor, venda.for_pagcodigo,
                             venda.cab_vennumparcelas, venda.cab_vendiasinter];
            const [rows] = await conexao.query(sql, valores);
            return rows['insertId']
        }
    }

    async alterar(venda) {
        if (venda instanceof Venda) {
            const conexao = await Conectar();
            const sql = " UPDATE CABECALHO_VENDA set clicodigo=?, cab_vendata=?, cab_venvalor=?, for_pagcodigo=?, \
                                                     cab_vennumparcelas=?, cab_vendiasinter=? \
                                WHERE cab_vendoc = ? ";
            const valores = [venda.clicodigo, venda.cab_vendata, venda.cab_venvalor, venda.for_pagcodigo,
                             venda.cab_vennumparcelas, venda.cab_vendiasinter, venda.cab_vendoc];
            await conexao.query(sql, valores);
        }
    }

    async excluir(venda) {
        if (venda instanceof Venda) {
            const conexao = await Conectar();
            const sql = "DELETE FROM CABECALHO_VENDA WHERE cab_vendoc = ?";
            const valor = [venda.cab_vendoc];
            await conexao.query(sql, valor);
        }
    }

    async consultar(doc=0) {
        const conexao = await Conectar();
        let sql = '';
        if (doc === 0){
            sql = "SELECT * FROM CABECALHO_VENDA WHERE cab_vendoc > ?";
        } else {
            sql = "SELECT * FROM CABECALHO_VENDA WHERE cab_vendoc = ?";
        }   
        const [rows] = await conexao.query(sql, [doc]);
        let listaVendas = [];
        for (let row of rows) {
            const venda = new Venda(row['cab_vendoc'], row['clicodigo'], row['cab_vendata'],
            row['cab_venvalor'], row['for_pagcodigo'], row['cab_vennumparcelas'], row['cab_vendiasinter']);
            listaVendas.push(venda);
        }
        return listaVendas;
    }

    async proximoCab_VenDoc() {
        const conexao = await Conectar();
        // const sql = "SELECT AUTO_INCREMENT FROM information_schema.tables \
        //              WHERE table_name = CABECALHO_VENDA AND table_schema = VETCARE ";
        const sql = "SELECT last_insert_id() from CABECALHO_VENDA limit 1";
        const [row] = await conexao.query(sql);
        return row['last_insert_id'] + 1;
    }
}

export default VendaDAO