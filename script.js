let nome;
let idsetInterval;


function erroaoenviarmensagem(erro){
    console.log('ocorreu um erro');
    console.log(erro);
}

function sucessoaoenviarmensagem(resposta){
    console.log('deu bom');
    console.log(resposta);
} 



function enviarmensagem(){
    const texto = document.querySelector('.texto-input').value;
    
    const novaMensagem = {
            from: nome,
            to: "Texto",
            text: texto,
    }

    const promise = axios.post('https://mock-api.driven.com.br/api/v6/uol/messages', novaMensagem)
    promise.catch(erroaoenviarmensagem)
    promise.then(sucessoaoenviarmensagem)
}




function renderizarMensagem(resposta){
    console.log(resposta)
   

//pegar ul
const container = document.querySelector('.mensagens');

//limpar o conteudo 
container.innerHTML= '';

//percorrer o array 
for(let i = 0; i <resposta.length; i++){

    let mensagem =resposta[i];

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

    } else if (mensagem.type === 'status'){
        
        templete = `
                
            <li class="entrada-saida">
                <span class="horario">( ${mensagem.time} )</span>
                <strong>${mensagem.from}</strong>
                <span> ${mensagem.text}</span> 
            </li>
        `;
               
    }else  if (mensagem.to === 'Todos') {

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

function pegarmensagens(resposta){

    mensagens = resposta.data;
    renderizarMensagem(mensagens);

}

function registrouCerto(resposta){
    console.log(resposta);
    setInterval(atualizarStatus, 5000);
    const promise = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
    promise.then(pegarmensagens)
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

    while(nome === ''){
        alert('Nome invalido');
        nome = prompt("Qual o seu nome ?");
    }

    const promise = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', {name:nome})
  
    promise.then(registrouCerto);
    promise.catch(erroAoRegistrar);





}
carregarChat();
atualizarStatus();
carregarMensagens();
renderizarMensagem();