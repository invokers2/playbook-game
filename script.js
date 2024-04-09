let imagemSorteada = null; // Variável para armazenar a imagem sorteada

document.getElementById('sortearBtn').addEventListener('click', function() {
    // Lista das imagens com nome e número
    const imagens = [
        { arquivo: '1.png', nome: 'Inside Zone', numero: 1 },
        { arquivo: '2.png', nome: 'Dart', numero: 2 },
        { arquivo: '2a.png', nome: 'QB Dart', numero: 2 },
        { arquivo: '3.png', nome: 'Stretch', numero: 3 },
        { arquivo: '4.png', nome: 'Speed Option', numero: 4 },
        { arquivo: '5.png', nome: 'Power Read', numero: 5 },
        { arquivo: '6.png', nome: 'Counter GT', numero: 6 },
        { arquivo: '6a.png', nome: 'QB Counter GT', numero: 6 },
        { arquivo: '7.png', nome: 'Dive', numero: 7 },
        { arquivo: '8.png', nome: 'Pull Center', numero: 8 },
        { arquivo: '9.png', nome: 'Trap', numero: 9 }
    ];

    const indiceAleatorio = Math.floor(Math.random() * imagens.length);
    imagemSorteada = imagens[indiceAleatorio];
    const caminhoDaImagem = `imagens/${imagemSorteada.arquivo}`;

    let imagemElement = document.querySelector('#imagemContainer img');
    if (!imagemElement) {
        imagemElement = document.createElement('img');
        document.getElementById('imagemContainer').appendChild(imagemElement);
    }
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
});

// Adiciona o evento de clique ao botão verificarBtn para verificar a imagem
document.getElementById('verificarBtn').addEventListener('click', verificarImagem);

function verificarImagem() {
    const numeroDigitado = parseInt(document.getElementById('numeroImagem').value, 10);
    const nomeDigitado = document.getElementById('nomeImagem').value.trim().toLowerCase();

    if (imagemSorteada.numero === numeroDigitado && imagemSorteada.nome.toLowerCase() === nomeDigitado) {
        alert("Parabéns! Você acertou a imagem.");

        // Reabilita o botão sortearBtn
        document.getElementById('sortearBtn').disabled = false;
    } else {
        alert("Que pena! Não é a imagem correta.");
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

