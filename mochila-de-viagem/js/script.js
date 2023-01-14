const form = document.getElementById("novoItem")
const lista = document.getElementById("lista")
const itens = JSON.parse(localStorage.getItem("itens")) || [] //transforma os dados para javascript

itens.forEach( (elemento) => {
    criaElemento(elemento) //toda vez que recarregar a pagina os itens vao continuar aparecendo
} )

form.addEventListener("submit", (evento) => {
    evento.preventDefault()

    const nome = evento.target.elements['nome']
    const quantidade = evento.target.elements['quantidade']

    const existe = itens.find( elemento => elemento.nome === nome.value )

    const itemAtual = {
        "nome": nome.value,
        "quantidade": quantidade.value
    }

    if (existe) { //se existe, atualiza a quantidade
        itemAtual.id = existe.id //id do digitado vai ser igual id que já existe na lista
        
        atualizaElemento(itemAtual)

        itens[itens.findIndex(elemento => elemento.id === existe.id)] = itemAtual
    } else { //se nao existe, vai criar elemento 
        itemAtual.id = itens[itens.length -1] ? (itens[itens.length-1]).id + 1 : 0; //se o array existe adiciona 1 ao ultimo id do array, se nao existe, o id dele vai ser 0

        criaElemento(itemAtual)

        itens.push(itemAtual) //adc itens no array
    }

    localStorage.setItem("itens", JSON.stringify(itens)) //adc item no local storage transformando o objeto em string

    nome.value = ""
    quantidade.value = ""
})

function criaElemento(item) {
    const novoItem = document.createElement("li")
    novoItem.classList.add("item")

    const numeroItem = document.createElement("strong")
    numeroItem.innerHTML = item.quantidade
    numeroItem.dataset.id = item.id //da um id para o elemento
    novoItem.appendChild(numeroItem)
    
    novoItem.innerHTML += item.nome

    novoItem.appendChild(botaoDeleta(item.id))

    lista.appendChild(novoItem)
}

function atualizaElemento(item) {
    document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantidade  //vai atualizar a quantidade do elemento com esse id
}

function botaoDeleta(id) {
    const elementoBotao = document.createElement("button")
    elementoBotao.innerText = "X"

    elementoBotao.addEventListener("click", function() {
        deletaElemento(this.parentNode, id)
    })

    return elementoBotao
}

function deletaElemento(tag, id) {
    tag.remove()

    itens.splice(itens.findIndex(elemento => elemento.id === id), 1)

    localStorage.setItem("itens", JSON.stringify(itens))
}
