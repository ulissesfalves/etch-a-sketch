function createGrid(size){
    parentContainer.innerHTML = ''; // Clear existing blocks

    const gapValue = parseFloat(getComputedStyle(parentContainer).getPropertyValue("gap")) / 100;
    const length = (parentContainer.offsetHeight / size) - parentContainer.offsetHeight*gapValue

    for(let i = 0; i < size*size; i++){
        const block = document.createElement("div");
        block.style.height = `${length}px`;
        block.style.width = `${length}px`;
        block.classList.add("gridSquare"); // Add a class for styling
        parentContainer.appendChild(block)
    }

    addHoverEffect(); // Call function to add hover effect

}

function darkenColor(color) {
    // Parse the color string and extract RGB components
    const rgbMatch = color.match(/\d+/g);
    const PERC = 0.35;
    let r = parseInt(rgbMatch[0]);
    let g = parseInt(rgbMatch[1]);
    let b = parseInt(rgbMatch[2]);

    // Darken the color by reducing each RGB component by 10%
    r = Math.max(0, r - Math.round(r * PERC));
    g = Math.max(0, g - Math.round(g * PERC));
    b = Math.max(0, b - Math.round(b * PERC));

    // Construct and return the darkened color string
    return `rgb(${r}, ${g}, ${b})`;
}

function addHoverEffect() {
    const gridSquares = document.querySelectorAll(".gridSquare");
    gridSquares.forEach(square => {
        let originalColor; // Variable to store the original color
        let currentColor; // Variable to store the current color
        
        square.addEventListener("mouseenter", () => {
            originalColor = window.getComputedStyle(square).getPropertyValue("background-color");
            currentColor = originalColor;
            square.style.backgroundColor = getRandomColorRGB(); // Change color on hover
        });
        square.addEventListener("mouseleave", () => {
            square.style.backgroundColor = darkenColor(currentColor); // Darken color on mouseleave
            currentColor = darkenColor(currentColor); // Update currentColor to the darkened color
        });
    });
}

function getRandomColorRGB() {
    const red = Math.floor(Math.random() * 256); // Random value between 0 and 255
    const green = Math.floor(Math.random() * 256); // Random value between 0 and 255
    const blue = Math.floor(Math.random() * 256); // Random value between 0 and 255

    return `rgb(${red}, ${green}, ${blue})`; // Construct the RGB color string
}

function redefineGridSize() {
    gridSizeButton.addEventListener("click", () =>{
        let newSizeGrid = prompt("Set the number of squares per side [máx. 100]");
        if (newSizeGrid && !isNaN(newSizeGrid) && newSizeGrid > 0 && newSizeGrid <= 100){
            createGrid(newSizeGrid);
        } else {
            alert("Please enter a valid number between 1 and 100");
        }
    })
}

const parentContainer = document.querySelector("#parentContainer");
const gridSizeButton = document.querySelector("#gridSizeButton")

createGrid(16);
redefineGridSize();
