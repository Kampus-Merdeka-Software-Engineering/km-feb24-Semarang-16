//toggle menu
const toggleButton = document.getElementById('toggle-button');
const navLists = document.getElementById('nav-menu-right');

toggleButton.addEventListener('click', () => {
    navLists.classList.toggle('active');
})

//question box
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
  

//fetch data and manipulation 
    //Event on ready DOM
        document.addEventListener("DOMContentLoaded", function () {
        //Fetch data
            fetch('./data_set/superstor_dataset.json')
                .then((response) => response.json())
                .then((data) => {
                    //question 1
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

                    //question 2
                        //table 1
                            var groupedRegionData = {};
                            data.forEach(function (item) {
                            var region = item["Region"];
                            var sales = item["Sales"];
                            var orderId = item["Order ID"];
                    
                            if (!groupedRegionData[region]) {
                                groupedRegionData[region] = {
                                "Total Sales": 0,
                                "Total Orders": new Set(),
                                };
                            }
                            groupedRegionData[region]["Total Sales"] += sales;
                            groupedRegionData[region]["Total Orders"].add(orderId);
                            });
                    
                            // Transforming grouped data into an array
                            var regiondataArray = [];
                            for (var region in groupedRegionData) {
                            if (groupedRegionData.hasOwnProperty(region)) {
                                regiondataArray.push({
                                Region: region,
                                "Total Sales": groupedRegionData[region]["Total Sales"].toLocaleString(
                                    "en-US",
                                    { minimumFractionDigits: 1, maximumFractionDigits: 1 }
                                ),
                                "Total Orders": groupedRegionData[region][
                                    "Total Orders"
                                ].size.toLocaleString(),
                                });
                            }
                            }
                    
                            // Initializing DataTables
                            $("#sales-region").DataTable({
                            searching : false,
                            lengthChange: false,
                            autoWidth: false,
                            data: regiondataArray,
                            columns: [
                                { data: "Region" },
                                { data: "Total Sales" },
                                { data: "Total Orders" },
                            ], order: [[1, "desc"]],
                            });              

                        //table 2
                            var groupedStateData = {};
                            data.forEach(function (item) {
                            var state = item["State"];
                            var sales = item["Sales"];
                            var orderId= item["Order ID"];
                    
                            if (!groupedStateData[state]) {
                                groupedStateData[state] = {
                                "Total Sales": 0,
                                "Total Orders": new Set(),
                                };
                            }
                            groupedStateData[state]["Total Sales"] += sales;
                            groupedStateData[state]["Total Orders"].add(orderId);
                            });
                    
                            // Transforming grouped data into an array
                            var statedataArray = [];
                            for (var state in groupedStateData) {
                            if (groupedStateData.hasOwnProperty(state)) {
                                statedataArray.push({
                                State: state,
                                "Total Sales": groupedStateData[state]["Total Sales"].toLocaleString(
                                    "en-US",
                                    { minimumFractionDigits: 1, maximumFractionDigits: 1 }
                                ),
                                "Total Orders": groupedStateData[state][
                                    "Total Orders"
                                ].size.toLocaleString(),
                                });
                            }
                            }
                    
                            // Initializing DataTables
                            $("#sales-state").DataTable({
                            data: statedataArray,
                            lengthChange: false,
                            columns: [
                                { data: "State" },
                                { data: "Total Sales" },
                                { data: "Total Orders" },
                            ], order: [[1, "desc"]],
                            pageLength: 5
                            });              

                    //question 3
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
                            "Total Quantity": subCategoryData["Total Quantity"].toLocaleString(),
                            });
                        }
                        }
                
                        // Initializing DataTables
                        var table = $("#sales-category").DataTable({
                        data: dataArray,
                        lengthChange: false,
                        scrollX : true,
                        columns: [
                            { data: "Category" },
                            { data: "Sub-Category" },
                            { data: "Total Sales" },
                            { data: "Total Quantity" },
                        ],
                        order: [[2, "desc"]],
                        pageLength: 5 
                        });

                    //question 4
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

                    //question 5
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

                    //question 6
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
                        $("#myTable").DataTable({
                        data: dataArray,
                        lengthChange: false,
                        searching : false,
                        scrollX : true,
                        paging: false,
                        columns: [
                            { data: "Region" },
                            { data: "Standard Class" },
                            { data: "Second Class" },
                            { data: "First Class" },
                            { data: "Same Day" },
                        ],
                        order: [[1, "desc"]],
                        });
                    })
                .catch(error => console.error('Error loading the data', error));
            });
