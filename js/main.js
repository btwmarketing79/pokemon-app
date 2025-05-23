const searchInput = document.getElementById('search');
    const resultsDiv = document.getElementById('results');
    const collectionDiv = document.getElementById('collection');
    const loadingDiv = document.getElementById('loading');
    const typeFilter = document.getElementById('typeFilter');
    const sortPrice = document.getElementById('sortPrice');
    const getCollection = () => JSON.parse(localStorage.getItem('myCollection') || '[]');
    const saveCollection = (cards) => localStorage.setItem('myCollection', JSON.stringify(cards));
    const getMarketPrice = (card) => {
      const prices = card.tcgplayer?.prices || {};
      return prices.normal?.market || prices.holofoil?.market || prices.reverseHolofoil?.market || prices['1stEditionHolofoil']?.market || null;
    };

    const appendCards = (cards, container, showAdd = true) => {
      const sortOrder = sortPrice.value;
      if (sortOrder === 'asc') {
        cards.sort((a, b) => (getMarketPrice(a) || 0) - (getMarketPrice(b) || 0));
      } else if (sortOrder === 'desc') {
        cards.sort((a, b) => (getMarketPrice(b) || 0) - (getMarketPrice(a) || 0));
      } else {
        cards.sort((a, b) => a.name.localeCompare(b.name));
      }

      cards.forEach(card => {
        const div = document.createElement('div');
        div.className = 'card';
        div.innerHTML = `
          <img src="${card.images.small}" alt="${card.name}" />
          <div>${card.name}</div>
          <div style="font-size: 0.9rem; color: gray;">${(getMarketPrice(card)?.toFixed(2) && '$' + getMarketPrice(card).toFixed(2)) || 'N/A'}</div>
          ${showAdd ? `<button data-id="${card.id}">Add</button>` : `<button class='remove-btn' data-id="${card.id}">✕</button>`}
        `;
        div.querySelector('img').addEventListener('click', () => showModal(card));
        container.appendChild(div);

        if (!showAdd) {
          div.querySelector('.remove-btn').addEventListener('click', () => {
            let existing = getCollection().filter(c => c.id !== card.id);
            saveCollection(existing);
            renderCollection();
          });
        } else {
          div.querySelector('button').addEventListener('click', () => {
            const existing = getCollection();
            if (!existing.find(c => c.id === card.id)) {
              existing.push(card);
              saveCollection(existing);
              renderCollection();
            }
          });
        }
      });
    };

    const showModal = (card) => {
      const modal = document.getElementById('modal');
      const content = document.getElementById('modalContent');
      modal.style.display = 'block';
      content.innerHTML = `
        <h3>${card.name}</h3>
        <img src="${card.images.large}" style="max-width:100%" />
        <p><strong>Set:</strong> ${card.set.name}</p>
        <p><strong>Rarity:</strong> ${card.rarity || 'N/A'}</p>
        <p><strong>HP:</strong> ${card.hp || 'N/A'}</p>
        <p><strong>Types:</strong> ${(card.types || []).join(', ')}</p>
        <p><strong>Market Price:</strong> ${(getMarketPrice(card)?.toFixed(2) && '$' + getMarketPrice(card).toFixed(2)) || 'N/A'}</p>
      `;
    };

    const renderCollection = () => {
      collectionDiv.innerHTML = '';
      appendCards(getCollection(), collectionDiv, false);
    };

    let currentPage = 1;
    let currentQuery = '';
    let loadMoreBtn;

    const loadCards = async (query) => {
      const type = typeFilter.value;
      let parts = [];
      if (query) parts.push(`name:${query}`);
      if (type) parts.push(`types:${type}`);
      const fullQuery = parts.join('+');
      const res = await fetch(`https://api.pokemontcg.io/v2/cards?q=${fullQuery}&pageSize=20&page=${currentPage}&select=id,name,images,set,rarity,hp,types,supertype,tcgplayer`);
      const data = await res.json();
      appendCards(data.data, resultsDiv, true);
      loadingDiv.style.display = 'none';

      if (data.data.length === 20) {
        if (!loadMoreBtn || !document.body.contains(loadMoreBtn)) {
          loadMoreBtn = document.createElement('button');
          loadMoreBtn.textContent = 'Load More';
          loadMoreBtn.style.marginTop = '1rem';
          resultsDiv.parentNode.appendChild(loadMoreBtn);
          loadMoreBtn.onclick = () => {
            currentPage++;
            loadCards(currentQuery);
          };
        }
      } else if (loadMoreBtn) {
        loadMoreBtn.remove();
      }
    };

    const toggleDarkMode = () => {
      document.body.classList.toggle('dark');
      document.getElementById('darkToggle').classList.toggle('toggle-active');
    };

    const exportCollection = () => {
      const blob = new Blob([JSON.stringify(getCollection())], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = "pokemon_collection.json";
      a.click();
    };

    document.getElementById('importFile').addEventListener('change', function(e) {
      const reader = new FileReader();
      reader.onload = function(event) {
        try {
          const data = JSON.parse(event.target.result);
          saveCollection(data);
          renderCollection();
        } catch (e) {
          alert("Import failed: invalid file.");
        }
      };
      reader.readAsText(e.target.files[0]);
    });

    searchInput.addEventListener('keyup', () => {
      clearTimeout(window.debounceTimer);
      currentQuery = searchInput.value.trim();
      if (currentQuery.length < 3) return;
      window.debounceTimer = setTimeout(() => {
        currentPage = 1;
        resultsDiv.innerHTML = '';
        if (loadMoreBtn) loadMoreBtn.remove();
        loadingDiv.style.display = 'block';
        loadCards(currentQuery);
      }, 500);
    });

    typeFilter.addEventListener('change', () => {
      currentPage = 1;
      resultsDiv.innerHTML = '';
      if (loadMoreBtn) loadMoreBtn.remove();
      loadingDiv.style.display = 'block';
      loadCards(currentQuery);
    });

    sortPrice.addEventListener('change', () => {
      currentPage = 1;
      resultsDiv.innerHTML = '';
      if (loadMoreBtn) loadMoreBtn.remove();
      loadingDiv.style.display = 'block';
      loadCards(currentQuery);
    });

    renderCollection();