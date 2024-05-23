// const hm = document.querySelector('.menu-footer');

// document.querySelector('#hamburger-menu-button').onclick = (e) => {
//     hm.classList.toggle('active');
//     e.preventDefault();
// }

//toggle menu
const toggleButton = document.getElementById('toggle-button');
const navLists = document.getElementById('nav-menu-right');

toggleButton.addEventListener('click', () => {
    navLists.classList.toggle('active');
})

//pop up
const messageIcon = document.getElementById('messageIcon');
const popupContainer = document.getElementById('popupContainer');
const closePopup = document.getElementById('closePopup');
const overlay = document.querySelector('.popup-overlay');
const messageForm = document.getElementById('messageForm');

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

messageForm.addEventListener('submit', function(event) {
  event.preventDefault(); 
  messageForm.reset();
  alert('Form submitted successfully!');
});
