//! Import islemleri
import { months, categories } from './constants.js';
import { renderMails, showModal, renderCategories } from './ui.js';
//! HTML den gelenler


const hamburgerMenu = document.querySelector(".menu");
const navigation = document.querySelector("nav")
const mailsArea = document.querySelector(".mails-area")
const createMailBtn = document.querySelector(".create-mail")
const modal = document.querySelector(".modal-wrapper")
const closeMailBtn = document.querySelector('#close-btn')
const form = document.querySelector('#create-mail-form')
const categoryArea = document.querySelector('nav .middle')
const searchButton = document.querySelector('#search-icon')
const searchInput = document.querySelector('#search-input')


//! local storage icinden veri alma
const strMailData = localStorage.getItem('data')
const mailData = JSON.parse(strMailData)

//! Olay Izleyicileri

document.addEventListener('DOMContentLoaded', () => {

   renderCategories(categoryArea, categories, 'Gelen Kutusu')
   renderMails(mailsArea, mailData)
   if (window.innerWidth < 1100) {
      navigation.classList.add('hide')
   }
})
window.addEventListener('resize', (e) => {
   const width = e.target.innerWidth;
   if (window.innerWidth < 1100) {
      navigation.classList.add('hide')
   } else {
      navigation.classList.remove('hide')
   }
}
)

hamburgerMenu.addEventListener("click", handleMenu)
searchButton.addEventListener('click', searchMails)
createMailBtn.addEventListener('click', () => showModal(modal, true))
closeMailBtn.addEventListener('click', () => showModal(modal, false))
form.addEventListener('submit', sendMail)

mailsArea.addEventListener('click', updateMail)


categoryArea.addEventListener('click', watchCategory)



//! Fonksiyonlar
function handleMenu() {
   navigation.classList.toggle("hide");

}

function sendMail(e) {
   e.preventDefault()
   const sender = e.target[0].value
   const title = e.target[1].value
   const message = e.target[2].value

   if (!sender || !title || !message) {
      Toastify({
         text: "Lütfen en az bir alıcı belirtin",
         duration: 3000,
         destination: "https://github.com/apvarun/toastify-js",
         newWindow: true,
         close: true,
         gravity: "top", // `top` or `bottom`
         position: "right", // `left`, `center` or `right`
         stopOnFocus: true, // Prevents dismissing of toast on hover
         style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
            borderRadius: '4px'
         },
         onClick: function () { } // Callback after click
      }).showToast();
      return;
   }


   const newMail = {
      id: new Date().getTime(),
      receiver: 'Sevcan',
      sender,
      title,
      star: false,
      message,
      date: getDate(),

   }

   mailData.unshift(newMail)


   const strData = JSON.stringify(mailData);


   localStorage.setItem('data', strData);



   renderMails(mailsArea, mailData);

   showModal(modal, false);

   e.target[0].value = ' '
   e.target[1].value = ' '
   e.target[2].value = ' '
   Toastify({
      text: "Mail gönderildi",
      duration: 3000,
      destination: "https://github.com/apvarun/toastify-js",
      newWindow: true,
      close: true,
      gravity: "top", // `top` or `bottom`
      position: "right", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
         background: "gray",
         borderRadius: '4px'
      },
      onClick: function () { } // Callback after click
   }).showToast();

}

function getDate() {
   const dateArr = new Date().toLocaleDateString().split('/')
   const day = dateArr[0]
   const monthNo = dateArr[1]
   const month = months[monthNo - 0]
   return [month, day].join(' ');
}

// mail alanina tiklanma olunca calisan fonk
function updateMail(e) {
   if (e.target.id === 'button-del') {
      const mail = e.target.parentElement.parentElement;

      //localstroge dan kaldir

      const mailId = mail.dataset.id;
      const filtredData = mailData.filter((i) => i.id != mailId);

      const strData = JSON.stringify(filtredData);

      localStorage.setItem('data', strData);




      mail.remove();

   }



   if (e.target.id === 'star') {
      const mail = e.target.parentElement.parentElement;


      const mailId = mail.dataset.id
      const found = mailData.find((i) => i.id == mailId)

      const updated = { ...found, star: !found.star }

      const index = mailData.findIndex((i) => i.id == mailId);

      mailData[index] = updated;

      localStorage.setItem('data', JSON.stringify(mailData))

      renderMails(mailsArea, mailData)
   }

}

// kategorileri izleyip degistiren fonk 

function watchCategory(e) {
   const selectedCategory = e.target.dataset.name;
   renderCategories(categoryArea, categories, selectedCategory)
   if (selectedCategory === 'Yildizli') {
      const filtred = mailData.filter((i) => i.star === true)
      renderMails(mailsArea, filtred)
      return
   }

   renderMails(mailsArea, mailData)

}


function searchMails() {
   const filtred = mailData.filter((i) => i.message.toLowerCase().includes(searchInput.value.toLowerCase()))

   renderMails(mailsArea, filtred)
}




