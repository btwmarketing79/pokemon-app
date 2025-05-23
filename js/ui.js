export function showCardModal(card) {
  const modal = document.getElementById("modal");
  const content = document.getElementById("modalContent");
  content.innerHTML = `<h3>${card.name}</h3><img src="${card.imageUrl}" alt="${card.name}"/>`;
  modal.style.display = "block";
}

export function appendCards(cards, container, showAdd = true) {
  container.innerHTML = '';
  cards.forEach(card => {
    const div = document.createElement('div');
    div.className = 'card';
    div.innerHTML = `
      <img src="${card.images.small}" alt="${card.name}" />
      <div>${card.name}</div>
      <div style="font-size: 0.9rem; color: gray;">${card.tcgplayer?.prices?.normal?.market ? '$' + card.tcgplayer.prices.normal.market.toFixed(2) : 'N/A'}</div>
      ${showAdd
        ? `<button data-id="${card.id}">Add</button>`
        : `<button class='remove-btn' data-id="${card.id}">✕</button>`}
    `;
    container.appendChild(div);
  });
}