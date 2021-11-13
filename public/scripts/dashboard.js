var nome_perfil = sessionStorage.NOME_USUARIO;
var email = sessionStorage.EMAIL_USUARIO;
var id = sessionStorage.ID_USUARIO;

function open_menu() {
    menu.style.display = "block";
    menu.style.display = "flex";
    set_image.innerHTML = `<img src="images/set_up.png" onclick="hidden_menu()">`;
};

function hidden_menu() {
    menu.style.display = "none";
    set_image.innerHTML = `<img src="images/set_down.png" onclick="open_menu()">`;
};

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

    var account = new URLSearchParams(new FormData(document.getElementById("recorder")));

    console.log("FORM NOME: ", nome);

    fetch("/usuarios/contabilizar", {
        method: "POST",
        body: account,
    }).then(function (resposta) {
        console.log(`INSERIU NO THEN DO ${nome.toUpperCase()}!`)

        if (resposta.ok) {
            console.log(resposta);

            resposta.json().then(json => {
                console.log(json);
                console.log(JSON.stringify(json));

                sessionStorage.NOME_USUARIO = json.nome;

                setTimeout(function () {
                    window.location = "./dashboard.html";
                }, 1000); // apenas para exibir o loading

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

    return false;
}

function modificar() {

    console.log("FORM NOME: ", nome_perfil);

    console.log(id);

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
        console.log(`INSERIU NO THEN DO ${nome_perfil.toUpperCase()}!`)

        if (resposta.ok) {
            console.log(resposta);

            resposta.json().then(json => {
                console.log(json);
                console.log(JSON.stringify(json));
                console.log(`SEU NOVO NOME DE USUÁRIO SERÁ: ${novo_nome.value}`);
                console.log(`SEU NOVO EMAIL DE USUÁRIO SERÁ: ${novo_email.value}`);

                setTimeout(function () {
                    window.location = "./dashboard.html";
                }, 1000); // apenas para exibir o loading

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

    return false;
}