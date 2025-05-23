import { setupEventListeners } from './events.js';
import { renderCollection } from './collection.js';

document.addEventListener("DOMContentLoaded", () => {
  setupEventListeners();            // ✅ THIS LINE WAS MISSING
  renderCollection();               // ✅ Shows saved cards
  console.log("Main script loaded successfully.");
});