export function showCardModal(card) {
  const modal = document.getElementById("modal");
  const content = document.getElementById("modalContent");

  content.innerHTML = `
    <h3>${card.name}</h3>
    <img src="${card.images?.large || card.images?.small}" style="max-width:100%" loading="lazy" alt="${card.name}" />
    <p><strong>Set:</strong> ${card.set?.name || 'N/A'}</p>
    <p><strong>Rarity:</strong> ${card.rarity || 'N/A'}</p>
    <p><strong>HP:</strong> ${card.hp || 'N/A'}</p>
    <p><strong>Types:</strong> ${(card.types || []).join(', ') || 'N/A'}</p>
    <p><strong>Market Price:</strong> $${getMarketPrice(card).toFixed(2)}</p>
  `;

  modal.style.display = "block";
}</h3><img src="${card.imageUrl}" alt="${card.name}"/>`;
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