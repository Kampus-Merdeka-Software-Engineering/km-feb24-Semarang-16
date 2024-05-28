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
const messageIcon = document.getElementById("messageIcon");
const popupContainer = document.getElementById("popupContainer");
const closePopup = document.getElementById("closePopup");
const overlay = document.querySelector(".popup-overlay");
const messageForm = document.getElementById("messageForm");

window.addEventListener("DOMContentLoaded", () => {
  // mengatur agar popup message tidak muncul saat pertama kali membuka webpage
  popupContainer.style.display = "none";
  overlay.style.display = "none";
});

messageIcon.addEventListener("click", () => {
  const isVisible = popupContainer.style.display === "block";
  popupContainer.style.display = isVisible ? "none" : "block";
  overlay.style.display = isVisible ? "none" : "block";
});

closePopup.addEventListener("click", () => {
  popupContainer.style.display = "none";
  overlay.style.display = "none";
});

// menutup pop-up box jika user mengklik di luar box area
overlay.addEventListener("click", () => {
  popupContainer.style.display = "none";
  overlay.style.display = "none";
});

messageForm.addEventListener("submit", function (event) {
  event.preventDefault();
  messageForm.reset();
  alert("Form submitted successfully!");
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

      // Grafik 1
      // Fungsi untuk mengonversi angka bulan menjadi nama bulan
      function getMonthName(month) {
        const monthNames = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ];
        return monthNames[month - 1];
      }

      // Fungsi untuk mengubah format tanggal ke bulan dan tahun
      function formatDateToMonthYear(date) {
        const [day, month, year] = date.split("/");
        return `${getMonthName(Number(month))} ${year}`;
      }

      // Fungsi untuk membuat objek Date dari string bulan/tahun
      function getDateFromMonthYear(monthYear) {
        const [monthName, year] = monthYear.split(" ");
        const month = new Date(`${monthName} 1, ${year}`).getMonth();
        return new Date(year, month);
      }

      // Mengelompokkan data berdasarkan bulan dan tahun
      const salesData = {};
      const profitData = {};

      data.forEach((item) => {
        const monthYear = formatDateToMonthYear(item["Order Date"]);
        if (!salesData[monthYear]) {
          salesData[monthYear] = 0;
          profitData[monthYear] = 0;
        }
        salesData[monthYear] += item.Sales;
        profitData[monthYear] += item.Profit;
      });

      // Mengambil bulan/tahun dan mengurutkannya
      const monthYears = Object.keys(salesData).sort((a, b) => {
        return getDateFromMonthYear(a) - getDateFromMonthYear(b);
      });

      // Menyiapkan data untuk chart
      const sale = monthYears.map((monthYear) => salesData[monthYear]);
      const profits = monthYears.map((monthYear) => profitData[monthYear]);

      // Membuat chart
      const ctx = document.getElementById("sales-profit").getContext("2d");
      const myChart = new Chart(ctx, {
        type: "line",
        data: {
          labels: monthYears,
          datasets: [
            {
              label: "Sales",
              data: sale,
              borderColor: "rgba(255, 0, 0, 1)",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
              fill: false,
            },
            {
              label: "Total Profit",
              data: profits,
              borderColor: "rgba(0, 0, 255, 1)",
              backgroundColor: "rgba(0, 0, 255, 0.2)",
              fill: false,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });

      // Grafik 2
      var groupedData = {};
      data.forEach(function (item) {
        var region = item["Region"];
        var sales = item["Sales"];
        var orderId = item["Order ID"];

        if (!groupedData[region]) {
          groupedData[region] = {
            "Total Sales": 0,
            "Total Orders": new Set(),
          };
        }
        groupedData[region]["Total Sales"] += sales;
        groupedData[region]["Total Orders"].add(orderId);
      });

      // Transforming grouped data into an array
      var dataArray = [];
      for (var region in groupedData) {
        if (groupedData.hasOwnProperty(region)) {
          dataArray.push({
            Region: region,
            "Total Sales": groupedData[region]["Total Sales"].toLocaleString(
              "en-US",
              { minimumFractionDigits: 1, maximumFractionDigits: 1 }
            ),
            "Total Orders":
              groupedData[region]["Total Orders"].size.toLocaleString(),
          });
        }
      }

      // Initializing DataTables
      $("#sales-region").DataTable({
        data: dataArray,
        columns: [
          { data: "Region" },
          { data: "Total Sales" },
          { data: "Total Orders" },
        ],
        order: [[1, "desc"]],
      });

      // Grafik 3
      var groupedData = {};
      data.forEach(function (item) {
        var key = item["Sub-Category"];
        if (!groupedData[key]) {
          groupedData[key] = {
            Category: item["Category"],
            "Sub-Category": item["Sub-Category"],
            "Total Sales": item["Sales"],
            "Total Quantity": item["Quantity"],
          };
        } else {
          groupedData[key]["Total Sales"] += item["Sales"];
          groupedData[key]["Total Quantity"] += item["Quantity"];
        }
      });

      // Transforming grouped data into an array
      var dataArray = [];
      for (var subCategory in groupedData) {
        if (groupedData.hasOwnProperty(subCategory)) {
          var subCategoryData = groupedData[subCategory];
          dataArray.push({
            Category: subCategoryData["Category"],
            "Sub-Category": subCategoryData["Sub-Category"],
            "Total Sales": subCategoryData["Total Sales"].toLocaleString(
              "en-US",
              { minimumFractionDigits: 1, maximumFractionDigits: 1 }
            ),
            "Total Quantity":
              subCategoryData["Total Quantity"].toLocaleString(),
          });
        }
      }

      // Initializing DataTables
      var table = $("#sales-category").DataTable({
        // scrollX: true,
        scrollY: 250,
        data: dataArray,
        columns: [
          { data: "Category" },
          { data: "Sub-Category" },
          { data: "Total Sales" },
          { data: "Total Quantity" },
        ],
        order: [[2, "desc"]],
      });

      // Grafik 4
      function getMonthName(month) {
        const monthNames = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ];
        return monthNames[month - 1];
      }

      function formatDateToMonthYear(date) {
        const [day, month, year] = date.split("/");
        return `${getMonthName(Number(month))} ${year}`;
      }

      const saleData = {};
      const discountCountData = {};

      data.forEach((item) => {
        const monthYear = formatDateToMonthYear(item["Order Date"]);
        if (!saleData[monthYear]) {
          saleData[monthYear] = 0;
        }
        saleData[monthYear] += item.Sales;

        if (item.Discount > 0) {
          if (!discountCountData[monthYear]) {
            discountCountData[monthYear] = 0;
          }
          discountCountData[monthYear] += 1;
        }
      });

      const monthYear = Object.keys(saleData).sort((a, b) => {
        const aDate = new Date(
          a.split(" ")[1],
          getMonthNameIndex(a.split(" ")[0])
        );
        const bDate = new Date(
          b.split(" ")[1],
          getMonthNameIndex(b.split(" ")[0])
        );
        return aDate - bDate;
      });

      function getMonthNameIndex(monthName) {
        const monthNames = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ];
        return monthNames.indexOf(monthName);
      }

      const salesChartData = monthYears.map((monthYear) => saleData[monthYear]);
      const discountChartData = monthYears.map(
        (monthYear) => discountCountData[monthYear] || 0
      );

      const ctx2 = document.getElementById("mixedChart").getContext("2d");
      const mixedChart = new Chart(ctx2, {
        data: {
          labels: monthYear,
          datasets: [
            {
              type: "line",
              label: "Sales",
              data: salesChartData,
              borderColor: "rgba(183,28,28,255)",
              borderWidth: 2,
              fill: false,
              yAxisID: "y-axis-1",
            },
            {
              type: "bar",
              label: "Discounted Products",
              data: discountChartData,
              backgroundColor: "#edc9c4",
              yAxisID: "y-axis-2",
            },
          ],
        },
        options: {
          scales: {
            yAxes: [
              {
                type: "linear",
                display: true,
                position: "left",
                id: "y-axis-1",
                labels: {
                  show: true,
                },
              },
              {
                type: "linear",
                display: true,
                position: "right",
                id: "y-axis-2",
                labels: {
                  show: true,
                },
                gridLines: {
                  drawOnChartArea: false,
                },
              },
            ],
          },
        },
      });

      // Grafik 5
      const segmentCounts = {};
      data.forEach((entry) => {
        const segment = entry.Segment;
        if (!segmentCounts[segment]) {
          segmentCounts[segment] = new Set();
        }
        segmentCounts[segment].add(entry["Customer ID"]);
      });

      // Menghitung total jumlah customer untuk setiap segment
      const segmentLabels = Object.keys(segmentCounts);
      const segmentData = segmentLabels.map(
        (segment) => segmentCounts[segment].size
      );

      // Membuat chart dengan tipe pie
      const segmentPieCtx = document
        .getElementById("segmentPieChart")
        .getContext("2d");
      const segmentPieChart = new Chart(segmentPieCtx, {
        type: "pie",
        data: {
          labels: segmentLabels,
          datasets: [
            {
              data: segmentData,
              backgroundColor: [
                "rgba(183,28,28,1)",
                "rgba(205,96,96,1)",
                "rgba(226,164,164,1)",
              ],
            },
          ],
        },
        options: {
          maintainAspectRatio: false, // Prevents the chart from maintaining the aspect ratio
          responsive: true, // Makes the chart responsive
          legend: {
            position: "right", // Place legend on the right side of the chart
          },
        },
      });

      // Grafik 6
      var groupedData = {};
      data.forEach(function (item) {
        var region = item["Region"];
        var shipMode = item["Ship Mode"];
        var customerId = item["Customer ID"];

        if (!groupedData[region]) {
          groupedData[region] = {
            "Standard Class": new Set(),
            "Second Class": new Set(),
            "First Class": new Set(),
            "Same Day": new Set(),
          };
        }
        groupedData[region][shipMode].add(customerId);
      });

      // Transforming grouped data into an array
      var dataArray = [];
      for (var region in groupedData) {
        if (groupedData.hasOwnProperty(region)) {
          dataArray.push({
            Region: region,
            "Standard Class": groupedData[region][
              "Standard Class"
            ].size.toLocaleString("en-US", {
              minimumFractionDigits: 1,
              maximumFractionDigits: 1,
            }),
            "Second Class": groupedData[region][
              "Second Class"
            ].size.toLocaleString("en-US", {
              minimumFractionDigits: 1,
              maximumFractionDigits: 1,
            }),
            "First Class": groupedData[region][
              "First Class"
            ].size.toLocaleString("en-US", {
              minimumFractionDigits: 1,
              maximumFractionDigits: 1,
            }),
            "Same Day": groupedData[region]["Same Day"].size.toLocaleString(
              "en-US",
              { minimumFractionDigits: 1, maximumFractionDigits: 1 }
            ),
          });
        }
      }

      // Initializing DataTables
      $("#ship-mode").DataTable({
        data: dataArray,
        columns: [
          { data: "Region" },
          { data: "Standard Class" },
          { data: "Second Class" },
          { data: "First Class" },
          { data: "Same Day" },
        ],
        order: [[1, "desc"]],
      });
    });
});
