var botaoAdicionar = document.querySelector("#buscar-pacientes");

botaoAdicionar.addEventListener("click", function() {
    var xhr = new XMLHttpRequest(); //objeto para fazer requisicao http

    xhr.open("GET", "https://api-pacientes.herokuapp.com/pacientes"); //vai fazer requisicao do tipo get nesse site

    xhr.addEventListener("load", function() { //carrega os dados da pagina
        var erroAjax = document.querySelector("#erro-ajax");

        if (xhr.status == 200) { //se o carregamento der certo(cod 200)
            erroAjax.classList.add("invisivel");
            var resposta = xhr.responseText; //os dados da pagina é a resposta
            var pacientes = JSON.parse(resposta);

            pacientes.forEach(function(paciente) {
                adicionaPacienteNaTabela(paciente);
            });
        } else {
            erroAjax.classList.remove("invisivel");
        }
    });

    xhr.send(); //envia requisicao
});
