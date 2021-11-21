var usuarioModel = require("../models/usuarioModel");

function entrar(req, res) {
    var email = req.body.email;
    var senha = req.body.senha;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {
        usuarioModel.entrar(email, senha)
            .then(
                function (resultado) {
                    console.log(`\nResultados encontrados: ${resultado.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultado)}`); // transforma JSON em String

                    if (resultado.length == 1) {
                        console.log(resultado);
                        res.json(resultado[0]);
                    } else if (resultado.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function cadastrar(req, res) {
    var nome = req.body.nome;
    var email = req.body.email;
    var senha = req.body.senha;

    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else {
        usuarioModel.cadastrar(nome, email, senha)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}


//Função para inserir no quantidade de água
function contabilizar(req, res) {
    var id = req.body.id;
    var tempo = req.body.tempo;
    var quantidade = req.body.quantidade;

    if (id == undefined) {
        res.status(400).send("Seu id está undefined!");
    } else if (tempo == undefined) {
        res.status(400).send("Seu tempo está undefined!");
    } else if (quantidade == undefined) {
        res.status(400).send("Sua quantidade está undefined!");
    } else {
        usuarioModel.contabilizar(id, tempo, quantidade)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao inserir! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

//Atualizar informações

function modificar(req, res) {
    var novo_nome = req.body.novo_nome;
    var novo_email = req.body.novo_email;
    var nome = req.body.nome;
    var id = req.body.id;

    if (novo_nome == undefined) {
        res.status(400).send("Seu novo nome está undefined!");
    } else if (novo_email == undefined) {
        res.status(400).send("Seu novo email está undefined!");
    } else if (nome == undefined) {
        res.status(400).send("Sue nome está undefined!");
    } else if (id == undefined){
        res.status(400).send("Seu id está undefined!");
    }else {
        usuarioModel.modificar(nome, novo_nome, novo_email, id)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao inserir! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

//Função de apagar a conta
function apagar(req, res) {
    var id = req.body.id;

    if (id == undefined){
        res.status(400).send("Seu id está undefined!");
    }else {
        usuarioModel.apagar(id)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao inserir! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function buscar_informacoes(req, res) {
    var id = req.body.id;

    if (id == undefined){
        res.status(400).send("Seu id está undefined!");
    }else {
        usuarioModel.buscar_informacoes(id)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao solicitar as informações! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function buscar_estatisticas(req, res) {
    var id = req.body.id;

    if (id == undefined){
        res.status(400).send("Seu id está undefined!");
    }else {
        usuarioModel.buscar_estatisticas(id)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao solicitar as estatisticas! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function armazenar_valorIdeal(req, res) {
    var id = req.body.id;
    var valor = req.body.valor;

    if (id == undefined){
        res.status(400).send("Seu id está undefined!");
    }else if (valor == undefined){
        res.status(400).send("Seu valor ideal está undefined!");
    }else {
        usuarioModel.armazenar_valorIdeal(id, valor)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao solicitar as estatisticas! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function buscar_quantidadeIdeal(req, res) {
    var id = req.body.id;

    if (id == undefined){
        res.status(400).send("Seu id está undefined!");
    }else {
        usuarioModel.buscar_quantidadeIdeal(id)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao solicitar valor ideal! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}


module.exports = {
    entrar,
    cadastrar,
    contabilizar,
    modificar,
    apagar,
    buscar_informacoes,
    buscar_estatisticas,
    armazenar_valorIdeal,
    buscar_quantidadeIdeal,
}