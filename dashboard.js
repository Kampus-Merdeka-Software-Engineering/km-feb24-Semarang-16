document.addEventListener("DOMContentLoaded", function () {
  const menuButton = document.getElementById("menu-button");
  const sidebarToggle = document.getElementById("sidebar-toggle");

  menuButton.addEventListener("click", function () {
    sidebarToggle.checked = !sidebarToggle.checked;
  });
});

const selectBtn = document.querySelector(".select-btn"),
  items = document.querySelectorAll(".item");
selectBtn.addEventListener("click", () => {
  selectBtn.classList.toggle("open");
});
items.forEach((item) => {
  item.addEventListener("click", () => {
    item.classList.toggle("checked");
  });
});
const selectBtn2 = document.querySelector(".select-btn2"),
  items2 = document.querySelectorAll(".item2");
selectBtn2.addEventListener("click", () => {
  selectBtn2.classList.toggle("open");
});
items2.forEach((item) => {
  item.addEventListener("click", () => {
    item.classList.toggle("checked2");
  });
});

//pop up
document.addEventListener('DOMContentLoaded', () => {
    const messageIcon = document.getElementById('messageIcon');
    const popupContainer = document.getElementById('popupContainer');
    const closePopup = document.getElementById('closePopup');
    const overlay = document.querySelector('.popup-overlay');

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