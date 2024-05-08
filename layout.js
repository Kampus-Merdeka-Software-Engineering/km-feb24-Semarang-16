const hm = document.querySelector('.content-main');

document.querySelector('#hamburger-menu-button').onclick = (e) => {
    hm.classList.toggle('active');
    e.preventDefault();
}