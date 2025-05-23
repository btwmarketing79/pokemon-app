import { getMarketPrice } from './utils.js';

export const showModal = (card) => {
  const modal = document.getElementById('modal');
  const content = document.getElementById('modalContent');
  modal.style.display = 'block';
  modal.setAttribute('aria-label', `Details for ${card.name}`);
  content.innerHTML = `
    <h3>${card.name}</h3>
    <img src="${card.images.large}" style="max-width:100%" loading="lazy" alt="${card.name}" />
    <p><strong>Set:</strong> ${card.set.name}</p>
    <p><strong>Rarity:</strong> ${card.rarity || 'N/A'}</p>
    <p><strong>HP:</strong> ${card.hp || 'N/A'}</p>
    <p><strong>Types:</strong> ${(card.types || []).join(', ')}</p>
    <p><strong>Market Price:</strong> ${(getMarketPrice(card)?.toFixed(2) && '$' + getMarketPrice(card).toFixed(2)) || 'N/A'}</p>
  `;
};

export const setupModalListeners = () => {
  const modal = document.getElementById('modal');
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.style.display = 'none';
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') modal.style.display = 'none';
  });
};