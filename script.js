let imagemSorteada = null; // Variável para armazenar a imagem sorteada

document.getElementById('sortearBtn').addEventListener('click', function() {
    // Lista das imagens com nome e número
    const imagens = [
        { arquivo: 'inside.mp4', nome: 'Inside Zone', numero: 1 },
        { arquivo: 'dart.mp4', nome: 'Dart', numero: 2 },
        { arquivo: 'qb-dart.mp4', nome: 'QB Dart', numero: 2 },
        { arquivo: 'stretch.mp4', nome: 'Stretch', numero: 3 },
        { arquivo: 'speed.mp4', nome: 'Speed Option', numero: 4 },
        { arquivo: 'power.mp4', nome: 'Power Read', numero: 5 },
        { arquivo: 'counter-gt.mp4', nome: 'Counter GT', numero: 6 },
        { arquivo: 'qb-counter.mp4', nome: 'QB Counter GT', numero: 6 },
        { arquivo: 'dive.mp4', nome: 'Dive', numero: 7 },
        { arquivo: 'center.mp4', nome: 'Pull Center', numero: 8 },
        { arquivo: 'trap.mp4', nome: 'Trap', numero: 9 }
    ];

    const indiceAleatorio = Math.floor(Math.random() * imagens.length);
    imagemSorteada = imagens[indiceAleatorio];
    const caminhoDaImagem = `videos/${imagemSorteada.arquivo}`;

    let imagemElement = document.querySelector('#imagemContainer video');
    if (!imagemElement) {
        imagemElement = document.createElement('video');

        imagemElement.setAttribute('autoplay', '');
        imagemElement.setAttribute('muted', '');
        
        document.getElementById('imagemContainer').appendChild(imagemElement);
    }

    imagemElement.muted = true;
    
    imagemElement.src = caminhoDaImagem;

    // Remove a classe 'oculto' dos campos de entrada e do botão verificarBtn
    document.getElementById('camposEntrada').classList.remove('oculto');
    document.getElementById('verificarBtn').classList.remove('oculto');

    document.getElementById('numeroImagem').value = '';
    document.getElementById('nomeImagem').value = '';
    document.getElementById('numeroImagem').focus();

    document.getElementById('sortearBtn').disabled = true;

    document.getElementById('camposEntrada').classList.remove('oculto');
    document.getElementById('verificarBtn').classList.remove('oculto');

    // Certifique-se de que a imagem sorteada está visível
    // Substitua 'imagemSorteada' pelo ID real do elemento da imagem
    document.getElementById('imagemContainer').style.display = 'block';
    
    // Inicia o contador
    let tempoRestante = 5;
    document.getElementById('contador').innerHTML = tempoRestante;
    document.getElementById('contador').style.display = 'flex';

    // Oculta os campos de entrada imediatamente
    document.getElementById('camposEntrada').style.display = 'none';
    
    // Oculta o botão verificarBtn imediatamente
    document.getElementById('verificarBtn').style.display = 'none';

    // Atualiza o contador a cada segundo
    const intervalId = setInterval(function() {
        tempoRestante -= 1;
        document.getElementById('contador').innerHTML = tempoRestante;

        if (tempoRestante <= 0) {
            clearInterval(intervalId); // Para o contador
            document.getElementById('contador').style.display = 'none'; // Oculta o contador
            document.getElementById('imagemContainer').style.display = 'none'; // Oculta a imagem

            function exibirCamposEAplicarFoco() {
                // Supondo que camposEntrada seja o container que inclui numeroImagem e nomeImagem
                const camposEntrada = document.getElementById('camposEntrada');
                camposEntrada.style.display = 'block'; // Torna o container visível
            
                // Agora aplica o foco no campo numeroImagem
                const campoNumero = document.getElementById('numeroImagem');
                campoNumero.focus();
            }

            exibirCamposEAplicarFoco();

            // Chama a função para pausar o vídeo
            pausarVideo();

            // Exibe os campos de entrada
            document.getElementById('camposEntrada').style.display = 'block';
            
            // Exibe o botão verificarBtn
            document.getElementById('verificarBtn').style.display = 'block';
        }
    }, 1000);
});

function exibirCamposEntradaEAplicarFoco() {
    // Assume-se que os campos já estão visíveis, ou você os torna visíveis aqui
    // Por exemplo, document.getElementById('camposEntrada').style.display = 'block';
    
    const campoNumero = document.getElementById('numeroImagem');
    campoNumero.focus(); // Aplica foco no campo numeroImagem
}

function pausarVideo() {
    const videoElement = document.querySelector('#imagemContainer video');
    if (videoElement) {
        videoElement.pause(); // Pausa o vídeo
    }
}

// Adiciona o evento de clique ao botão verificarBtn para verificar a imagem
document.getElementById('verificarBtn').addEventListener('click', verificarImagem);

function verificarImagem() {
    const numeroDigitado = parseInt(document.getElementById('numeroImagem').value, 10);
    const nomeDigitado = document.getElementById('nomeImagem').value.trim().toLowerCase();

    if (imagemSorteada.numero === numeroDigitado && imagemSorteada.nome.toLowerCase() === nomeDigitado) {
        alert("Parabéns! Você acertou o número e o nome da jogada.");

        // Reabilita o botão sortearBtn
        document.getElementById('sortearBtn').disabled = false;
    } else {
        alert("Que pena! Não é o número e o nome da jogada.");
    }
}

// Função chamada quando Enter é pressionado ou quando verificarBtn é clicado
function handleVerification() {
    verificarImagem(); // Chama a função que você já tem
}

// Evento para detectar o pressionamento da tecla Enter nos campos de entrada
document.getElementById('numeroImagem').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        handleVerification();
    }
});

document.getElementById('nomeImagem').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        handleVerification();
    }
});

// Vincula o mesmo manipulador ao clique do botão verificarBtn
document.getElementById('verificarBtn').addEventListener('click', handleVerification);