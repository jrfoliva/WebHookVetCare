create database vetcare;
use vetcare;

-- Padrão para nome das tabelas, referenciando a entidade no plural
-- Campos iniciando com os 3 primeiras letras da tabela

create table Perfis (
	perfcodigo integer auto_increment,
    perfdescricao varchar(20) not null,
    constraint pk_perfil primary key (perfcodigo, perfdescricao)
);

create table Funcionarios (
  funcodigo integer auto_increment,
  funnome varchar(50) not null,
  funcpf varchar(11) not null unique,
  funnascimento date not null,
  perfcodigo integer not null,
  funsenha varchar(8) not null,
  funcep varchar(8),
  funendereco varchar(70) not null,
  funcidade varchar(50) not null,
  funestado varchar(2) not null,
  funcontato varchar(11), 
  constraint pk_funcionarios primary key (funcodigo, funcpf),
  constraint fk_funperf foreign key (perfcodigo) 
  references Perfis(perfcodigo)
);

create table Fornecedores (
	forcodigo integer auto_increment,
    fornome varchar(50) not null,
    forcnpj varchar(14) not null,
    forcep varchar(8),
    forendereco varchar(70) not null,
    forcidade varchar(50) not null,
    forestado varchar(2) not null,
    fornomevendedor varchar(50),
    fortelefone varchar(11) not null,
    constraint pk_fornecedores primary key (forcodigo, forcnpj)
);

-- Tabela de agrupar produtos
create table Grupo (
	grucodigo integer auto_increment,
    grunome varchar(30) not null,
    constraint pk_grupo primary key (grucodigo, grunome)
);

create table Produtos (
	procodigo integer auto_increment,
    prodescricao varchar(50) not null,
    proean varchar(13),  -- código de barras
    proimagem varchar(150), -- imagem adicionado em 18/03/2023 
    grucodigo integer not null,
    promedida varchar(2) not null, -- unidade de medida (UN - Unidade, KG - Quilograma)
    procusto numeric(10,2),
    promargem numeric(4,2),
    provenda numeric(10,2),
    proestoque numeric(10,3),
    provencimento date not null,
    proativo boolean not null,  -- produto ativo / desativo  
    constraint pk_produtos primary key (procodigo, proean),
    constraint fk_produtos_grupo foreign key (grucodigo)
    references grupo (grucodigo)
);

-- Para nomes de tabela compostos, inicia-se por 3 primeiras letras dos nomes entre o caracter "_"
-- Campos, inicia-se 3 primeiras letras do primeiro nome seguido de "_" mais nome 3 primeiras letras do segundo nome 
create table Cabecalho_Compra (
  cab_comdoc integer auto_increment,
  forcodigo integer not null,
  cab_comdata date not null,
  cab_comvalor numeric(10,2) not null,
  cab_comvencimento date not null,
  cab_comnumparcelas integer,
  cab_comdiasinter varchar(20), -- dias de intervalo entre parcelas ex. '30,30' total 60 dias
  constraint pk_cabecalho_compras primary key (cab_comdoc, forcodigo),
  constraint fk_cabcom_fornecedores foreign key (forcodigo)
  references fornecedores (forcodigo)
);

-- Tabela com os itens da compra.
create table Itens_Compra (
  cab_comdoc integer not null,
  procodigo integer not null,
  ite_comqtd numeric(4,3) not null,
  ite_comvlrunit numeric(10,2) not null,
  constraint pk_itens_Compra primary key (cab_comdoc, procodigo),
  constraint fk_itens_Compra_Cabecalho_Compra foreign key (cab_comdoc) references Cabecalho_Compra (cab_comdoc),
  constraint fk_itens_Compra_Produtos foreign key (procodigo) references Produtos (procodigo)
);
 
create table Clientes (
  clicodigo integer auto_increment,
  clinome varchar(50) not null,
  clirg varchar(10),
  clicpf varchar(11) not null unique,
  clinascimento date,
  clicep varchar(8),
  cliendereco varchar(70),
  clicidade varchar(50),
  cliestado varchar(2),
  clicontato varchar(11),
  clihistorico varchar(500),
  constraint pk_clientes primary key (clicodigo, clicpf)
);

create table Forma_Pagamento (
  for_pagcodigo integer auto_increment,
  for_pagdescricao varchar(20) not null,
  constraint pk_forma_pagamento primary key (for_pagcodigo, for_pagdescricao)
);

-- Tabela Cabeçalho da venda
create table Cabecalho_Venda (
  cab_vendoc integer auto_increment,
  clicodigo integer not null,
  cab_vendata date not null,
  cab_venvalor numeric(10,2) not null,
  for_pagcodigo integer not null,
  cab_vennumparcelas integer,
  cab_vendiasinter varchar(20), -- dias de intervalo entre parcelas ex. '30,30' total 60 dias
  constraint pk_cabecalho_venda primary key (cab_vendoc, clicodigo),
  constraint fk_cabven_clientes foreign key (clicodigo)
  references Clientes (clicodigo),
  constraint fk_cabven_forpag foreign key (for_pagcodigo)
  references Forma_Pagamento (for_pagcodigo)
);

-- Tabela com os itens da venda.
create table Itens_Venda (
  cab_vendoc integer not null,
  procodigo integer not null,
  ite_venqtd numeric(4,3) not null,
  ite_venvlrunit numeric(10,2) not null,
  constraint pk_itens_Venda primary key (cab_vendoc, procodigo),
  constraint fk_itens_Venda_Cabecalho_Venda foreign key (cab_vendoc) references Cabecalho_Venda (cab_vendoc),
  constraint fk_itens_Venda_Produtos foreign key (procodigo) references Produtos (procodigo)
);

-- Tipos de contas, exemplo: contas referentes a compras de mercadorias ou outras despesas da empresa 
create table Tipo_Conta (
  tip_concodigo integer auto_increment,
  tip_condescricao varchar(20) not null,
  constraint pk_tipo_conta primary key (tip_concodigo, tip_condescricao)
);

-- Tabela Contas a pagar
-- Quando for despesa informa um número de documento, 
-- quando for conta referente a uma compra com nota fiscal, usa-se o número da nota fiscal como número de documento.
create table Contas (
  conlancamento integer auto_increment,
  tip_concodigo integer not null,
  condocumento integer not null,
  convencimento date not null,
  convalor numeric(10,2) not null,
  conmulta numeric(10,2),
  conjuros numeric(10,2),
  convaloratual numeric(10,2),
  condatapagamento date,
  constraint pk_contas primary key (conlancamento, condocumento)
); 

-- Relatório de vendas de produtos ordenado por margem de lucro, decrescente.
create or replace view vw_vendasProdMargemLucro as
select iv.procodigo, p.prodescricao, ((iv.ite_venqtd) * (iv.ite_venvlrunit)) as valor,
       (((iv.ite_venqtd) * p.procusto)  / (iv.ite_venvlrunit)) as margem
from itens_venda iv inner join produtos p on iv.procodigo = p.procodigo
order by margem desc;

-- Procedure para o relatório de produtos a vencer em um determinado período 
DELIMITER $$;
CREATE or replace PROCEDURE produtos_vencer (IN dtInicio date, IN dtFim)
BEGIN
	select procodigo, prodescricao, provencimento, proestoque FROM PRODUTOS
	where provencimento between dtInicio and dtFim
	order by provencimento 
END $$
DELIMITER ;

-- Relatório de vendas por clientes ordenado por valor decrescente.
create or replace view vw_vendasPorCliente as
select c.clicodigo, c.clinome, cv.cab_vendoc, (sum(cv.cab_venvalor)) as total
from clientes c 
left join cabecalho_venda cv on c.clicodigo = cv.clicodigo 
order by total desc;

-- Relatório de vendas por formas de pagamento
create or replace view vw_vendasPorFormasPagamentos as
select fp.for_pagcodigo, fp.for_pagdescricao, sum(cv.cab_venvalor) as total
from forma_pagamento fp
left join cabecalho_venda cv on fp.for_pagcodigo = cv.for_pagcodigo
group by fp.for_pagcodigo;

-- Triggers para atualização do estoque ao inserir compras
DELIMITER $
CREATE TRIGGER Tgr_ItensCompra_Insert AFTER INSERT
ON itens_compra
FOR EACH ROW
BEGIN
	UPDATE Produtos SET proestoque = proestoque + NEW.ite_comqtd
WHERE procodigo = NEW.procodigo;
END$

-- Triggers para atualização do estoque ao realizar vendas
CREATE TRIGGER Tgr_ItensVenda_Insert AFTER INSERT
ON itens_venda
FOR EACH ROW
BEGIN
	UPDATE Produtos SET proestoque = proestoque - NEW.ite_venqtd
WHERE procodigo = NEW.procodigo;
END$

DELIMITER ;
-- Aqui finaliza a parte do Grupo constituído por Alessa, Flávia, Vanessa e Junior.

-- Tabelas para o trabalho do Renato. criado em 17/03/2022
create table servicos (
  servid integer auto_increment,
  servdesc varchar(25) not null,
  servpreco numeric(7,2) not null,
  constraint pk_servicos primary key(servid, servdesc)
);

