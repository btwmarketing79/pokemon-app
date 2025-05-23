import { showCardModal } from './ui.js';

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("darkToggle")?.addEventListener("click", () => {
    document.body.classList.toggle("dark");
  });

  console.log("Main script loaded successfully.");
});
