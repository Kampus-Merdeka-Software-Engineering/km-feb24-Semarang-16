//toggle menu
const toggleButton = document.getElementById("toggle-button");
const navLists = document.getElementById("nav-menu-right");

toggleButton.addEventListener("click", () => {
  navLists.classList.toggle("active");
});

// Filter
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
document.addEventListener("DOMContentLoaded", () => {
  const messageIcon = document.getElementById("messageIcon");
  const popupContainer = document.getElementById("popupContainer");
  const closePopup = document.getElementById("closePopup");
  const overlay = document.querySelector(".popup-overlay");

  // Mengatur agar popup message tidak muncul saat pertama kali membuka webpage
  popupContainer.style.display = "none";
  overlay.style.display = "none";

  messageIcon.addEventListener("click", () => {
    popupContainer.style.display = "block";
    overlay.style.display = "block";
  });

  closePopup.addEventListener("click", () => {
    popupContainer.style.display = "none";
    overlay.style.display = "none";
  });

  // Menutup pop-up box jika user mengklik di luar box area
  overlay.addEventListener("click", (event) => {
    if (event.target === overlay) {
      popupContainer.style.display = "none";
      overlay.style.display = "none";
    }
  });
});

// Manipulasi Data JSON
document.addEventListener("DOMContentLoaded", function () {
  fetch("./data_set/superstor_dataset.json")
    .then((response) => response.json())
    .then((data) => {
      const qty = data.map((item) => item.Quantity);
      const sales = data.map((item) => item.Sales);
      const profit = data.map((item) => item.Profit);

      // Menghitung total quantity
      const totalQuantity = Math.floor(
        qty.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
      ).toLocaleString();
      document.querySelector(".p-result.quantity").innerHTML = totalQuantity;

      // Menghitung total Sales
      const totalSales = Math.floor(
        sales.reduce(
          (accumulator, currentValue) => accumulator + currentValue,
          0
        )
      ).toLocaleString();
      document.querySelector(".p-result.sales").innerHTML = totalSales;

      // Menghitung total Profit
      const totalProfit = Math.floor(
        profit.reduce(
          (accumulator, currentValue) => accumulator + currentValue,
          0
        )
      ).toLocaleString();
      document.querySelector(".p-result.profit").innerHTML = totalProfit;

      // Menghitung total Order
      const uniqueOrderIds = {};
      data.forEach((item) => {
        const orderId = item["Order ID"];
        if (!uniqueOrderIds[orderId]) {
          uniqueOrderIds[orderId] = true;
        }
      });
      const totalUniqueOrders = Object.keys(uniqueOrderIds).length;
      document.querySelector(".p-result.order").innerHTML =
        totalUniqueOrders.toLocaleString();

      // Mendapatkan Tahun pada Order Date
      const uniqueYears = new Set();
      data.forEach((item) => {
        const orderDate = item["Order Date"];
        const year = orderDate.split("/")[2];
        uniqueYears.add(year);
      });
      const uniqueYearsArray = Array.from(uniqueYears).sort();
      const listItemsyears = document.querySelector(".year .list-items");
      listItemsyears.innerHTML = "";
      uniqueYearsArray.forEach((year) => {
        const listItem = document.createElement("li");
        listItem.className = "item";
        listItem.innerHTML = `
          <label>
            <input type="checkbox" name="years" value="${year}" /> ${year}
          </label>
        `;
        listItemsyears.appendChild(listItem);
      });

      // Mendapatkan Region
      const uniqueRegions = new Set();
      data.forEach((item) => {
        const region = item["Region"];
        uniqueRegions.add(region);
      });
      const uniqueRegionsArray = Array.from(uniqueRegions).sort();
      const listItemsregion = document.querySelector(".region .list-items");
      listItemsregion.innerHTML = "";
      uniqueRegionsArray.forEach((region) => {
        const listItem = document.createElement("li");
        listItem.className = "item";
        listItem.innerHTML = `
          <label>
            <input type="checkbox" name="regions" value="${region}" /> ${region}
          </label>
        `;
        listItemsregion.appendChild(listItem);
      });
    });
});
