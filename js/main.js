import { setupEventListeners } from './events.js';
import { renderCollection } from './collection.js';

document.addEventListener("DOMContentLoaded", () => {
  const darkPreference = localStorage.getItem("darkMode");
  if (darkPreference === "on") {
    document.body.classList.add("dark");
    document.getElementById("darkToggle")?.classList.add("toggle-active");
  }

  setupEventListeners();
  renderCollection();
  console.log("Main script loaded and event listeners set.");
});