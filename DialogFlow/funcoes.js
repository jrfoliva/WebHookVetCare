import Produto from "../Modelo/Produto.js";

export function criarMessengerCard() {
    // Função que retorna um objeto o formato card
    // para o DialogFlow Messenger(integração)
    return {
        type: "info",
        title: "",
        subtitle: "",
        image: {
            src: {
                "rawUrl": ""
            }
        },
        "actionLink": ""
    }
}

export function criarCustomCard() {
    // estrutura de card que possa ser reconhecida por web demo, Telegram
    return {
        card: {
            title: "card title",
            subtitle: "card text",
            imageUri: "https://example.com/images/example.png",
            buttons: [
                {
                    "text": "button text",
                    "postback": "https://example.com/path/for/end-user/to/follow"
                }
            ]
        }
    }
}

export async function obterCardsProdutos(tipo = "custom") {
    const modelProduto = new Produto();
    const listaProdutos = await modelProduto.consultar();
    let listaCards = []
    for (const produto of listaProdutos) {
        let card;
        if (tipo === "custom") {
            card = criarCustomCard()
            card['card']['title'] = produto.descricao;
            card['card']['subtitle'] = 'R$ '+ produto.vlrvenda;
            card['card']['imageUri'] = produto.imagem;
            card['card']['buttons']['text'] = "Ir para a loja";
            card['card']['buttons']['postback'] = "https://petlove.com.br";

        } else if (tipo === "messenger") {
            card = criarMessengerCard();
            card['title'] = produto.descricao;
            card['subtitle'] = 'R$ '+ produto.vlrvenda;
            card['image']['src']['rawUrl'] = produto.imagem;
            card['actionLink'] = 'https://petlove.com.br';
        }
        listaCards.push(card);
    }
    return listaCards;
} 
    
