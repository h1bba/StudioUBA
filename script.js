// // Smooth scrolling function
// function smoothScroll(targetPosition, duration) {
//     const startPosition = window.pageYOffset;
//     const distance = targetPosition - startPosition;
//     let startTime = null;

//     function animation(currentTime) {
//         if (startTime === null) startTime = currentTime;
//         const timeElapsed = currentTime - startTime;
//         const run = ease(timeElapsed, startPosition, distance, duration);
//         window.scrollTo(0, run);
//         if (timeElapsed < duration) requestAnimationFrame(animation);
//     }

//     // Easing function for smooth scroll
//     function ease(t, b, c, d) {
//         t /= d / 2;
//         if (t < 1) return c / 2 * t * t + b;
//         t--;
//         return -c / 2 * (t * (t - 2) - 1) + b;
//     }

//     requestAnimationFrame(animation);
// }

// // // Example usage on button click
// // document.getElementById('scrollButton').addEventListener('click', function () {
// //     smoothScroll(1000, 1000); // Scrolls 1000px down over 1 second
// // });

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

const scrollLeftBtn = document.getElementById('scrollLeft');
const scrollRightBtn = document.getElementById('scrollRight');
const sidescrollContainer = document.querySelector('.sidescroll');
const scrollArrow = document.getElementById('scrollArrow');

scrollArrow.addEventListener('click', () => {
    sidescrollContainer.scrollBy({
        left: window.innerWidth,  // Scroll left by 100vw
        behavior: 'smooth'
    });
});


// Scroll 100vw to the left
scrollLeftBtn.addEventListener('click', () => {
    sidescrollContainer.scrollBy({
        left: -window.innerWidth,  // Scroll left by 100vw
        behavior: 'smooth'
    });
});

// Scroll 100vw to the right
scrollRightBtn.addEventListener('click', () => {
    sidescrollContainer.scrollBy({
        left: window.innerWidth,   // Scroll right by 100vw
        behavior: 'smooth'
    });
});

// Select all the social link anchor tags and the span with the class 'wereld'
const socialLinks = document.querySelectorAll('.sociallinks a');
const wereldSpan = document.querySelector('.wereld');

// Function to rotate the span
function rotateSpan() {
    wereldSpan.style.transition = 'transform 1s ease';
    wereldSpan.style.transform = 'rotate(180deg)';
}

// Function to reset the span's rotation
function resetSpan() {
    wereldSpan.style.transition = 'transform 1s ease';
    wereldSpan.style.transform = 'rotate(0deg)';
}

// Add event listeners to all social links
socialLinks.forEach(link => {
    link.addEventListener('mouseover', rotateSpan);
    link.addEventListener('mouseout', resetSpan);
});

document.querySelectorAll('.banner span').forEach((span, index, spans) => {
    span.addEventListener('mouseover', () => {
        // Remove the 'hovered' class from all spans
        spans.forEach(s => s.classList.remove('hovered'));

        // Add 'hovered' class to the current, previous, and next spans
        if (spans[index - 1]) spans[index - 1].classList.add('hovered');
        span.classList.add('hovered');
        if (spans[index + 1]) spans[index + 1].classList.add('hovered');
    });

    span.addEventListener('mouseout', () => {
        // Remove the 'hovered' class when the mouse leaves
        spans.forEach(s => s.classList.remove('hovered'));
    });
});