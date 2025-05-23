import { getCollection } from './collection.js';
import { getMarketPrice } from './utils.js';
import { appendCards } from './ui.js';

const collectionDiv = document.getElementById("collection");

function updateCollectionStats(cards) {
  const total = cards.length;
  const totalValue = cards.reduce((sum, card) => {
    const price = getMarketPrice(card);
    return sum + (price || 0);
  }, 0);

  const statsEl = document.getElementById("collectionStats");
  if (statsEl) {
    statsEl.textContent = `(${total} cards | $${totalValue.toFixed(2)})`;
  }
}

export function renderCollection() {
  const cards = getCollection();
  appendCards(cards, collectionDiv, false);
  updateCollectionStats(cards);
}