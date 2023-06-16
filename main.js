let listaDeItens = [];

//Coleta formulário
const form = document.getElementById('form-itens');
//Coleta valor do input
const itensInput = document.getElementById('receber-item');
//Pegando a lista para mostrar os itens
const ulItens = document.getElementById('lista-de-itens');

form.addEventListener('submit',(evento) => {
    evento.preventDefault();
    salvarItem();
    mostrarItem();
    
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
            valor: comprasItem
        })
        
    }
    
}

function mostrarItem(){
    ulItens.innerHTML = '';

    listaDeItens.forEach((item, index) => {
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
    })
    const inputsCheck = document.querySelectorAll('input[type="checkbox"]');


    inputsCheck.forEach( i => {
        
        i.addEventListener('click', (evento) => {
            console.log("Fui clicado");
        })
    })
}

