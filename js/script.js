const calendarContainer = document.querySelector(".container");
const calendarDays = 24;
let discountCodes = [];

// Function to load discount codes from the JSON file
const loadDiscountCodes = async () => {
    try {
        const response = await fetch('./assets/tarjoukset.json'); // Ensure this path is correct
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        discountCodes = data.christmasSpecials; // Store the codes from the JSON file
        console.log("Discount codes loaded:", discountCodes); // Debug log
        createCalendar(); // Create the calendar after loading discount codes
    } catch (error) {
        console.error("Error loading discount codes:", error);
    }
};

// Function to open a door
const openDoor = (path, event, doorDay) => {
    let today = new Date();
    let daynow = today.getDate();
    let monthnow = today.getMonth();
    
    // Check if the door should be opened
    if (event.target.classList.contains("opened")) {
        return; // Prevent opening again if already opened
    }

    // Check if we are in development mode
    const isDevMode = false; // Set this to false for the final version

    // Alert the user if trying to open before December or before the specific door day
    if (!isDevMode) {
        if (monthnow !== 11) {
            alert("This feature opens in December."); 
            return; 
        }
        if (daynow < doorDay) {
            alert(`This door cannot be opened until December ${doorDay}.`);
            return;
        }
    }
    
    // Open the door and show the image
    event.target.style.backgroundImage = `url(${path})`;
    event.target.classList.add("opened"); // Mark the door as opened
    
    // Show discount code when the door is opened
    const discountCode = document.createElement("div");
    discountCode.innerText = getDiscountCode(doorDay); // Get the discount code for this door
    discountCode.classList.add("discount-code");
    discountCode.style.display = "block"; // Show the discount code
    event.target.appendChild(discountCode); // Add the discount code to the door
};

// Function to retrieve discount code based on door number
const getDiscountCode = (doorNumber) => {
    console.log("Retrieving discount code for door:", doorNumber); // Debug log
    return discountCodes[doorNumber - 1]?.code || "No code available";
};

// Function to create the calendar doors
const createCalendar = () => {
    for (let i = 0; i < calendarDays; i++) {
        const calendarDoor = document.createElement("div");
        calendarDoor.classList.add("door");
        calendarContainer.appendChild(calendarDoor); // Append to container
        
        const doorNumber = document.createElement("div");
        doorNumber.classList.add("text");
        doorNumber.innerHTML = i + 1;
        calendarDoor.appendChild(doorNumber);
        
        let coursePath = `http://annikagronqvist.free.nf/Uppg3/img/bild-1.jpg`;
        calendarDoor.addEventListener("click", openDoor.bind(null, coursePath, null, i + 1));
    }
};

// Initialize calendar on page load and load discount codes
window.onload = loadDiscountCodes;
