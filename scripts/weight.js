function point(){

}

function calculate(){
    var height = Number(in_height.value);
    var weight = Number(in_weight.value);
    var imc = weight / (height * height);
    if(height == "" || weight == "" || height <= 0 || weight <= 0){
        if(height == "" && weight == "" || height <= 0 && weight <= 0){
            window.alert("Peso e Altura invalidos.");
        }else if(height == "" || height <= 0){
            window.alert("Altura invalida.");
        }else if(weight == "" || weight <= 0){
            window.alert("Peso invalida.");
        }
    }else{
        if(imc < 16 || imc <= 16.9){
            p_result.style.backgroundColor = "#D63334";
            p_result.innerHTML = `<b>Muito baixo</b>
            Seu IMC é de <b>${imc.toFixed(1)}</b>
            <br>
            Você está muito abaixo do peso ideal. Isso pode ser apenas uma característica pessoal, mas também pode ser um sinal de desnutrição ou de algum problema de saúde. Caso esteja perdendo peso sem motivo aparente, procure um médico.<br>
            * Cálculos válidos apenas para pessoas adultas.`;    
        }else if(imc == 17 || imc <= 18.4){
            p_result.style.backgroundColor = "#FFDB58";
            p_result.innerHTML = `<b>Baixo</b>
            Seu IMC é de <b>${imc.toFixed(1)}</b>
            <br>
            Você está abaixo do peso ideal. Isso pode ser apenas uma característica pessoal, mas também pode ser um sinal de desnutrição ou de algum problema de saúde. Caso esteja perdendo peso sem motivo aparente, procure um médico.<br>
            * Cálculos válidos apenas para pessoas adultas.`;    
        }else if(imc == 18.5 || imc <= 24.9){
            p_result.style.backgroundColor = "#26859E";
            p_result.innerHTML = `<b>Normal</b>
            Seu IMC é de <b>${imc.toFixed(1)}</b>
            <br>
            Parabéns, você está com o peso normal. Recomendamos que mantenha hábitos saudáveis em seu dia a dia. Especialistas sugerem ingerir de 4 a 5 porções diárias de frutas, verduras e legumes, além da prática de exercícios físicos - pelo menos 150 minutos semanais.<br>
            * Cálculos válidos apenas para pessoas adultas.`;    
        }else if(imc == 25 || imc <= 29.9){
            p_result.style.backgroundColor = "#FFDB58";
            p_result.innerHTML = `<b>Acima do peso</b>
            Seu IMC é de <b>${imc.toFixed(1)}</b>
            <br>
            Atenção! Alguns quilos a mais já são suficientes para que algumas pessoas desenvolvam doenças associadas, como diabetes e hipertensão. É importante rever seus hábitos. Procure um médico.<br>
            * Cálculos válidos apenas para pessoas adultas.`;    
        }else if(imc == 30 || imc <= 34.9){
            p_result.style.backgroundColor = "#D63334";
            p_result.innerHTML = `<b>Obesidade Grau I</b>
            Seu IMC é de <b>${imc.toFixed(1)}</b>
            <br>
            Sinal de alerta! O excesso de peso é fator de risco para desenvolvimento de outros problemas de saúde. A boa notícia é que uma pequena perda de peso já traz benefícios à saúde. Procure um médico para definir o tratamento mais adequado para você.<br>
            * Cálculos válidos apenas para pessoas adultas.`;    
        }else if(imc == 35 || imc <= 40){
            p_result.style.backgroundColor = "#D63334";
            p_result.innerHTML = `<b>Obesidade Grau II</b>
            Seu IMC é de <b>${imc.toFixed(1)}</b>
            <br>
            Sinal vermelho! Ao atingir este nível de IMC, o risco de doenças associadas está entre alto e muito alto. Busque ajuda de um profissional de saúde; não perca tempo.<br>
            * Cálculos válidos apenas para pessoas adultas.`;    
        }else if(imc > 40){
            p_result.style.backgroundColor = "#D63334";
            p_result.innerHTML = `<b>Obesidade Grau III</b>
            Seu IMC é de <b>${imc.toFixed(1)}</b>
            <br>
            Sinal vermelho! Ao atingir este nível de IMC, o risco de doenças associadas está entre alto e muito alto. Busque ajuda de um profissional de saúde; não perca tempo.<br>
            * Cálculos válidos apenas para pessoas adultas.`;
        }
        p_result.style.display = "block";
    }
}