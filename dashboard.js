document.addEventListener("DOMContentLoaded", function() {
    const menuButton = document.getElementById("menu-button");
    const sidebarToggle = document.getElementById("sidebar-toggle");
  
    menuButton.addEventListener("click", function() {
      sidebarToggle.checked = !sidebarToggle.checked;
    });
  });

const selectBtn = document.querySelector(".select-btn"),
      items = document.querySelectorAll(".item");
selectBtn.addEventListener("click", () => {
    selectBtn.classList.toggle("open");
});
items.forEach(item => {
    item.addEventListener("click", () => {
        item.classList.toggle("checked");
        let checked = document.querySelectorAll(".checked"),
            btnText = document.querySelector(".btn-text");
            if(checked && checked.length > 0){
                btnText.innerText = `${checked.length} Selected`;
            }else{
                btnText.innerText = "Select Year";
            }
    });
})
const selectBtn2 = document.querySelector(".select-btn2"),
      items2 = document.querySelectorAll(".item2");
selectBtn2.addEventListener("click", () => {
    selectBtn2.classList.toggle("open");
});
items2.forEach(item => {
    item.addEventListener("click", () => {
        item.classList.toggle("checked2");
        let checked2 = document.querySelectorAll(".checked2"),
            btnText2 = document.querySelector(".btn-text2");
            if(checked2 && checked2.length > 0){
                btnText2.innerText = `${checked2.length} Selected`;
            }else{
                btnText2.innerText = "Select Region";
            }
    });
})