import { categories } from "./constants.js";

function trimString(str, max) {
    if (str.length < max) return str;

    return str.slice(0, 40) + "..."
}





export function renderMails(outlet, data) {
    if (!data) return;

    outlet.innerHTML = data.map((mail) => `
   <div class="mail" data-id=${mail.id}>
<div class="left">
    <input type="checkbox">
    <i id="star" class="bi bi-star ${mail.star && 'star-active'}"  ></i>
    <b>${mail.sender}</b><br>
</div>
<div class="right">
    <p class="message-title">${trimString(mail.title, 25)}</p>
    <p class="message-desc">${trimString(mail.message, 40)}</p>
    <p class="message-date">${mail.date}</p>
    <button id="button-del">Sil</button>
</div>
</div>
   `).join(' ')


}


//ekrana mail olustur penceresi acma


export function showModal(modal, willOpen) {
    modal.style.display = willOpen ? 'grid' : 'none'
}


//karegorileri ekrana basma

export function renderCategories(outlet, data, selectedCategory) {

    outlet.innerHTML = '';

    data.forEach((category) => {
        const categoryItem = document.createElement("a")

        categoryItem.dataset.name = category.title;

        categoryItem.className = selectedCategory === category.title && 'active-category';

        categoryItem.innerHTML = `
<i class="${category.class}"></i>
<span>${category.title}</span>
`;

        outlet.appendChild(categoryItem)
    })
}
