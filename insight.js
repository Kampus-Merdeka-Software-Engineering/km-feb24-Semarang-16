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
const messageIcon = document.getElementById('messageIcon');
const popupContainer = document.getElementById('popupContainer');
const closePopup = document.getElementById('closePopup');
const overlay = document.querySelector('.popup-overlay');
const messageForm = document.getElementById('messageForm');

window.addEventListener('DOMContentLoaded', () => {
    // mengatur agar popup message tidak muncul saat pertama kali membuka webpage
    popupContainer.style.display = 'none';
    overlay.style.display = 'none';
});

messageIcon.addEventListener('click', () => {
    const isVisible = popupContainer.style.display === 'block';
    popupContainer.style.display = isVisible ? 'none' : 'block';
    overlay.style.display = isVisible ? 'none' : 'block';
});

closePopup.addEventListener('click', () => {
    popupContainer.style.display = 'none';
    overlay.style.display = 'none';
});

// menutup pop-up box jika user mengklik di luar box area
overlay.addEventListener('click', () => {
    popupContainer.style.display = 'none';
    overlay.style.display = 'none';
});

messageForm.addEventListener('submit', function(event) {
  event.preventDefault(); 
  messageForm.reset();
  alert('Form submitted successfully!');
});

//fetch data and manipulation 
    //Event on ready DOM
        document.addEventListener("DOMContentLoaded", function () {
        //Fetch data
            fetch('./data_set/superstor_dataset.json')
                .then((response) => response.json())
                .then((data) => {
                    //question 5
                    function countUniqueSegmentations(data) {
                        let uniqueCustomers = new Map();
                    
                        data.forEach(item => {
                            // Menambahkan Customer ID unik ke Map
                            uniqueCustomers.set(item["Customer ID"], item["Segment"]);
                        });
                    
                        let counts = { Consumer: 0, Corporate: 0, "Home Office": 0 };
                    
                        // Menghitung jumlah banyaknya segmentation
                        uniqueCustomers.forEach(segmentation => {
                            if (counts.hasOwnProperty(segmentation)) {
                                counts[segmentation]++;
                            }
                        });
                        return counts;
                    }
                    
                    let segmentationCounts = countUniqueSegmentations(data);
                    console.log(segmentationCounts);

                    //visualisation question 5
                    const ctx = document.getElementById('myChart');
                    let labels = Object.keys(segmentationCounts);
                    let totalSegmentations = Object.values(segmentationCounts).reduce((acc, val) => acc + val, 0);
                    let output = {};
                    for (let key in segmentationCounts) {
                        output[key] = ((segmentationCounts[key] / totalSegmentations) * 100).toFixed(1);
                    }

                    new Chart(ctx, {
                        type: 'pie',
                        data: {
                            labels: labels,
                            datasets: [{
                                label: '% of Cutomers by Segmentation',
                                data: Object.values(output),
                                backgroundColor : [
                                    'rgba(168, 46, 38, 1)',
                                    'rgba(191, 102, 99, 1)',
                                    'rgba(217, 167, 165, 1)'
                                ]
                            }]
                        },
                        options : {
                            width : 400,
                            responsive : true,
                            maintainAspectRatio : false,
                        }
                            });
                    })
            });

