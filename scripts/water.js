function calculate(){
    var years_old = Number(in_years_old.value);
    var weight = Number(in_weight.value);
    
    if(years_old == "" && weight == ""){
        window.alert("Preencha todos os campos");
    }else if(years_old == ""){
        window.alert("Preencha o campo idade");
    }else if(weight == ""){
        window.alert("Preencha o campo peso");
    }else if(years_old < 0 && weight < 0){
        window.alert("Idade e peso invalidos");
    }else if(years_old < 0){
        window.alert("Idade invalida");
    }else if(weight < 0){
        window.alert("Pesso invalido");
    }else if(years_old <= 17){
        var ml_per_kg = 40;
        var ml_water_per_day = ml_per_kg * weight;
        var litro_water_per_day = ml_water_per_day / 1000;
        p_result.innerHTML = `Você deve beber<b>${ml_water_per_day} ml</b> ou <b>${litro_water_per_day} litros</b>de água por dia.`;
    }
}