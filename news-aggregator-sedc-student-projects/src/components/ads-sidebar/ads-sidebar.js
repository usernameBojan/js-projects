class AdsSidebar extends HTMLElement {
   constructor() {
      super();
      this.attachShadow({ mode: 'open' });
   }
   async connectedCallback() {
      const adsSidebarTemplate = document.createElement('template');
      const { ads } = await (await fetch('../../data/ads.json')).json();
      const stream = await fetch('../../components/ads-sidebar/ads-sidebar.html');
      const html = await stream.text();
      adsSidebarTemplate.innerHTML = html;
      this.shadowRoot.appendChild(adsSidebarTemplate.content.cloneNode(true));
      const adsLinks = this.shadowRoot.querySelectorAll('[data-ad-details]');

      [ ...adsLinks ].forEach((el) => {
         const ad = ads[Math.floor(Math.random() * ads.length)];
         el.setAttribute('href', ad.redirect_url);
         el.firstElementChild.setAttribute('src', ad.image_url);
         el.firstElementChild.setAttribute('alt', ad.alt_text);
      });
   }
}

window.customElements.define('c-ads-sidebar', AdsSidebar);
