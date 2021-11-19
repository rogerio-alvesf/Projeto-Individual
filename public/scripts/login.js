function entrar() {
    aguardar();

    var formulario = new URLSearchParams(new FormData(document.getElementById("form_login")));

    console.log("FORM LOGIN: ", formulario.get("email"));
    console.log("FORM SENHA: ", formulario.get("senha"));

    fetch("/usuarios/autenticar", {
        method: "POST",
        body: formulario
    }).then(function (resposta) {
        console.log("ESTOU NO THEN DO entrar()!")
        
        if (resposta.ok) {
            console.log(resposta);

            resposta.json(setItem).then(json => {
                console.log(json);
                console.log(JSON.stringify(json));
                localStorage.EMAIL_USUARIO = json.email;
                localStorage.NOME_USUARIO = json.nome;
                localStorage.ID_USUARIO = json.id;
                /*localStorage.setItem('id', json.ID_USUARIO);
                localStorage.setItem('email', json.EMAIL_USUARIO);
                localStorage.setItem('nome', json.NOME_USUARIO);
                */

                setTimeout(function () {
                    window.location = "/index.html";
                }, 1000);
            });

        } else {

            console.log("Erro de login!");

            resposta.text().then(texto => {
                console.error(texto);
                // limparFormulario();
                finalizarAguardar(texto);
            });
        }

    }).catch(function (erro) {
        console.log(erro);
    })
}

function validarSessao() {
    aguardar();

    var login = localStorage.LOGIN_USUARIO;
    var nome = localStorage.NOME_USUARIO;

    if (login == null && nome == null) {
        window.location = "login.html";
    }
}

function sair() {
    localStorage.clear();
    window.location = "login.html";
}