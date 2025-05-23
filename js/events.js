import { elements } from './main.js';
import { loadCards, setCurrentQuery } from './api.js';
import { exportCollection, importCollection } from './collection.js';
import { setupModalListeners } from './modal.js';

export const setupEventListeners = () => {
  const { searchInput, searchError, typeFilter, sortPrice } = elements;

  searchInput.addEventListener('keyup', () => {
    clearTimeout(window.debounceTimer);
    const query = searchInput.value.trim();
    searchError.style.display = query.length < 3 ? 'block' : 'none';
    if (query.length < 3) return;
    window.debounceTimer = setTimeout(() => {
      setCurrentQuery(query);
      elements.resultsDiv.innerHTML = '';
      elements.loadingDiv.style.display = 'block';
      loadCards(query);
    }, 500);
  });

  typeFilter.addEventListener('change', () => {
    elements.resultsDiv.innerHTML = '';
    elements.loadingDiv.style.display = 'block';
    loadCards(elements.searchInput.value.trim());
  });

  sortPrice.addEventListener('change', () => {
    elements.resultsDiv.innerHTML = '';
    elements.loadingDiv.style.display = 'block';
    loadCards(elements.searchInput.value.trim());
  });

  document.getElementById('darkToggle').addEventListener('click', () => {
    document.body.classList.toggle('dark');
    const isDark = document.body.classList.contains('dark');
    localStorage.setItem('darkMode', isDark ? 'on' : 'off');
    document.getElementById('darkToggle').classList.toggle('toggle-active', isDark);
  });

  document.getElementById('importFile').addEventListener('change', importCollection);
  document.getElementById('exportBtn').addEventListener('click', exportCollection);

  setupModalListeners();
};