import { getMarketPrice, getCollection, saveCollection, renderCollection } from './collection.js';
import { showModal } from './modal.js';

export function appendCards(cards, container, showAdd = true) {
  const sortPrice = document.getElementById('sortPrice');
  const sortOrder = sortPrice.value;

  if (sortOrder === 'asc') {
    cards.sort((a, b) => (getMarketPrice(a) ?? Infinity) - (getMarketPrice(b) ?? Infinity));
  } else if (sortOrder === 'desc') {
    cards.sort((a, b) => (getMarketPrice(b) ?? -Infinity) - (getMarketPrice(a) ?? -Infinity));
  } else {
    cards.sort((a, b) => a.name.localeCompare(b.name));
  }

  for (const card of cards) {
    const div = document.createElement('div');
    div.className = 'card';
    div.innerHTML = `
      <img src="${card.images.small}" alt="${card.name}" loading="lazy" />
      <div>${card.name}</div>
      <div style="font-size: 0.9rem; color: gray;">
        ${(getMarketPrice(card)?.toFixed(2) && '$' + getMarketPrice(card).toFixed(2)) || 'N/A'}
      </div>
      ${showAdd
        ? `<button data-id="${card.id}">Add</button>`
        : `<button class='remove-btn' data-id="${card.id}">✕</button>`}
    `;

    div.querySelector('img').addEventListener('click', () => showModal(card));

    if (showAdd) {
      div.querySelector('button').addEventListener('click', () => {
        const existing = getCollection();
        if (!existing.find(c => c.id === card.id)) {
          existing.push(card);
          saveCollection(existing);
          renderCollection();
        }
      });
    } else {
      div.querySelector('.remove-btn').addEventListener('click', () => {
        const updated = getCollection().filter(c => c.id !== card.id);
        saveCollection(updated);
        renderCollection();
      });
    }

    container.appendChild(div);
  }
}

export function showCardModal(card) {
  const modal = document.getElementById("modal");
  const content = document.getElementById("modalContent");
  content.innerHTML = `<h3>${card.name}</h3><img src="${card.imageUrl}" alt="${card.name}"/>`;
  modal.style.display = "block";
}
