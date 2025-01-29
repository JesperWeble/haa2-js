import fixCardNameFontSize from '../utils/fixCardNameFontSize';
import Page from './page';

export default class CardsPage extends Page {
  run()  {
    updateFullCardPreview();

    const observer = new MutationObserver(() => {
      const cardsContainer = document.getElementById('cardsList');
      if (!cardsContainer) return;

      const cardsByIndex = window.ty.fullCardsListIndex.nid;
      cardsContainer.querySelectorAll('#card-list-container .card:not(.customElement)').forEach((card) => {
        const properties = document.createElement('div');
        properties.classList.add('properties');
        card.append(properties);

        // const cardImage = card.querySelector('img');
        // cardImage.setAttribute('loading', 'lazy');
        card.classList.add('customElement');
        card.classList.add('visible');

        const cardInfo = cardsByIndex[card.getAttribute('data-cardid')];
        if (!cardInfo) return;

        // Skip cost for heroes.
        if (!card.classList.contains('hero')) {
          addStat('cost', cardInfo, properties);
        }

        if (card.classList.contains('hero') || card.classList.contains('unit') || card.classList.contains('equip')) {
          addStat('atk', cardInfo, properties, true);
        }
        if (card.classList.contains('hero') || card.classList.contains('unit')) {
          addStat('health', cardInfo, properties);
        }
        if (card.classList.contains('equip')) {
          addStat('dur', cardInfo, properties);
        }
        addStat('source', cardInfo, properties);
        addStat('reqSource', cardInfo, properties);
      });
    });

    const wrapper = document.getElementById('wrapper');
    observer.observe(wrapper, { childList: true, subtree: true });
    this._observers.push(observer);
  }
}

function updateFullCardPreview() {
  const observer = new MutationObserver(() => {
    const fullCardPreviewContainer = document.getElementById('card-properties');
    if (!fullCardPreviewContainer) return;

    fixCardNameFontSize(fullCardPreviewContainer);
  });

  observer.observe(document.body, { childList: true });
}

function addStat(statName, cardInfo, container, forceZeroIfNull = false) {
  if (cardInfo[statName] === undefined) return null;

  const stat = document.createElement('div');
  if (!forceZeroIfNull && cardInfo[statName] === null) return;

  const statValue = cardInfo[statName] || 0;
  stat.setAttribute('data-name', statName);
  stat.setAttribute('data-value', statValue + '');
  stat.classList.add('property');
  stat.classList.add('mainProperty');
  stat.innerText = statValue;
  container.append(stat);
}