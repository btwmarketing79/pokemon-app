export function showCardModal(card) {
  const modal = document.getElementById("modal");
  const content = document.getElementById("modalContent");

  const imageUrl = card?.images?.large || card?.images?.small || '';
  const set = card?.set?.name || 'N/A';
  const rarity = card?.rarity || 'N/A';
  const hp = card?.hp || 'N/A';
  const types = (card?.types || []).join(', ') || 'N/A';
  const price = getMarketPrice(card);

  content.innerHTML = `
    <h3>${card.name || 'Unnamed Card'}</h3>
    <img src="${imageUrl}" style="max-width:100%" loading="lazy" alt="${card.name || 'Card'}" />
    <p><strong>Set:</strong> ${set}</p>
    <p><strong>Rarity:</strong> ${rarity}</p>
    <p><strong>HP:</strong> ${hp}</p>
    <p><strong>Types:</strong> ${types}</p>
    <p><strong>Market Price:</strong> ${price ? '$' + price.toFixed(2) : 'N/A'}</p>
  `;

  modal.style.display = "block";
}

export function appendCards(cards, container, showAdd = true) {
  container.innerHTML = '';
  const collection = JSON.parse(localStorage.getItem("myCollection") || "[]");

  cards.forEach(card => {
    const div = document.createElement('div');
    div.className = 'card';
    div.innerHTML = `
      <img src="${card.images.small}" alt="${card.name}" />
      <div>${card.name}</div>
      <div style="font-size: 0.9rem; color: gray;">
        ${card.tcgplayer?.prices?.normal?.market
          ? '$' + card.tcgplayer.prices.normal.market.toFixed(2)
          : 'N/A'}
      </div>
      ${showAdd
        ? `<button data-id="${card.id}">Add</button>`
        : `<button class="remove-btn" data-id="${card.id}">✕</button>`}
    `;

    const button = div.querySelector("button");

    if (showAdd) {
      button.addEventListener("click", () => {
        const exists = collection.find(c => c.id === card.id);
        if (!exists) {
          collection.push(card);
          localStorage.setItem("myCollection", JSON.stringify(collection));
          document.getElementById("collection").innerHTML = "";
          appendCards(collection, document.getElementById("collection"), false);
        }
      });
    } else {
      button.addEventListener("click", () => {
        const updated = collection.filter(c => c.id !== card.id);
        localStorage.setItem("myCollection", JSON.stringify(updated));
        document.getElementById("collection").innerHTML = "";
        appendCards(updated, document.getElementById("collection"), false);
      });
    }

    container.appendChild(div);
  });
}