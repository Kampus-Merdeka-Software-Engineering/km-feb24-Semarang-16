//toggle menu
const toggleButton = document.getElementById('toggle-button');
const navLists = document.getElementById('nav-menu-right');

toggleButton.addEventListener('click', () => {
    navLists.classList.toggle('active');
})

// slider
let list = document.querySelector('.slider .list');
let items = document.querySelectorAll('.slider .list .item');
let dots = document.querySelectorAll('.slider .dots li');

let active = 0;

let refreshSlider = setInterval(() => { 
dots[active].click(); 
}, 5000); 

function reloadSlider() {
  let checkLeft = items[active].offsetLeft;
  list.style.left = -checkLeft + 'px';

  let lastActiveDot = document.querySelector('.slider .dots li.active');
  if (lastActiveDot) lastActiveDot.classList.remove('active');
  dots[active].classList.add('active');
}

dots.forEach((li, key) => {
  li.addEventListener('click', function() {
    active = key;
    reloadSlider();
  });
});

setInterval(() => {
  active = (active + 1) % items.length;
  reloadSlider();
}, 6000); 

//pop up
const messageIcon = document.getElementById('messageIcon');
const popupContainer = document.getElementById('popupContainer');
const closePopup = document.getElementById('closePopup');
const overlay = document.querySelector('.popup-overlay');
const messageForm = document.getElementById('messageForm');
const alertBox = document.getElementById('alert');
const alertMessage = document.getElementById('alerttext');

window.addEventListener('DOMContentLoaded', () => {
    // mengatur agar popup message tidak muncul saat pertama kali membuka webpage
    popupContainer.style.display = 'none';
    overlay.style.display = 'none';
});

messageIcon.addEventListener('click', () => {
    const isVisible = popupContainer.style.display === 'block';
    popupContainer.style.display = isVisible ? 'none' : 'block';
    overlay.style.display = isVisible ? 'none' : 'block';
});

closePopup.addEventListener('click', () => {
    popupContainer.style.display = 'none';
    overlay.style.display = 'none';
});

// menutup pop-up box jika user mengklik di luar box area
overlay.addEventListener('click', () => {
    popupContainer.style.display = 'none';
    overlay.style.display = 'none';
});

messageForm.addEventListener('submit', function(event){
  event.preventDefault();

  const nameInput = this.elements['name'];
  const emailInput = this.elements['email'];
  const messageInput  = this.elements['message'];

  if (nameInput.value.trim() === '') {
    showAlert('The form is required!');
    return;
  }
  if (emailInput.value.trim() === '') {
      showAlert('The form is required!');
      return;
  }
  if (messageInput.value.trim() === '') {
      showAlert('The form is required!');
      return;
  }

  this.reset();
  showAlert('Thank you for the message!');
});

function showAlert(message){
  alertBox.style.display = 'block';
  alertMessage.innerHTML = '<span class="material-symbols-outlined">error</span> ' + message; 
  setTimeout(() => {
      alertBox.style.display = 'none';
  }, 1500);
}


