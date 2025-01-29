import Page from './page';

export default class MarketPage extends Page {
  run()  {
    const observer = new MutationObserver((mutation) => {
      const marketContainer = document.getElementById('marketContainer');
      if (!marketContainer) return;

      // Skip updating if custom elements already exist.
      if (marketContainer.querySelector('.customElement')) return;

      const setsLink = document.createElement('a');
      const gameSubdomain = window.ty.dulst.subdomain;
      setsLink.href = `/${gameSubdomain}/sets`;
      setsLink.classList.add('customElement');
      setsLink.innerHTML = 'Sets';
      marketContainer.querySelector('header.page menu.secondaryMenu').append(setsLink);
    });

    const wrapper = document.getElementById('wrapper');
    observer.observe(wrapper, { childList: true, subtree: true });
    this._observers.push(observer);
  }
}