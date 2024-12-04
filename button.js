// Seleciona o botão e a seção de destino
const scrollButton = document.getElementById('scrollButton');
const ourPlan = document.getElementById('ourPlan');

// Adiciona um evento de clique ao botão
scrollButton.addEventListener('click', () => {
    // Rola até a seção 2 de forma suave
    ourPlan.scrollIntoView({ behavior: 'smooth' });
});

