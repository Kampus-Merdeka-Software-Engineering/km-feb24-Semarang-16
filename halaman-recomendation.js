const hm = document.querySelector('.menu-footer');

document.querySelector('#hamburger-menu-button').onclick = (e) => {
    hm.classList.toggle('active');
    e.preventDefault();
}

//question
document.body.addEventListener("click", (ev) => {
    const isExpandableTitle = !!ev.target.closest(".expandable__title-bar");
    const expandable = ev.target.closest(".expandable");

    if(!isExpandableTitle) {
        return;
    }

    expandable.classList.toggle("expandable__open");
});

//sidebar
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
    });
})

