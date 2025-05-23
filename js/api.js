// Force Update
import { elements } from './main.js';
import { appendCards } from './ui.js';

let currentPage = 1;
let currentQuery = '';
let loadMoreBtn = null;

export const loadCards = async (query) => {
  try {
    const { typeFilter, resultsDiv, loadingDiv } = elements;
    const type = typeFilter.value;
    let parts = [];
    if (query) parts.push(`name:${encodeURIComponent(query)}`);
    if (type) parts.push(`types:${type}`);
    const fullQuery = parts.join('+');
    const res = await fetch(
      `https://api.pokemontcg.io/v2/cards?q=${fullQuery}&pageSize=20&page=${currentPage}&select=id,name,images,set,rarity,hp,types,supertype,tcgplayer`,
      { headers: { 'X-Api-Key': 'd1be42b3-fd7b-45b5-a9c5-843698853457' } }
    );
    if (!res.ok) throw new Error(res.status === 429 ? 'Rate limit exceeded.' : 'Failed to fetch cards');
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
      loadMoreBtn = null;
    }
  } catch (error) {
    loadingDiv.style.display = 'none';
    resultsDiv.innerHTML = `<p class="error">${error.message}</p>`;
    console.error(error);
  }
};

export const setCurrentQuery = (query) => {
  currentQuery = query;
  currentPage = 1;
};