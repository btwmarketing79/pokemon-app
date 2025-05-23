export function showCardModal(card) {
  const modal = document.getElementById("modal");
  const content = document.getElementById("modalContent");
  content.innerHTML = `<h3>${card.name}</h3><img src="${card.imageUrl}" alt="${card.name}"/>`;
  modal.style.display = "block";
}