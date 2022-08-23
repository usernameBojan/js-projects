class Footer extends HTMLElement {
   constructor() {
      super();
      this.attachShadow({ mode: 'open' });
   }
   async connectedCallback() {
      const footerTemplate = document.createElement('template');
      const stream = await fetch('../../components/footer/footer.html');
      const html = await stream.text();
      footerTemplate.innerHTML = html;
      this.shadowRoot.appendChild(footerTemplate.content.cloneNode(true));
   }
}

window.customElements.define('c-footer', Footer);
