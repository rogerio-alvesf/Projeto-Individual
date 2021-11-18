var nome_perfil = localStorage.NOME_USUARIO;
var email = localStorage.EMAIL_USUARIO;
var id = localStorage.ID_USUARIO;
var dados_dashboard = [];

fetch("/usuarios/buscar_infrmacoes", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        id: id,
    })
}).then(function (resposta) {

    if (resposta.ok) {
        console.log(resposta);
        resposta.json(setItem).then(json => {
            console.log(json);
            console.log(JSON.stringify(json));
        });

    } else {

        console.log("Houve um erro ao solicitar o nome do usuario");

        resposta.text().then(texto => {
            console.error(texto);
        });
    }

}).catch(function (erro) {
    console.log(erro);
});

function open_menu() {
    menu.style.display = "block";
    menu.style.display = "flex";
    set_image.innerHTML = `<img src="images/set_up.png" onclick="hidden_menu()">`;
};

function hidden_menu() {
    menu.style.display = "none";
    set_image.innerHTML = `<img src="images/set_down.png" onclick="open_menu()">`;
};

function alterar_conta() {
    manage_account.style.display = "flex";
}

function close_manage_account_option() {
    manage_account.style.display = "none";
}

function calculate() {
    var years_old = (in_years_old.value);
    var weight = (in_weight.value);

    if (years_old == "" || weight == "") {
        if (years_old == "" && weight == "") {
            window.alert("Preencha todos os campos");
        } else if (years_old == "") {
            window.alert("Preencha o campo idade");
        } else if (weight == "") {
            window.alert("Preencha o campo peso");
        } else if (years_old < 0 && weight < 0) {
            window.alert("Idade e peso invalidos");
        } else if (years_old < 0) {
            window.alert("Idade invalida");
        } else if (weight < 0) {
            window.alert("Pesso invalido");
        }
    } else if (years_old != "" && weight != "") {
        if (years_old <= 17) {
            var ml_per_kg = 40;
            var ml_water_per_day = ml_per_kg * weight;
            var litro_water_per_day = ml_water_per_day / 1000;
            p_result.innerHTML = `O ideal é você tomar <b>${ml_water_per_day} ml</b> ou <b>${litro_water_per_day.toFixed(2)} litros</b> de água por dia.`;
            p_result.style.display = "block";
        } else if (years_old == 18 || years_old <= 55) {
            var ml_per_kg = 35;
            var ml_water_per_day = ml_per_kg * weight;
            var litro_water_per_day = ml_water_per_day / 1000;
            p_result.innerHTML = `O ideal é você tomar <b>${ml_water_per_day} ml</b> ou <b>${litro_water_per_day.toFixed(2)} litros</b> de água por dia.`;
            p_result.style.display = "block";
        } else if (years_old == 55 || years_old <= 65) {
            var ml_per_kg = 30;
            var ml_water_per_day = ml_per_kg * weight;
            var litro_water_per_day = ml_water_per_day / 1000;
            p_result.innerHTML = `O ideal é você tomar <b>${ml_water_per_day} ml</b> ou <b>${litro_water_per_day.toFixed(2)} litros</b> de água por dia.`;
            p_result.style.display = "block";
        } else if (years_old > 65) {
            var ml_per_kg = 25;
            var ml_water_per_day = ml_per_kg * weight;
            var litro_water_per_day = ml_water_per_day / 1000;
            p_result.innerHTML = `O ideal é você tomar <b>${ml_water_per_day} ml</b> ou <b>${litro_water_per_day.toFixed(2)} litros</b> de água por dia.`;
            p_result.style.display = "block";
        }
    };
}

function limparFormulario() {
    document.getElementById("form_login").reset();
}

function contabilizar() {

    if (in_quantidade.value != "" && in_tempo.value != "") {
        periodo.push(Number(in_tempo.value) + ",");
        valor.push(Number(in_quantidade.value));

        fetch("/usuarios/contabilizar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                quantidade: Number(in_quantidade.value),
                tempo: in_tempo.value,
                id: id,
            })
        }).then(function (resposta) {

            if (resposta.ok) {
                console.log(resposta);
                window.alert("Valor registrado com sucesso");
                resposta.json().then(json => {
                    console.log(json);
                    console.log(JSON.stringify(json));
                });

            } else {

                console.log("Houve um erro ao tentar contabilizar!");

                resposta.text().then(texto => {
                    console.error(texto);
                });
            }

        }).catch(function (erro) {
            console.log(erro);
        })
    } else if (in_tempo.value == "" && in_quantidade.value == "") {
        window.alert("Valores invalidos");
    } else if (in_quantidade.value == "") {
        window.alert("Valor de água invalida");
    } else if (in_tempo.value == "") {
        window.alert("Valor de tempo invalido");
    }
}

function modificar() {

    fetch("/usuarios/modificar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            novo_nome: novo_nome.value,
            novo_email: novo_email.value,
            nome: nome_perfil,
            id: id,
        })
    }).then(function (resposta) {
        console.log(`MODIFICOU NO THEN DO ${nome_perfil.toUpperCase()}!`);

        if (resposta.ok) {
            console.log(resposta);
            window.alert("Faça login novamente para que possamos finzalizar as modificações na sua conta");
            localStorage.clear();
            window.location = "login.html";

            resposta.json().then(json => {
                console.log(json);
                console.log(JSON.stringify(json));
                console.log(`SEU NOVO NOME DE USUÁRIO SERÁ: ${novo_nome.value}`);
                console.log(`SEU NOVO EMAIL DE USUÁRIO SERÁ: ${novo_email.value}`);
            });
        } else {

            console.log("Houve um erro ao tentar modificar!");

            resposta.text().then(texto => {
                console.error(texto);
            });
        }

    }).catch(function (erro) {
        console.log(erro);
    })
}

function apagar() {
    var pergunta = window.confirm("Você certeza que deseja apagar sua conta?");
    if (pergunta == false) {
        window.location = "/dashboard.html";
    } else {
        var confirmacao = window.prompt("Digite confirar para deletar sua conta de forma permanente", "CONFIRMAR");
        if (confirmacao.toUpperCase().trim() == "CONFIRMAR") {
            fetch("/usuarios/apagar", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id: id,
                })
            }).then(function (resposta) {
                if (resposta.ok) {
                    console.log(resposta);
                    window.alert(`${novo_nome.value} SUA CONTA FOI DELETADA COM SUCESSO`);

                    resposta.json().then(json => {
                        console.log(json);
                        console.log(JSON.stringify(json));
                    });
                    setTimeout(function () {
                        localStorage.clear();
                        window.location = "index.html";
                    }, 1000);
                } else {

                    console.log("Houve um erro ao tentar deletar sua conta!");

                    resposta.text().then(texto => {
                        console.error(texto);
                    });
                }

            }).catch(function (erro) {
                console.log(erro);
            })
        }
    }
}