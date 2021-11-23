function limparFormulario() {
    document.getElementById("form_login").reset();
}

function entrar() {

    var formulario = new URLSearchParams(new FormData(document.getElementById("form_login")));

    var email = formulario.get("email");
    var senha = formulario.get("senha");

    console.log("FORM LOGIN: ", email);
    console.log("FORM SENHA: ", senha);

    // TODO: VERIFICAR AS VALIDAÇÕES QUE ELES ESTÃO APRENDENDO EM ALGORITMOS 
    if (email == "" || senha == "") {
        window.alert("Preencha todos os campos para prosseguir!");
        return false;
    }

    if (email.indexOf("@") == -1 || email.indexOf(".com") == -1) {
        window.alert("Ops, e-mail inválido! Verifique e tente novamente.");
        return false;
    }

    fetch("/usuarios/autenticar", {
        method: "POST",
        body: formulario
    }).then(function (resposta) {
        console.log("ESTOU NO THEN DO entrar()!")

        if (resposta.ok) {
            console.log(resposta);

            resposta.json().then(json => {
                console.log(json);
                console.log(JSON.stringify(json));

                localStorage.setItem('ID', json.id);
                localStorage.setItem('EMAIL', json.email);
                localStorage.setItem('NOME', json.nome);

                setTimeout(function () {
                    window.location = "./dashboard.html";
                }, 1000); // apenas para exibir o loading

            });

        } else {

            console.log("Houve um erro ao tentar realizar o login!");

            resposta.text().then(texto => {
                console.error(texto);
                finalizarAguardar(texto);
            });
        }

    }).catch(function (erro) {
        console.log(erro);
    })

    return false;
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

