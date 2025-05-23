import { getMarketPrice } from './utils.js';
import { appendCards } from './ui.js';

const collectionDiv = document.getElementById("collection");

function getCollection() {
  return JSON.parse(localStorage.getItem("myCollection") || "[]");
}

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

export function exportCollection() {
  const collection = getCollection();
  const blob = new Blob([JSON.stringify(collection)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = "pokemon_collection.json";
  a.click();
  URL.revokeObjectURL(url);
}

export function importCollection(event) {
  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const data = JSON.parse(e.target.result);
      const unique = Array.from(new Map(data.map(card => [card.id, card])).values());
      localStorage.setItem("myCollection", JSON.stringify(unique));
      renderCollection();
    } catch {
      alert("Import failed: invalid file.");
    }
  };
  reader.readAsText(event.target.files[0]);
}