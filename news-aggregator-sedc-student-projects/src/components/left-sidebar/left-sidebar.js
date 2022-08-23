class LeftSidebar extends HTMLElement {
   constructor() {
      super();
      this.attachShadow({ mode: 'open' });
   }

   listCategories(conainer) {
      const Categories = [ 'Politics', 'Business', 'Science', 'Tech', 'Gaming', 'Showbiz', 'Sport' ];

      Categories.forEach((el) => {
         conainer.innerHTML += `
            <li><a href="../../pages/home/home.html?category=${el}/">${el}</a></li>
        `;
      });
   }

   async connectedCallback() {
      const leftSidebarTemplate = document.createElement('template');
      const stream = await fetch('../../components/left-sidebar/left-sidebar.html');
      const html = await stream.text();
      leftSidebarTemplate.innerHTML = html;
      this.shadowRoot.appendChild(leftSidebarTemplate.content.cloneNode(true));
      this.listCategories(this.shadowRoot.querySelector('.categories'));
   }
}

window.customElements.define('c-l-sidebar', LeftSidebar);
