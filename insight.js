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