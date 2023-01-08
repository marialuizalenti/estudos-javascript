var tabela = document.querySelector("table");

tabela.addEventListener("dblclick", function(event) { //dblclick -> duplo clique
    event.target.parentNode.classList.add("fadeOut"); // vai adc classe no elemento para rodar o css

    setTimeout(function() { //vai esperar o tempo pra executar a função
        event.target.parentNode.remove(); //quando clicar duas vezes no alvo(target/td clicada) o nó pai vai sumir(parentNode/tr)
    },500); //500ms = 0.5s
})