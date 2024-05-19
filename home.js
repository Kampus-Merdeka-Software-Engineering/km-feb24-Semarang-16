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
}, 5000); 

//pop up
document.addEventListener('DOMContentLoaded', () => {
  const messageIcon = document.getElementById('messageIcon');
  const popupContainer = document.getElementById('popupContainer');
  const closePopup = document.getElementById('closePopup');
  const overlay = document.querySelector('.popup-overlay');

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
let popupOpened = false; // menandakan apakah pop-up sudah pernah dibuka

>>>>>>> parent of 8b830aa (adjust media query, revisi minor)
=======
let popupOpened = false; // menandakan apakah pop-up sudah pernah dibuka

>>>>>>> parent of 8b830aa (adjust media query, revisi minor)
window.addEventListener('DOMContentLoaded', () => {
    // mengatur agar popup message tidak muncul saat pertama kali membuka webpage
    popupContainer.style.display = 'none';
    overlay.style.display = 'none';
});

messageIcon.addEventListener('click', () => {
    if (!popupOpened) {
        popupContainer.style.display = 'block';
        overlay.style.display = 'block'; 
        popupOpened = true;
    }
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
<<<<<<< HEAD
<<<<<<< HEAD



=======
  // Mengatur agar popup message tidak muncul saat pertama kali membuka webpage
  popupContainer.style.display = 'none';
  overlay.style.display = 'none';

  messageIcon.addEventListener('click', () => {
      popupContainer.style.display = 'block';
      overlay.style.display = 'block';
  });

  closePopup.addEventListener('click', () => {
      popupContainer.style.display = 'none';
      overlay.style.display = 'none'; 
  });

  // Menutup pop-up box jika user mengklik di luar box area
  overlay.addEventListener('click', (event) => {
      if (event.target === overlay) {
          popupContainer.style.display = 'none';
          overlay.style.display = 'none';
      }
  });
});
>>>>>>> 6042b5cc8095002b5daaaf11f9b12f5ed979132c
=======
>>>>>>> parent of 8b830aa (adjust media query, revisi minor)
=======
>>>>>>> parent of 8b830aa (adjust media query, revisi minor)
