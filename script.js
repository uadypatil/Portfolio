// script.js
// for color pallet theme changing
               // Get references to the range inputs
               const redRange = document.getElementById('redRange');
               const greenRange = document.getElementById('greenRange');
               const blueRange = document.getElementById('blueRange');
       
               // Function to update the CSS variables and range input colors based on RGB values
               function updateThemeColor() {
                   const red = redRange.value;
                   const green = greenRange.value;
                   const blue = blueRange.value;
       
                   const rgbColor = `rgb(${red}, ${green}, ${blue})`;
       
                   // Update CSS variables
                   document.documentElement.style.setProperty('--bg-gray', rgbColor);
                   
                   document.documentElement.style.setProperty('--bg-dark', rgbColor);
       
                   // Adjust text color for better readability
                   const brightness = (0.299 * red + 0.587 * green + 0.114 * blue);
                   const textColor = brightness > 186 ? '#000' : '#fff';
                   document.documentElement.style.setProperty('--text-light', textColor);
                   document.documentElement.style.setProperty('--text-lighten', textColor);

                   
                   const bness = (0.299 * red + 0.587 * green + 0.114 * blue);
                   const tColor = bness < 186 ? '#000' : '#fff';
                   document.documentElement.style.setProperty('--text-dark', tColor);
               //     --text-lighten
                   // Update the background color of each range input
                   redRange.style.background = `linear-gradient(to right, red, rgba(${red}, 0, 0))`;
                   greenRange.style.background = `linear-gradient(to right, green, rgba(0, ${green}, 0))`;
                   blueRange.style.background = `linear-gradient(to right, blue, rgba(0, 0, ${blue}))`;
               }
       
               // Add event listeners to the range inputs
               redRange.addEventListener('input', updateThemeColor);
               greenRange.addEventListener('input', updateThemeColor);
               blueRange.addEventListener('input', updateThemeColor);
       
               // Initialize the theme color on page load
               updateThemeColor();




// for auto scroller
document.addEventListener('DOMContentLoaded', function () {
    const cardContainer = document.querySelector('.card-container');
    const cardItems = document.querySelectorAll('.card-item');
    let currentIndex = 0;
    let autoScrollInterval;

    function setActiveCard(index) {
        cardItems.forEach((item, i) => {
            item.classList.remove('active');
            if (i === index) {
                item.classList.add('active');
            }
        });

        const cardWidth = cardItems[0].clientWidth;
        const containerWidth = cardContainer.clientWidth;
        const offset = (containerWidth / 2) - (cardWidth / 2) - (cardWidth * index);
        cardContainer.style.transform = `translateX(${offset}px)`;
    }

    function startAutoScroll() {
        autoScrollInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % cardItems.length;
            setActiveCard(currentIndex);
        }, 3000);
    }

    function stopAutoScroll() {
        clearInterval(autoScrollInterval);
    }

    cardContainer.addEventListener('wheel', (e) => {
        stopAutoScroll();
        if (e.deltaY > 0) {
            currentIndex = (currentIndex + 1) % cardItems.length;
        } else {
            currentIndex = (currentIndex - 1 + cardItems.length) % cardItems.length;
        }
        setActiveCard(currentIndex);
        startAutoScroll();
    });

    cardItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            stopAutoScroll();
            currentIndex = index;
            setActiveCard(currentIndex);
            startAutoScroll();
        });
    });

    setActiveCard(currentIndex);
    startAutoScroll();
});
