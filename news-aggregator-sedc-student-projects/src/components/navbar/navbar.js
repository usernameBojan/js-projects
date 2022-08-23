class Navbar extends HTMLElement {
   constructor() {
      super();
      this.displayCategories = false;
      this.showSearchbar = false;
      this.showUserOptions = false;
      this.attachShadow({ mode: 'open' });
   }

   toggleDisplayCategories() {
      this.displayCategories = !this.displayCategories;
      const hamburger = this.shadowRoot.querySelector('.hamburger');
      document.querySelector('#category-sidebar').classList.toggle('active');
      hamburger.classList.toggle('hamburger-active');
   }

   toggleSearchBar() {
      this.showSearchbar = !this.showSearchbar;
      const searchbar = this.shadowRoot.querySelector('#searchbar');
      searchbar.style.display = this.showSearchbar ? 'flex' : 'none';
      if (this.showSearchbar) {
         this.shadowRoot.querySelector('#search-input').focus();
      }
   }

   toggleUserOprions() {
      this.showUserOptions = !this.showUserOptions;
      const userOptions = this.shadowRoot.querySelector('#user-options');
      const toggleBtn = this.shadowRoot.querySelector('#toggle-user-options i ');
      userOptions.style.transform = this.showUserOptions ? 'translateX(0)' : 'translateX(100%)';
      toggleBtn.style.backgroundColor = this.showUserOptions ? '#f7473e' : '#fff';
   }

   search(e) {
      e.preventDefault();
      const searchInput = this.shadowRoot.querySelector('#search-input');
      window.location.href = `/src/pages/home/home.html?search=${searchInput.value}`;
   }

   async connectedCallback() {
      const navbarTemplate = document.createElement('template');
      const stream = await fetch('../../components/navbar/navbar.html');
      const html = await stream.text();
      navbarTemplate.innerHTML = html;
      this.shadowRoot.appendChild(navbarTemplate.content.cloneNode(true));
      this.shadowRoot.querySelector('.hamburger').addEventListener('click', () => this.toggleDisplayCategories());
      this.shadowRoot.querySelector('#open-searchbar').addEventListener('click', () => this.toggleSearchBar());
      this.shadowRoot.querySelector('#close-searchbar').addEventListener('click', () => this.toggleSearchBar());
      this.shadowRoot.querySelector('#toggle-user-options').addEventListener('click', () => this.toggleUserOprions());
      this.shadowRoot.querySelector('#express-form').addEventListener('submit', (e) => this.search(e));
   }

   disconnectedCallback() {
      this.shadowRoot.querySelector('.hamburger').removeEventListener('click', () => this.toggleDisplayCategories());
      this.shadowRoot.querySelector('#open-searchbar').removeEventListener('click', () => this.toggleSearchBar());
      this.shadowRoot.querySelector('#close-searchbar').removeEventListener('click', () => this.toggleSearchBar());
      this.shadowRoot
         .querySelector('#toggle-user-options')
         .removeEventListener('click', () => this.toggleUserOprions());
   }
}

window.customElements.define('c-navbar', Navbar);
