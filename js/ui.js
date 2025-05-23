import { getCollection, saveCollection } from './collection.js';
import { showModal } from './modal.js';

export const getMarketPrice = (card) => {
  const prices = card.tcgplayer?.prices || {};
  return prices.normal?.market || prices.holofoil?.market || prices.reverseHolofoil?.market || prices['1stEditionHolofoil']?.market || null;
};

export const appendCards = (cards, container, showAdd = true) => {
  const sortOrder = document.getElementById('sortPrice').value;
  if (sortOrder === 'asc') {
    cards.sort((a, b) => (getMarketPrice(a) ?? Infinity) - (getMarketPrice(b) ?? Infinity));
  } else if (sortOrder === 'desc') {
    cards.sort((a, b) => (getMarketPrice(b) ?? -Infinity) - (getMarketPrice(a) ?? -Infinity));
  } else {
    cards.sort((a, b) => a.name.localeCompare(b.name));
  }

  cards.forEach(card => {
    const div = document.createElement('div');
    div.className = 'card';
    div.innerHTML = `
      <img src="${card.images.small}" alt="${card.name}" loading="lazy" />
      <div>${card.name}</div>
      <div style="font-size: 0.9rem; color: gray;">${(getMarketPrice(card)?.toFixed(2) && '$' + getMarketPrice(card).toFixed(2)) || 'N/A'}</div>
      ${showAdd ? `<button data-id="${card.id}">Add</button>` : `<button class="remove-btn" data-id="${card.id}">✕</button>`}
    `;
    div.querySelector('img').addEventListener('click', () => showModal(card));
    container.appendChild(div);

    if (!showAdd) {
      div.querySelector('.remove-btn').addEventListener('click', () => {
        const existing = getCollection().filter(c => c.id !== card.id);
        saveCollection(existing);
        import('./collection.js').then(({ renderCollection }) => renderCollection());
      });
    } else {
      div.querySelector('button').addEventListener('click', () => {
        const existing = getCollection();
        if (!existing.find(c => c.id === card.id)) {
          existing.push(card);
          saveCollection(existing);
          import('./collection.js').then(({ renderCollection }) => renderCollection());
        }
      });
    }
  });
};