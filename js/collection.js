import { appendCards } from './ui.js';
import { elements } from './elements.js';

export const getCollection = () => JSON.parse(localStorage.getItem('myCollection') || '[]');
export const saveCollection = (cards) => localStorage.setItem('myCollection', JSON.stringify(cards));

export const renderCollection = () => {
  const { collectionDiv } = elements;
  collectionDiv.innerHTML = '';
  const cards = getCollection();
  appendCards(cards, collectionDiv, false);
  updateCollectionStats(cards);
};

export const exportCollection = () => {
  const blob = new Blob([JSON.stringify(getCollection())], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'pokemon_collection.json';
  a.click();
  URL.revokeObjectURL(url);
};

export const importCollection = (event) => {
  const reader = new FileReader();
  reader.onload = function (e) {
    try {
      const data = JSON.parse(e.target.result);
      const uniqueData = Array.from(new Map(data.map(card => [card.id, card])).values());
      saveCollection(uniqueData);
      renderCollection();
    } catch (err) {
      alert('Import failed: invalid file.');
    }
  };
  reader.readAsText(event.target.files[0]);
};