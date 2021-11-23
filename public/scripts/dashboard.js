var nome_perfil = localStorage.getItem("NOME");
var email = localStorage.getItem("EMAIL");
var id = localStorage.getItem("ID");
var valor = [];
var periodo = [];
var quantidadeIdeal = 0;
var dados = 0;
var estatisticas = 0;
var quantidadeAtual = 0;

fetch("/usuarios/buscar_informacoes", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        id: id,
    })
}).then(function (resposta) {
    if (resposta.ok) {
        resposta.json().then(json => {
            console.log(json);
            dados = (json);
            for (var contador = 0; contador < dados.length; contador++) {
                periodo.push(dados[contador].tempo);
                valor.push(dados[contador].volume);
            }
            amountValue.innerHTML = Number(dados.length);
            showchart_line();
        });
    } else {
        console.log("Houve um erro ao buscar as informações do usuario");
        resposta.text().then(texto => {
            console.error(texto);
        });
    }
}).catch(function (erro) {
    console.log(erro);
});

fetch("/usuarios/buscar_quantidadeIdeal", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        id: id,
    })
}).then(function (resposta) {
    if (resposta.ok) {
        resposta.json().then(json => {
            localStorage.setItem("VALOR IDEAL", json[0].quantidade_ideal);
            if (localStorage.getItem("VALOR IDEAL") != "null") {
                id_idealValue.innerHTML = localStorage.getItem("VALOR IDEAL");
            } else {
                id_idealValue.innerHTML = "0";
            }

        });
    } else {
        console.log("Houve um erro ao buscar as quantidade do usuario");
        resposta.text().then(texto => {
            console.error(texto);
        });
    }
}).catch(function (erro) {
    console.log(erro);
});

fetch("/usuarios/buscar_estatisticas", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        id: id,
    })
}).then(function (resposta) {
    if (resposta.ok) {
        resposta.json().then(json => {
            console.log((json));
            estatisticas = (json);
            if ((json[0].sumValue) == null || (json[0].lowerValue) == null || (json[0].highestValue) == null || (json[0].averageValue) == null) {
                sumValue.innerHTML = "0";
                lowerValue.innerHTML = "0";
                highestValue.innerHTML = "0";
                averageValue.innerHTML = "0";
                remainingValue.innerHTML = "0";
            } else {
                sumValue.innerHTML = (json[0].sumValue);
                lowerValue.innerHTML = (json[0].lowerValue);
                highestValue.innerHTML = (json[0].highestValue);
                averageValue.innerHTML = (json[0].averageValue.toFixed(2));
                if (Number(localStorage.getItem("VALOR IDEAL") - (json[0].sumValue)) <= 0) {
                    remainingValue.innerHTML = "Você já bateu sua meta do dia";
                    congration.style.display = "flex";
                    id_main.style.filter.blur = "0.1rem";
                } else {
                    remainingValue.innerHTML = Number(localStorage.getItem("VALOR IDEAL") - (json[0].sumValue));
                }
                quantidadeAtual = (json[0].sumValue);
            }
            porcentagemValorRestante = Number((quantidadeAtual * 100 / Number(localStorage.getItem('VALOR IDEAL'))).toFixed(2));
        });
    } else {
        console.log("Houve um erro ao buscar as estatisticas do usuario");
        resposta.text().then(texto => {
            console.error(texto);
        });
    }
}).catch(function (erro) {
    console.log(erro);
});

function close_congration() {
    congration.style.display = "none";
}

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
            p_result.innerHTML = `O ideal é você tomar <b>${ml_water_per_day} ml</b> ou <b>${litro_water_per_day.toFixed(2)} litros</b> de água por dia.
            <br>
            <img src="images/water.gif" style="height: 25vh;">
            <img src="images/save.png" style="cursor: pointer; height: 1.5rem;" onclick= "save_value()">`;
            calculo.style.marginTop = "19vh";
            p_result.style.display = "block";
            quantidadeIdeal = ml_water_per_day;
        } else if (years_old == 18 || years_old <= 55) {
            var ml_per_kg = 35;
            var ml_water_per_day = ml_per_kg * weight;
            var litro_water_per_day = ml_water_per_day / 1000;
            p_result.innerHTML = `O ideal é você tomar <b>${ml_water_per_day} ml</b> ou <b>${litro_water_per_day.toFixed(2)} litros</b> de água por dia.
            <br>
            <img src="images/water.gif" style="height: 25vh;">
            <img src="images/save.png" style="cursor: pointer; height: 1.5rem;" onclick= "save_value()">`;
            calculo.style.marginTop = "19vh";
            p_result.style.display = "block";
            quantidadeIdeal = ml_water_per_day;
        } else if (years_old == 55 || years_old <= 65) {
            var ml_per_kg = 30;
            var ml_water_per_day = ml_per_kg * weight;
            var litro_water_per_day = ml_water_per_day / 1000;
            p_result.innerHTML = `O ideal é você tomar <b>${ml_water_per_day} ml</b> ou <b>${litro_water_per_day.toFixed(2)} litros</b> de água por dia.
            <br>
            <img src="images/water.gif" style="height: 25vh;">
            <img src="images/save.png" style="cursor: pointer; height: 1.5rem;" onclick= "save_value()">`;
            calculo.style.marginTop = "19vh";
            p_result.style.display = "block";
            quantidadeIdeal = ml_water_per_day;
        } else if (years_old > 65) {
            var ml_per_kg = 25;
            var ml_water_per_day = ml_per_kg * weight;
            var litro_water_per_day = ml_water_per_day / 1000;
            p_result.innerHTML = `O ideal é você tomar <b>${ml_water_per_day} ml</b> ou <b>${litro_water_per_day.toFixed(2)} litros</b> de água por dia.
            <br>
            <img src="images/water.gif" style="height: 25vh;">
            <img src="images/save.png" style="cursor: pointer; height: 1.5rem;" onclick= "save_value()">`;
            calculo.style.marginTop = "19vh";
            p_result.style.display = "block";
            quantidadeIdeal = ml_water_per_day;
        }
    };
}

function save_value() {
    fetch("/usuarios/armazenar_valorIdeal", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id: id,
            valor: quantidadeIdeal,
        })
    }).then(function (resposta) {

        if (resposta.ok) {
            resposta.json().then(json => {
                console.log(json);
                window.alert("Valor salvo com sucesso");
                window.location = "dashboard.html";
            });


        } else {

            console.log("Houve um erro ao armazenar o valor ideal do usuario");

            resposta.text().then(texto => {
                console.error(texto);
            });
        }

    }).catch(function (erro) {
        console.log(erro);
    });
}

function contabilizar() {

    if (in_quantidade.value != "" && in_tempo.value != "") {

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
                window.location = "dashboard.html";
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
    if (novo_email.value == "" && novo_nome.value == "") {
        window.alert("Preencha algum campo para pode realizar uma alteração");
        event.preventDefault();
    } else if (novo_email.value == "") {
        novo_email.value = email;
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

            if (resposta.ok) {
                console.log(resposta);
                window.alert("Faça login novamente para que possamos finzalizar as modificações na sua conta");
                sair();
            } else {
                console.log("Houve um erro ao tentar modificar as informações da conta!");
                resposta.text().then(texto => {
                    console.error(texto);
                });
            }
        }).catch(function (erro) {
            console.log(erro);
        })
    } else if (novo_email.value.indexOf("@") == -1 || novo_email.value.indexOf(".com") == -1) {
        window.alert("Ops, e-mail inválido! Verifique e tente novamente.");
    } else if (novo_nome.value == "") {
        novo_nome.value = nome;
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
            if (resposta.ok) {
                console.log(resposta);
                window.alert("Faça login novamente para que possamos finzalizar as modificações na sua conta");
                sair();
            } else {
                console.log("Houve um erro ao tentar modificar as informações da conta!");
                resposta.text().then(texto => {
                    console.error(texto);
                });
            }
        }).catch(function (erro) {
            console.log(erro);
        })
    } else {
        fetch("/usuarios/modificar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                novo_nome: novo_nome.value.trim(),
                novo_email: novo_email.value.trim(),
                nome: nome_perfil,
                id: id,
            })
        }).then(function (resposta) {
            if (resposta.ok) {
                console.log(resposta);
                window.alert("Faça login novamente para que possamos finzalizar as modificações na sua conta");
                sair();
            } else {
                console.log("Houve um erro ao tentar modificar as informações da conta!");
                resposta.text().then(texto => {
                    console.error(texto);
                });
            }
        }).catch(function (erro) {
            console.log(erro);
        })
    }
}

function apagar() {
    var pergunta = window.confirm("Você certeza que deseja apagar sua conta?");
    if (pergunta == false) {
        event.preventDefault();
    } else {
        var confirmacao = window.prompt("Digite confirar para deletar sua conta de forma permanente", "CONFIRMAR");
        if (confirmacao.toUpperCase().trim() == "CONFIRMAR") {
            fetch("/usuarios/apagar_dados", {
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
                } else {
                    console.log("Houve um erro ao tentar deletar as informações da sua conta!");
                    resposta.text().then(texto => {
                        console.error(texto);
                    });
                }
            }).catch(function (erro) {
                console.log(erro);
            })

            fetch("/usuarios/apagar_conta", {
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
                    window.alert(`${nome_perfil} SUA CONTA FOI DELETADA COM SUCESSO`);
                    localStorage.clear();
                    window.location = "./login.html"
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