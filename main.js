let listaDeItens = [];

//Coleta formulário
const form = document.getElementById('form-itens');
//Coleta valor do input
const itensInput = document.getElementById('receber-item');

form.addEventListener('submit',(evento) => {
    evento.preventDefault();
    salvarItem();
})

function salvarItem() {
    const comprasItem = itensInput.value;
    
    //adiciona um novo objeto no array de objetos
    listaDeItens.push({
        valor: comprasItem
    })

    console.log(listaDeItens);
}