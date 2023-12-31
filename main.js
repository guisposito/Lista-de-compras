let listaDeItens = [];
let itemAEditar 
//Coleta formulário
const form = document.getElementById('form-itens');
//Coleta valor do input
const itensInput = document.getElementById('receber-item');
//Pegando a lista para mostrar os itens
const ulItens = document.getElementById('lista-de-itens');
//Pegando a lista que vai mostrar os itens comprados
const ulItensComprados = document.getElementById('itens-comprados');
//Recebe informações do local Storage
const listaRecuperada =  localStorage.getItem('listaDeItens', )

function atualizaLocalStorage() {
    //enviando o dado do tipo string para o json do localstorage
    localStorage.setItem('listaDeItens', JSON.stringify(listaDeItens));
}

if(listaRecuperada) {
    //Implementa a lista de json para o novo objeto
    listaDeItens = JSON.parse(listaRecuperada);
    mostrarItem();
} else {
    listaDeItens = [];
}


form.addEventListener('submit',(evento) => {
    //Evita o reloading da pagina
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
    //Esvaziando as listas
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
                        <input type="text" class="is-size-5" value="${item.valor}" ${index !== Number(itemAEditar) ? "disabled" : ""}></input>
                    </div>  
                    <div>
                        ${ index === Number(itemAEditar) ? '<button onclick="salvarEdicao()"><i class="fa-regular fa-floppy-disk is-clickable"></i></button>' : '<i class="fa-regular is-clickable fa-pen-to-square editar"></i>'}
                        <i class="fa-solid fa-trash is-clickable deletar"></i>320
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
            
        })
    })

    const deletarObjetos = document.querySelectorAll(".deletar");
    deletarObjetos.forEach( i => {
        i.addEventListener('click', (evento) => {
            const valorDoElemento = evento.target.parentElement.parentElement.getAttribute('data-value');
            listaDeItens.splice(valorDoElemento, 1);
            mostrarItem();
        })
    })

    const editarItens = document.querySelectorAll(".editar");

    editarItens.forEach( i => {
        i.addEventListener('click', (evento) => {
            itemAEditar = evento.target.parentElement.parentElement.getAttribute('data-value');
            
            mostrarItem();
            
        })
    })

    //salvando os arquivos no localstorage
    atualizaLocalStorage();
}

function salvarEdicao(){
    //referenciando e pegando o valor do item que está sendo editado
    const itemEditado = document.querySelector(`[data-value="${itemAEditar}"] input[type="text"]`);
    listaDeItens[itemAEditar].valor = itemEditado.value;
    alert("O item " +  listaDeItens[itemAEditar].valor + " foi salvo com sucesso");
    //Zerando o valor do indice para nao referenciar sempre o mesmo item
    itemAEditar = -1;
    mostrarItem();
}
