var database = require("../database/config")

function entrar(email, senha) {
    console.log("REALIZEI LOGIN\n function entrar(): ", email, senha)
    var instrucao = `
        SELECT * FROM usuario WHERE email = '${email}' AND sha2('${senha}', 224);
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function cadastrar(nome, email, senha) {
    console.log("CADASTREI UM USUÁRIO\n function cadastrar():", nome, email, senha);
    var instrucao = `
        INSERT INTO usuario (nome, email, senha) VALUES ('${nome}', '${email}', sha2('${senha}', 224));

    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

//Função de inserir quantidade de água
function contabilizar(id, tempo, quantidade) {
    console.log("ARMAZENEI DADOS DO USUÁRIO PART.1\n function cadastrar():", id, tempo, quantidade);
    var instrucao = `
        INSERT INTO quantidade_agua (tempo,volume, fkusuario) VALUES ('${tempo}', '${quantidade}', ${id});
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

//Função de atualizar informações da conta
function modificar(nome, novo_nome, novo_email, id) {
    console.log("MODIFIQUEI DADOS DA CONTA DO USUÁRIO\n function modificar():", nome, novo_nome, novo_email, id);
    var instrucao = `
        UPDATE usuario SET nome = '${novo_nome}', email = '${novo_email}' WHERE id = ${id};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function apagar_dados(id) {
    console.log("DELETEI OS DADOS DO USUÁRIO \n function apagar():", id);
    var instrucao = `
    DELETE FROM quantidade_agua WHERE fkusuario = ${id};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}
function apagar_conta(id) {
    console.log("DELETEI A CONTA DO USUÁRIO \n function apagar():", id);
    var instrucao = `
    DELETE FROM usuario WHERE id = ${id};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function buscar_informacoes(id) {
    console.log("BUSQUEI INFORMAÇÕES DO USUÁRIO PART.1\n function buscar_informacoes():", id);
    var instrucao = `
    SELECT tempo, volume FROM quantidade_agua WHERE fkusuario = ${id};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function buscar_estatisticas(id) {
    console.log("BUSQUEI INFORMAÇÕES DO USUÁRIO PART.2 \n function buscar_estatisticas():", id);
    var instrucao = `
    SELECT sum(volume) AS 'sumValue', min(volume) AS 'lowerValue', max(volume) AS 'highestValue', avg(volume) AS 'averageValue' FROM quantidade_agua WHERE fkusuario = ${id};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function armazenar_valorIdeal(id, valor) {
    console.log("ARMAZENEI DADOS DO USUÁRIO PART.2 \n function buscar_estatisticas():", id, valor);
    var instrucao = `
        UPDATE usuario SET quantidade_ideal = ${valor} WHERE id = ${id};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function buscar_quantidadeIdeal(id) {
    console.log("BUSQUEI INFORMAÇÕES DO USUÁRIO PART.3\n function buscar_estatisticas():", id);
    var instrucao = `
        SELECT quantidade_ideal FROM usuario WHERE id = ${id};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    entrar,
    cadastrar,
    contabilizar,
    modificar,
    apagar_dados,
    apagar_conta,
    buscar_informacoes,
    buscar_estatisticas,
    armazenar_valorIdeal,
    buscar_quantidadeIdeal,
};