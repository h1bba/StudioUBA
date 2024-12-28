
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




// Register ScrollTrigger with GSAP
gsap.registerPlugin(ScrollTrigger);

// Target the h2 and create an animation
gsap.from(".herodesc h2, .location", {
  scrollTrigger: {
    trigger: ".herodesc",  // Trigger when the herodesc div enters the viewport
    start: "top 50%",      // Start animation when top of herodesc is 80% down the viewport
    end: "bottom 80%",     // End when the bottom of herodesc is 20% from the top
    scrub: .5,           // Smooth animation with scroll
    markers: false,         // Add markers (optional, to visualize scroll points)
  },
  opacity: 0,              // Start with opacity 0
  y: 100,                   // Start 50px down
  duration: 1,             // Animation duration
  ease: "power2.out"       // Easing function
});

gsap.fromTo(
  ".amsterdamvector img",
  {
    opacity: 0, // Start opacity at 0
    y: 100      // Start position 100px down
  },
  {
    scrollTrigger: {
      trigger: ".herodesc",  // Trigger when the herodesc div enters the viewport
      start: "top 30%",      // Start animation when the top of herodesc is 30% down the viewport
      end: "bottom 80%",     // End when the bottom of herodesc is 80% from the top
      scrub: 0.5,            // Smooth animation with scroll
      markers: false,         // Add markers (optional, to visualize scroll points)
    },
    opacity: 0.23,            // End opacity at 50%
    y: 0,                    // Animate back to original position
    duration: 1,             // Animation duration
    ease: "power2.out"       // Easing function
  }
);

// Fade-in animation for the child elements of .width75
const width75ServiceWrappers = document.querySelectorAll('.width75 .servicewrapper');
gsap.timeline({
  scrollTrigger: {
    trigger: '.width75', // Trigger for the .width75 section
    start: "top 200vh", // Start animations after scrolling past 200vh
    end: "bottom-=1024 top", // End animations 200px before the bottom of the section
    scrub: true, // Tie animation progress to scroll
    markers: false, // Enable markers for debugging if needed
  },
}).from(width75ServiceWrappers, {
  opacity: 0,  // Start fully transparent
  y: 50,       // Start slightly below their final position
  duration: 1, // Duration for each animation
  stagger: 0.3 // Animate each child with a delay between them
});

// Fade-in animation for the child elements of .proceswrapper
const procesServiceWrappers = document.querySelectorAll('.proceswrapper .servicewrapper');
gsap.timeline({
  scrollTrigger: {
    trigger: '.proceswrapper', // Trigger for the .proceswrapper section
    start: "top 200vh", // Start animations after scrolling past 200vh
    end: "bottom-=1024 top", // End animations 200px before the bottom of the section
    scrub: true, // Tie animation progress to scroll
    markers: false, // Enable markers for debugging if needed
  },
}).from(procesServiceWrappers, {
  opacity: 0,  // Start fully transparent
  y: 50,       // Start slightly below their final position
  duration: 1, // Duration for each animation
  stagger: 0.3 // Animate each child with a delay between them
});

// Exit animation for .width75 (fade-out and scale down the whole container)
gsap.to('.width75', {
  opacity: 0, // Fade out
  scale: 0.9, // Scale down slightly
  duration: 1, // Duration of the animation
  scrollTrigger: {
    trigger: '.proceswrapper', // Trigger when .proceswrapper comes into view
    start: "top 90%", // Start when .proceswrapper is near the viewport
    end: "top 50%", // End when .proceswrapper is halfway into the viewport
    scrub: true, // Smooth transition tied to scroll
    markers: false, // Enable markers for debugging if needed
  },
});

// Exit animation for .proceswrapper (fade-out and scale down the whole container)
gsap.to('.proceswrapper', {
  opacity: 0, // Fade out
  scale: 0.9, // Scale down slightly
  duration: 1, // Duration of the exit animation
  scrollTrigger: {
    trigger: '.proceswrapper', // Trigger when .proceswrapper is leaving the viewport
    start: "bottom bottom", // Start when the bottom of .proceswrapper leaves the viewport
    end: "bottom+=100 top", // End when it's out of the viewport
    scrub: true, // Smooth transition tied to scroll
    markers: false, // Enable markers for debugging if needed
  },
});

// Text animation
gsap.fromTo(
  ".uba > span", // Target spans inside .uba
  { x: "100%" }, // Start off-screen to the right
  {
    x: "0%", // Animate into position
    duration: 1,
    stagger: 0.3, // Staggered animation for the text
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".uba", // Trigger when .uba enters the viewport
      start: "top 65%",
      end: "bottom 75%",
      scrub: true,
    },
  }
);

// Pie chart animation for the first slice
gsap.fromTo(
  ".pie-chart > path:nth-child(1)",
  { x: -50, y: -50 }, // Match initial translate(-50px, -50px)
  {
    x: 0,
    y: 0,
    duration: 1.5,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".uba", // Same trigger as text animation
      start: "top 65%",
      end: "bottom 65%",
      scrub: true,
    },
  }
);

// Pie chart animation for the second slice
gsap.fromTo(
  ".pie-chart > path:nth-child(2)",
  { x: 195, y: -50 }, // Match initial translate(-50px, -50px)
  {
    x: 145,
    y: 0,
    duration: 1.5,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".uba", // Same trigger as text animation
      start: "top 65%",
      end: "bottom 60%",
      scrub: true,
    },
  }
);

// Pie chart animation for the third slice
gsap.fromTo(
  ".pie-chart > path:nth-child(3)",
  { x: 20, y: 195 }, // Match initial translate(-50px, -50px)
  {
    x: 20,
    y: 145,
    duration: 1.5,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".uba", // Same trigger as text animation
      start: "top 65%",
      end: "bottom 55%",
      scrub: true,
    },
  }
);
