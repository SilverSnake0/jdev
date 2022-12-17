 // Define the way the dropdown menu drops down when the mouse cursor hovers over the menu
 $(document).ready(function () {
    $('.dropdown-menu').on('mouseleave', function () {
        $(this).collapse('hide');
    });

    $('.dropdown-menu').on('mouseenter', function () {
        $(this).collapse('show');
    });
    $('.dropdown').hover(function () {
        $(this).addClass('show');
        $(this).find('.dropdown-menu').addClass('show');
    }, function () {
        $(this).removeClass('show');
        $(this).find('.dropdown-menu').removeClass('show');
    });
});

// Create a canvas element and set its width and height
var canvas = document.getElementById("particle-bg");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Create a 2D drawing context
var ctx = canvas.getContext("2d");

// Define a function to draw and animate the particles
function draw() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw and animate the particles
    for (var i = 0; i < particles.length; i++) {
        var particle = particles[i];

        // Update the position of the particle
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Check if the particle is out of bounds
        if (particle.x < 0 || particle.x > canvas.width || particle.y < 0 || particle.y > canvas.height) {
            // If so, reset the position and velocity of the particle
            particle.x = canvas.width / 2;
            particle.y = canvas.height / 2;
            particle.vx = Math.random() * 10 - 5;
            particle.vy = Math.random() * 10 - 5;
        }

        // Draw the particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, 2 * Math.PI);
        ctx.fillStyle = particle.color;
        ctx.fill();
    }

    // Animate the particles at a rate of 60 frames per second
    requestAnimationFrame(draw);
}

// Define an array to hold the particles
var particles = [];

// Create 100 particles with random positions and velocities
for (var i = 0; i < 100; i++) {
    var particle = {
        x: canvas.width / 2,
        y: canvas.height / 2,
        vx: Math.random() * 10 - 5,
        vy: Math.random() * 10 - 5,
        radius: 5,
        color: "lightblue"
    };
    particles.push(particle);
}


// Start the animation
draw();
