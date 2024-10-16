
// Initialize Lenis
const lenis = new Lenis({
    duration: 1.2,
    smooth: true,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
})

function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
}

requestAnimationFrame(raf)


function updateAmsterdamTime() {
    const options = {
        timeZone: 'Europe/Amsterdam',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true // Use 24-hour format
    };

    const amsterdamTime = new Intl.DateTimeFormat('en-GB', options).format(new Date());
    document.getElementById('amsterdam-time').textContent = "CEST: " + amsterdamTime;
}

// Update the time every second
setInterval(updateAmsterdamTime, 1000);

// Select all the span elements
const spans = document.querySelectorAll('.banner span');

// Function to add bold effect on hover
spans.forEach((span, index) => {
    span.addEventListener('mouseover', () => {
        // Remove the bold effect from all letters
        spans.forEach(s => s.style.fontWeight = '400');

        // Add bold effect to the current, previous, and next letters
        if (spans[index - 1]) spans[index - 1].style.fontWeight = '800'; // Previous letter
        span.style.fontWeight = '800'; // Current letter
        if (spans[index + 1]) spans[index + 1].style.fontWeight = '800'; // Next letter
    });

    span.addEventListener('mouseout', () => {
        // Reset font-weight on mouse out
        spans.forEach(s => {
            if (index === 7 || index === 8 || index === 9) {
                s.style.fontWeight = '800'; // Keep UBA bold
            } else {
                s.style.fontWeight = '400'; // Reset others
            }
        });
    });
});


