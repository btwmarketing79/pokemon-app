// force update
import { showCardModal } from './ui.js';

document.addEventListener("DOMContentLoaded", () => {
  const darkPreference = localStorage.getItem("darkMode");
  if (darkPreference === "on") {
    document.body.classList.add("dark");
    document.getElementById("darkToggle")?.classList.add("toggle-active");
  }
  document.getElementById("darkToggle")?.addEventListener("click", () => {
    document.body.classList.toggle("dark");
  });

  console.log("Main script loaded successfully.");
});
