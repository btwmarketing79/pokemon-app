import { renderCollection } from './collection.js';
import { setupEventListeners } from './events.js';

// DOM references
const searchInput = document.getElementById('search');
const resultsDiv = document.getElementById('results');
const collectionDiv = document.getElementById('collection');
const loadingDiv = document.getElementById('loading');
const typeFilter = document.getElementById('typeFilter');
const sortPrice = document.getElementById('sortPrice');
const searchError = document.getElementById('searchError');
const modal = document.getElementById('modal');

export const elements = {
  searchInput,
  resultsDiv,
  collectionDiv,
  loadingDiv,
  typeFilter,
  sortPrice,
  searchError,
  modal
};

// Initialize app
renderCollection();
setupEventListeners();