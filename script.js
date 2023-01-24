let nome;

function renderizarMensagem(resposta){
    console.log(resposta)

const lista = resposta.data;

//pegar ul
const container = document.querySelector('.mensagens');

//limpar o conteudo 
container.innerHTML= '';

//percorrer o array 
for(let i = 0; i < lista.length; i++){

    let mensagem = lista[i];

    let templete;

    if (mensagem.to !== 'Todos'){

    templete = `
        <li class="conversa-privada">
                <span class="horario">( ${mensagem.time} )</span>
                <strong>${mensagem.from}</strong>
                <span> reservadamente para </span>
                <strong>${mensagem.to} </strong>
                <span> ${mensagem.text} </span>
        </li>
    `;

    } else if (mensagem.from === null){
        
        templete = `
                
            <li class="entrada-saida">
                <span class="horario">( ${mensagem.time} )</span>
                <strong>${mensagem.from}</strong>
                <span> ${mensagem.text}</span> 
            </li>
        `;
               
    }else if (mensagem.to === 'Todos'){

        templete = ` 
            <li class="conversa-publica">
                <span class="horario">( ${mensagem.time} )</span>
                <strong>${mensagem.from}</strong>
                <span> para</span>
                <strong> ${mensagem.to} </strong>
                <span> ${mensagem.text} </span>
            </li>
        `;
        }
     
    container.innerHTML += templete;
    }

}

 function carregarMensagens(){
    console.log('enviando pedido');
    const promise = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages' , {name:nome});
    promise.then(renderizarMensagem);
 }

 function erroAoRegistrar(erro){
    console.log(erro);
}

function registrouCerto(resposta){
    console.log(resposta);
}

function erroAoAtualizarStatus(erro){
    console.log('erro Status');
    console.log(erro);
}

function sucessoAoAtualizar(resposta){
    console.log('status atualizado');
    console.log(resposta);
}

function atualizarStatus(){
    const promise = axios.post('https://mock-api.driven.com.br/api/v6/uol/status', {name:nome});
    promise.catch(erroAoAtualizarStatus);
    promise.then(sucessoAoAtualizar);
}

function carregarChat(){
    nome = prompt("Qual o seu nome ?");

    registrouCerto();
    carregarMensagens();

    setInterval(atualizarStatus, 5000);
}
carregarChat();
atualizarStatus();
carregarMensagens();
renderizarMensagem();