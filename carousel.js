// Início da configuração do carousel
let currentRotation = 0;
let startX;
let endX;
let isDragging = false;
const items = document.querySelectorAll(".carousel-item");
const ItemsTotais = items.length;

// Função para calcular a escala dinâmica com base no ângulo
function calculoescala(angle) {
	const Escala = Math.max(0.5, 1 - Math.abs(angle) / 180);
	return Escala;
}

// Função para atualizar a posição e o tamanho dos itens
function AtualizarItens() {
	const AjusteRotacao = 90; // Ajuste para a rotação do layout do carousel
	const translateX = 250; // Ajuste de translação horizontal
	const translateY = 170; // Ajuste de translação vertical

	// Limita os itens visíveis a apenas cinco
	const itemsVisiveis = Array.from(items).slice(0, 5);
	const totalVisiveis = itemsVisiveis.length;

	itemsVisiveis.forEach((item, index) => {
		const Anglo =
			(360 / totalVisiveis) * index + currentRotation + AjusteRotacao;
		const Escala = calculoescala((Anglo % 360) - 90);

		// Calcula as posições de translação X e Y baseadas no ângulo
		const transX = translateX * Math.cos((Anglo * Math.PI) / 180);
		const transY = translateY * Math.sin((Anglo * Math.PI) / 180);

		item.style.transform = `translate(${transX}px, ${transY}px) scale(${Escala})`;
		item.style.zIndex = Math.round(Escala * 100); // Z-index com base na escala para sobreposição
	});

	// Oculta os demais itens, caso existam mais que cinco
	items.forEach((item, index) => {
		if (index >= 5) {
			item.style.display = "none";
		} else {
			item.style.display = "block";
		}
	});
}

// Função para mostrar o próximo item manualmente (caso swipe para a esquerda)
function ProximoItem() {
	currentRotation += 72;
	AtualizarItens();
}

// Função para mostrar o item anterior manualmente (caso swipe para a direita)
function ItemAnterior() {
	currentRotation -= 72;
	AtualizarItens();
}

// Captura o início do toque ou clique do mouse
document
	.querySelector(".carousel-container")
	.addEventListener("touchstart", (e) => {
		startX = e.touches[0].clientX;
		isDragging = true;
	});

// Captura o final do toque ou clique do mouse
document
	.querySelector(".carousel-container")
	.addEventListener("touchend", (e) => {
		endX = e.changedTouches[0].clientX;
		Swipe();
		isDragging = false;
	});

// Função que gerencia o swipe
function Swipe() {
	const DistanciaSwipe = 50;
	if (startX - endX > DistanciaSwipe) {
		ProximoItem();
	} else if (endX - startX > DistanciaSwipe) {
		ItemAnterior();
	}
}

function initCarousel() {
	const maxVisibleItems = 5; // Define o número máximo de caixas visíveis

	if (window.innerWidth < 992) {
		items.forEach((item, index) => {
			if (index < maxVisibleItems) {
				// Aplica o estilo do carousel para os primeiros 5 elementos
				item.style.position = "absolute";
				item.style.width = "30vw";
				item.style.height = "auto";
				item.style.backgroundColor = "white";
				item.style.border = "3px solid #6D55A8";
				item.style.borderRadius = "10px";
				item.style.textAlign = "left";
				item.style.padding = "15px";
				item.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
				item.style.transition = "transform 0.4s ease, box-shadow 0.4s ease";
				item.style.wordWrap = "break-word";
				item.style.overflow = "hidden";
				item.style.display = "flex";
				item.style.flexDirection = "column";
			} else {
				// Oculta os itens que estão fora do limite
				item.style.display = "none";
			}
		});
		// Chama a função para organizar os itens no carousel
		AtualizarItens();
	} else {
		// Remove o estilo do carousel para telas maiores
		items.forEach((item) => {
			item.style.position = "";
			item.style.width = "";
			item.style.transform = "";
			item.style.transition = ""; // Remove transições
			item.style.display = ""; // Exibe todos os itens em telas maiores
		});
	}
}

// Chama initCarousel ao carregar ou redimensionar a tela
window.addEventListener("load", initCarousel);
window.addEventListener("resize", initCarousel);

// Inicializa as posições e tamanhos dos itens
AtualizarItens();
// Fim da configuração do carousel

// Função para truncar o texto
function truncarTexto(texto, limite) {
	return texto.length > limite ? texto.slice(0, limite) + "..." : texto;
}

// Inicio da config das Caixas;
// Função para adicionar datas, botão de patinha com contador e truncamento de texto no footerbox de cada item
items.forEach((item, index) => {
	const datas = [
		"08 Out 2024",
		"15 Set 2024",
		"10 Ago 2024",
		"20 Jul 2024",
		"05 Jun 2024",
	];

	// Trunca o comentário
	const comentario = item.querySelector("p"); // Supondo que o comentário esteja dentro de uma tag <p>
	comentario.textContent = truncarTexto(comentario.textContent, 80);

	const footerbox = document.createElement("div");
	footerbox.classList.add("footerbox");

	const dateSpan = document.createElement("span");
	dateSpan.classList.add("date");
	dateSpan.textContent = `Data: ${datas[index % datas.length]}`;

	const pawButton = document.createElement("div");
	pawButton.classList.add("paw-button");

	const pawIcon = document.createElement("img");
	pawIcon.src = "assets/image/paw1.svg";
	pawIcon.alt = "Ícone de patinha";

	const usefulText = document.createElement("span");
	usefulText.textContent = "Útil?";

	const counter = document.createElement("span");
	counter.classList.add("counter");
	counter.textContent = "(0)";

	let clicked = false; // Variável para verificar se o usuário já clicou

	// Adiciona evento de clique com alternância
	pawButton.addEventListener("click", () => {
		if (clicked) {
			// Se já foi clicado, reverte a cor e decrementa o contador
			clicked = false;
			pawButton.classList.remove("clicked");
			counter.textContent = `(${Number.parseInt(counter.textContent.match(/\d+/)[0]) - 1})`;
		} else {
			// Se não foi clicado, altera a cor e incrementa o contador
			clicked = true;
			pawButton.classList.add("clicked");
			counter.textContent = `(${Number.parseInt(counter.textContent.match(/\d+/)[0]) + 1})`;
		}
	});

	pawButton.appendChild(pawIcon);
	pawButton.appendChild(usefulText);
	pawButton.appendChild(counter);

	footerbox.appendChild(dateSpan);
	footerbox.appendChild(pawButton);
	item.appendChild(footerbox);
});

// fim das config de footerbox

// Inicio da Emulação do scroll por seção
document.addEventListener("DOMContentLoaded", () => {
	const sections = document.querySelectorAll("section");
	let isScrolling;

	window.addEventListener("scroll", () => {
		window.clearTimeout(isScrolling);

		if (window.innerWidth < 992) {
			//Precisei colocar uma condição para o tamanho de tela para DESABILITAR O SCROLL SNAP
			isScrolling = setTimeout(() => {
				const scrollPosition = window.scrollY;
				let closestSection = sections[0];
				let closestDistance = Math.abs(
					scrollPosition - closestSection.offsetTop,
				);

				sections.forEach((section) => {
					const distance = Math.abs(scrollPosition - section.offsetTop);
					if (distance < closestDistance) {
						closestDistance = distance;
						closestSection = section;
					}
				});

				// Apenas aplicar scrollIntoView em telas menores que 992px
				closestSection.scrollIntoView({ behavior: "smooth" });
			}, 100);
		}
	});
});

// Fim da emulação;
