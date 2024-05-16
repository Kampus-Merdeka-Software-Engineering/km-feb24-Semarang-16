const showPopup = document.querySelector('.button-faq');
const popupContainer=document.querySelector('.popup-container');
const closePopup=document.querySelector('.img-message');

showPopup.onclick=()=>{
    popupContainer.classList.add('active');
}

closePopup.onclick=()=>{
    popupContainer.classList.remove('active');
}