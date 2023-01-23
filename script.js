let nome;
let mensagem = new Object(); // mensagem aqui será um objeto com varios atributos dentro dele
let user = new Object();

let idIntervalStatus;

user.nome = prompt("Qual é o seu nome ?");



function renderizarMensagem(resposta){
    //console.log(resposta);


    const lista = resposta.data;

   // console.log(lista)

    //pegar ul das mensagens 

    const container = document.querySelector('.mensagens');

    //limpar o conteudo 

    container.innerHTML = '';

    //percorrer array

    for(let i = 0; i < lista.length; i++){
        let mensagens = lista[i];


        let templete;
        if (mensagens.to === 'Todos'){

            templete = `
            <li class="conversa-publica">
                <span class="horario">${mensagens.time} </span>
                <strong>${mensagens.from}</strong>
                <span> para</span>
                <strong> ${mensagens.to} </strong>
                <span> ${mensagens.text} </span>
            </li>
            `;
        } else if( mensagens.type === 'status'){
            templete = `
            <li class="entrada-saida">
                <span class="horario"> ${mensagens.time} </span>
                <strong> ${mensagens.from}</strong>
                <span> ${mensagens.text}</span> 
            </li>
            `;

        } else {
            templete = `
            <li class="conversa-privada">
            <span class="horario"> ${mensagens.time} </span>
            <strong> ${mensagens.from}</strong>
            <span> reservadamente para </span>
            <strong> ${mensagens.to} </strong>
            <span>  ${mensagens.text} ?</span>
            </li>
            `;
        }
        container.innerHTML += templete
    }

}

function carregarMensagens(){
    console.log('enviando pedido')
   const promise = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages')
   promise.then(renderizarMensagem);
   promise.catch(erroAoCarregarMsgs);

}

function registrou(resposta){
 console.log("usuário Cadastrado com sucesso!");
}

function erroAoRegistrar(erro){
    console.log("Status code: " + erro.response.status); // Ex: 404
    console.log("erro no registrar " + erro.response.data); // Ex: Not Found
}

function erroAoCarregarMsgs(erro){
    console.log("Status code: " + erro.response.status); // Ex: 404
    console.log("erro no loadMessages " + erro.response.data); // Ex: Not Found
   }

function registrar(){
   const promise =  axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', user) // não sei que magia era aquela que tu usou aqui, mas acho que assim o servidor vai aceitar melhor rsrr
   promise.then(registrou); 
   promise.catch(erroAoRegistrar);
    
   
}

function erroAtualizarStatus(erro){
    console.log("Status code: " + erro.response.status); // Ex: 404
    console.log("erro no atualzarStatus " + erro.response.data); // Ex: Not Found
}

function sucessoAtualizarStatus(resposta){
    console.log('Status Atualizado');
    console.log(resposta.status); 
}


function atualizarStatus(){
    const promise = axios.post('https://mock-api.driven.com.br/api/v6/uol/status', user);
    promise.then(sucessoAtualizarStatus);
    promise.catch(erroAtualizarStatus);
   
}   

function enviarMensagem(){
    const texto = document.querySelector('input').value;
    const novaMensagem = {
        from: nome,
        to: "Todos",
        text: texto,
    } // aqui tem coisa errada .
}
function erroenviarmensagem(erro){

    console.log("Status code: " + erro.response.status); // Ex: 404
    console.log("erro no envio de Msg " + erro.response.data); // Ex: Not Found
}

function sucessoaoenviar(resposta){ // ta tudo errado aqui kkk  ela chama ela mesma 
    console.log('mensagem enviada');
   
}

function carregarChat(){
    
    registrar();
    carregarMensagens();
    atualizarStatus();

    idIntervalStatus = setInterval(atualizarStatus, 5000);

}


setInterval(() => {
    atualizarStatus();          
}, 5000);



setInterval(() => {
    renderizarMensagem();
}, 3000); 


function enviarMensagem(){
    sendMessage(document.getElementById("mensagemArea").value);
    document.getElementById("txtArea").value= "";
}

function sendMessage(msg){ // passei o valor que ta dentro do input, para enviar agr
    mensagem.from = user.name; // esses ai 
    mensagem.to = "Todos";
    mensagem.text = msg;
    mensagem.type="message";
    const promise = axios.post('https://mock-api.driven.com.br/api/v6/uol/messages', mensagem);  
    promise.then(sucessoaoenviar);
    promise.catch(erroenviarmensagem);
    renderizarMensagem(); // aqui vai carregar os dados da tela pra exibir a msg enviada
    chatContent.scrollIntoView(false);
}

carregarChat();
atualizarStatus();
enviarMensagem()
sendMessage(msg)