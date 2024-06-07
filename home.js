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

//pop up
document.addEventListener('DOMContentLoaded', () => {
  const messageIcon = document.getElementById('messageIcon');
  const popupContainer = document.getElementById('popupContainer');
  const closePopup = document.getElementById('closePopup');
  const overlay = document.querySelector('.popup-overlay');
  const messageForm = document.getElementById('messageForm');
  const alertBox = document.getElementById('alert');
  const alertMessage = document.getElementById('alerttext');

  // menyembunyikan pop-up
  popupContainer.style.display = 'none';
  overlay.style.display = 'none';

  // Mengatur toggle pop-up saat icon diklik oleh user
  messageIcon.addEventListener('click', () => {
      const isVisible = popupContainer.style.display === 'block';
      popupContainer.style.display = isVisible ? 'none' : 'block';
      overlay.style.display = isVisible ? 'none' : 'block';
  });

  // mengklik close button untuk menutup pop up
  closePopup.addEventListener('click', () => {
      popupContainer.style.display = 'none';
      overlay.style.display = 'none';
  });

  // menutup pop-up ketika mengklik diluar message form
  overlay.addEventListener('click', () => {
      popupContainer.style.display = 'none';
      overlay.style.display = 'none';
  });

  // validasi form submission
  messageForm.addEventListener('submit', function(event) {
      event.preventDefault();

      const nameInput = this.elements['name'];
      const emailInput = this.elements['email'];
      const messageInput = this.elements['message'];

      // Validate form inputs
      if (nameInput.value.trim() === '') {
          showAlert('Name is required!');
          return;
      }
      if (emailInput.value.trim() === '') {
          showAlert('Email is required!');
          return;
      }
      if (messageInput.value.trim() === '') {
          showAlert('Message is required!');
          return;
      }

      this.reset();
      showAlert('Thank you for the message!');
  });

  // Show alert message
  function showAlert(message) {
      alertBox.style.display = 'block';
      alertMessage.innerHTML = '<span class="material-symbols-outlined">error</span> ' + message;
      setTimeout(() => {
          alertBox.style.display = 'none';
      }, 1500);
  }
});

//tap tool tip
document.addEventListener('DOMContentLoaded', () => {
  const tooltips = document.querySelectorAll('.tooltip');

  tooltips.forEach(tooltip => {
      tooltip.addEventListener('click', () => {
          tooltip.classList.toggle('active');
      });

      document.addEventListener('click', event => {
          if (!tooltip.contains(event.target)) {
              tooltip.classList.remove('active');
          }
      });
  });
});

