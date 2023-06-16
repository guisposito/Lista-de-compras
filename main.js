let listaDeItens = [];

//Coleta formulário
const form = document.getElementById('form-itens');
//Coleta valor do input
const itensInput = document.getElementById('receber-item');
//Pegando a lista para mostrar os itens
const ulItens = document.getElementById('lista-de-itens');
//Pegando a lista que vai mostrar os itens comprados
const ulItensComprados = document.getElementById('itens-comprados');


form.addEventListener('submit',(evento) => {
    evento.preventDefault();
    salvarItem();
    mostrarItem();
    //Mantem o foco no campo do input
    itensInput.focus();
})

function salvarItem() {
    const comprasItem = itensInput.value;
    //comparando valor do objeto
    const checarDuplicado = listaDeItens.some((elemento) => elemento.valor.toUpperCase() === comprasItem.toUpperCase());

    if(checarDuplicado){
        alert("Item Já existe!");
    } else {
        //adiciona um novo objeto no array de objetos
        listaDeItens.push({
            valor: comprasItem,
            checar: false,
        })
        
    }
    //Limpa o campo do input
    itensInput.value = '';
}

function mostrarItem(){
    ulItens.innerHTML = '';
    ulItensComprados.innerHTML = '';

    listaDeItens.forEach((item, index) => {

        if(item.checar) {
            ulItensComprados.innerHTML += `
                 <li class="item-compra is-flex is-justify-content-space-between" data-value="${index}">
                    <div>
                        <input type="checkbox" checked class="is-clickable" />  
                        <span class="itens-comprados is-size-5">${item.valor}</span>
                    </div>
                    <div>
                        <i class="fa-solid fa-trash is-clickable deletar"></i>
                    </div>
                </li>
            `
        }else {
            ulItens.innerHTML += `
                <li class="item-compra is-flex is-justify-content-space-between" data-value="${index}">
                    <div>
                        <input type="checkbox" class="is-clickable" />
                        <input type="text" class="is-size-5" value="${item.valor}"></input>
                    </div>  
                    <div>
                        <i class="fa-solid fa-trash is-clickable deletar"></i>
                    </div>          
                </li>
            `
        }
    })

    //Coletando dados do checkbox
    const inputsCheck = document.querySelectorAll('input[type="checkbox"]');
    inputsCheck.forEach( i => {
        i.addEventListener('click', (evento) => {
            const valorDoElemento = evento.target.parentElement.parentElement.getAttribute('data-value');
            console.log(listaDeItens[valorDoElemento].checar = evento.target.checked)

            mostrarItem();
            //Mantem o foco no campo do input
            itensInput.focus();
        })
    })
}

