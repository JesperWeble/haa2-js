import Page from './page';

export default class SetsPage extends Page {
  run()  {
    const wrapper = document.getElementById('wrapper');

    const observer = new MutationObserver(() => {
      const setsContainer = document.getElementById('setsContainer');
      if (!setsContainer) return;

      // Skip updating if custom elements already exist.
      if (setsContainer.querySelector('.customElement')) return;

      this.#updateMarketLink(setsContainer);
      this.#highlightMarketHeaderLink();
    });

    observer.observe(wrapper, { childList: true, subtree: true });
    this._observers.push(observer);

    const menuObserver = new MutationObserver(() => {
      const dulstMenu = document.getElementById('dulstMenu');
      if (!dulstMenu) return;

      if (dulstMenu.querySelector('.customElement')) return;

      this.#highlightMarketHeaderLink();
    });
    menuObserver.observe(wrapper, { childList: true, subtree: true });
    // TODO: can amount of observers be optimized?
  }

  #updateMarketLink(container) {
    const newMarketLink = container.querySelector('header.page menu.secondaryMenu a:first-child');
    const gameSubdomain = window.ty.dulst.subdomain;
    newMarketLink.href = `/${gameSubdomain}/market`;
    newMarketLink.classList.add('customElement');
    newMarketLink.innerHTML = 'Card Packs';
  }

  #highlightMarketHeaderLink() {
    const marketLink = document.querySelector('#header li.market');
    marketLink.classList.add('active');
  }
}