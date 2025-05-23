import { loadCards } from './js/api.js';
import { setupEventListeners } from './js/events.js';
import { renderCollection } from './js/collection.js';

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("darkToggle")?.addEventListener("click", () => {
    document.body.classList.toggle("dark");
  });

  console.log("Main script loaded successfully.");
});
