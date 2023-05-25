//Classe PerfilCTRL, responsalve por responder requisições de perfis.
import Perfil from "../Modelo/Perfil.js";

export default class PerfilCTRL {
    consultar(requisicao, resposta) {
        //params armazena os parâmetros informados na url
        //          requisicao.params['codigo']
        const valor = requisicao.params['valor'];
        if (requisicao.method === "GET") {
            const perfil = new Perfil();           
            perfil.consultar(valor).then((listaPerf) => {
                resposta.json(listaPerf);

            }).catch((erro) => {
                resposta.json({
                    status: "false",
                    mensagem: "Falha ao obter perfis : " + erro.message
                });
            });
        } else {
            resposta.json({
                status: false,
                mensagem: "Método não permitido. Verifique a documentação da API."
            });
        }
    }
}