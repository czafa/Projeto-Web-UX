// Create a class for the element
class Card extends HTMLElement {
  constructor() {
    super();

    this.setAttribute("role", "article");
    this.classList.add("card__plan");

    // Title
    const title = document.createElement("h3");
    title.classList.add("card__title");
    title.textContent = this.getAttribute("data-title");

    // Description
    const description = document.createElement("div");
    description.classList.add("card__description");
    description.innerHTML = this.getAttribute("data-description");
    
    // Price
    const price = document.createElement("div");
    price.classList.add("card__price");
    price.innerHTML = this.getAttribute("data-price");
    
    // Image
    let imageWrapper;
    if (this.hasAttribute("data-image")) {
      const image = document.createElement("img");
      image.classList.add("card__image");
      image.src = this.getAttribute("data-image");
      if (this.hasAttribute("data-image-alt")) {
        image.alt = this.getAttribute("data-image-alt");
      }
      imageWrapper = document.createElement("div");
      imageWrapper.classList.add("card__image-wrapper");
      imageWrapper.appendChild(image);
      this.appendChild(imageWrapper);
    }

    // CTA
    let ctaContainer;
    if (this.hasAttribute('data-cta-href')) {
      const cta = document.createElement("a");
      cta.classList.add("card__link");
      cta.href = this.getAttribute("data-cta-href");
      cta.textContent = this.getAttribute("data-cta-text");
      ctaContainer = document.createElement("div");
      ctaContainer.classList.add('card__cta');
      ctaContainer.appendChild(cta);
    }

    const contentContainer = document.createElement("div");
    contentContainer.classList.add("card__content");
    contentContainer.appendChild(title);
    contentContainer.appendChild(price);
    contentContainer.appendChild(description);
    if (ctaContainer !== 'undefined') {
      contentContainer.appendChild(ctaContainer);
    }

    // Create some CSS to apply to the shadow dom
    const style = document.createElement("style");
    style.textContent = `
      :host {
        display: block;
        width: 100%;
        max-width: 300px;
        height: 100%;
        box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.25);
        border-radius: 30px;
        border: 3px solid #9875F0;
        color: #0C021B;
        justify-content: center;
        align-content: center;
        background: #D9D9D9;
      }

      :host(.card__plan--destaque) { /* Estiliza o card com a classe destaque */
        color: #fff;
        background: linear-gradient(220deg, #6D55A8 0%, #6531E8 100%);
        border: 3px #55525C solid;
        transform: scale(1.1);
      }
      
      .card__content {
        padding: 3.5rem 2.5rem;
        }
        
      :host(.card__plan--destaque) .card__content {
        padding: 4rem 3rem;
      }

      @media (max-width: 992px) {
        .card__content {
          padding: 2rem 1.25rem;
        }
      }

      .card__title {
        margin-top: 0;
        line-height: 1.1;
        font-size: 2.25rem;
        font-weight: 700;
      }

      img {
        width: 100%;
        display: block;
        border-radius: 10px 10px 0 0;
      }

      .card__price .card__plan--price {
        display:inline-block;
        font-size: 1.5rem;
        margin: 1rem 0;
      }

      .card__cta {
        margin-top: 1.5rem;
        background: #25A677;
        border-radius: 4px;
        padding: 0.625rem 1.25rem;
      }

      .card__cta a {
        color: #C5CACE;
        display: block;
        text-align: center;
        font-size: 1rem;
      }
    `;

    // Attach the created elements to the shadow dom
    const shadowRoot = this.attachShadow({ mode: "closed" });
    shadowRoot.appendChild(style);
    if (imageWrapper !== undefined) {
      shadowRoot.appendChild(imageWrapper);
    }
    shadowRoot.appendChild(contentContainer);
  }
}

// Define the new element
customElements.define("component-price-card", Card);