//toggle menu
const toggleButton = document.getElementById('toggle-button');
const navLists = document.getElementById('nav-menu-right');

toggleButton.addEventListener('click', () => {
    navLists.classList.toggle('active');
})

//question
document.body.addEventListener("click", (ev) => {
    const isExpandableTitle = !!ev.target.closest(".expandable__title-bar");
    const expandable = ev.target.closest(".expandable");

    if(!isExpandableTitle) {
        return;
    }

    expandable.classList.toggle("expandable__open");
});

//pop up
document.addEventListener('DOMContentLoaded', () => {
    const messageIcon = document.getElementById('messageIcon');
    const popupContainer = document.getElementById('popupContainer');
    const closePopup = document.getElementById('closePopup');
    const overlay = document.querySelector('.popup-overlay');

<<<<<<< HEAD
window.addEventListener('DOMContentLoaded', () => {
    // mengatur agar popup message tidak muncul saat pertama kali membuka webpage
=======
    // Mengatur agar popup message tidak muncul saat pertama kali membuka webpage
>>>>>>> 6042b5cc8095002b5daaaf11f9b12f5ed979132c
    popupContainer.style.display = 'none';
    overlay.style.display = 'none';

<<<<<<< HEAD
messageIcon.addEventListener('click', () => {
    const isVisible = popupContainer.style.display === 'block';
    popupContainer.style.display = isVisible ? 'none' : 'block';
    overlay.style.display = isVisible ? 'none' : 'block';
});

closePopup.addEventListener('click', () => {
    popupContainer.style.display = 'none';
    overlay.style.display = 'none';
});
=======
    messageIcon.addEventListener('click', () => {
        popupContainer.style.display = 'block';
        overlay.style.display = 'block';
    });

    closePopup.addEventListener('click', () => {
        popupContainer.style.display = 'none';
        overlay.style.display = 'none'; 
    });
>>>>>>> 6042b5cc8095002b5daaaf11f9b12f5ed979132c

    // Menutup pop-up box jika user mengklik di luar box area
    overlay.addEventListener('click', (event) => {
        if (event.target === overlay) {
            popupContainer.style.display = 'none';
            overlay.style.display = 'none';
        }
    });
});