// Define the data for the circle graph
const data = {
    labels: ["Python", "JavaScript", "HTML", "CSS", "SQL"], // rename the labels to match the coding languages
    datasets: [{
        data: [75, 40, 35, 35, 35], // set the data for each label
        backgroundColor: [
            "#F7464A",
            "#FDB45C",
            "#46BFBD",
            "#949FB1",
            "#4D5360"
        ],
        hoverBackgroundColor: [
            "#FF5A5E",
            "#FFC870",
            "#5AD3D1",
            "#A8B3C5",
            "#616774"
        ]
    }]
};

// Define the options for the circle graph
const options = {
    animation: {
        animateScale: true, // enable animation
        animateRotate: true
    }
};

// Create the circle graph
const char = document.getElementById("myChart").getContext("2d");
const myChart = new Chart(char, {
    type: "doughnut",
    data: data,
    options: options
});

// Show the circle graph
function showGraph() {
  document.getElementById('myChart').style.visibility = 'visible';
}

function hideGraph() {
  document.getElementById('myChart').style.visibility = 'hidden';
}
// Bind the mouseenter and mouseleave events to the "solve" element
$('#solve').on('mouseenter', function () {
  showGraph();
});
$('#solve').on('mouseleave', function () {
  hideGraph();
});

